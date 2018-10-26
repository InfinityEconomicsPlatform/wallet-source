import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../../services/session-storage.service';
import { AliasesService } from '../../../aliases/aliases.service';
import { AccountService } from '../../account.service';
import { CryptoService } from '../../../../services/crypto.service';
import { AppConstants } from '../../../../config/constants';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../../config/page';

@Component({
    selector: 'app-set-property',
    templateUrl: './set-property.component.html',
    styleUrls: ['./set-property.component.scss']
})
export class SetPropertyComponent implements OnInit {
    openBookMarks: boolean = false;
    setAccountPropertyForm: any = {};
    page = new Page();
    properties: any = [];
    accountId: any;
    accountRs: any;
    propertyType: any = 'SET';
    propertyTitle: any;
    mode: any;
    validBytes = false;
    transactionBytes: any;
    tx_fee: any;
    tx_amount: any;
    tx_total: any;
    constructor(private aliasesService: AliasesService,
        private accountService: AccountService,
        private cryptoService: CryptoService,
        private route: ActivatedRoute,
        private router: Router,
        private sessionStorageService: SessionStorageService) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.propertyType = data.propertyType;
            this.propertyTitle = data.title;
            this.accountId = this.accountService.getAccountDetailsFromSession('accountId');
            this.accountRs = this.accountService.getAccountDetailsFromSession('accountRs');

            this.setPage({ offset: 0 });
        });
    }
    setPage(pageInfo) {

        this.page.pageNumber = pageInfo.offset;

        let startIndex = this.page.pageNumber * 10;
        let endIndex = ((this.page.pageNumber + 1) * 10) - 1;

        if (this.propertyType === 'ALL') {
            this.accountService.getAccountProperties('', this.accountId, '', startIndex, endIndex)
                .subscribe((success: any) => {
                    this.properties = success.properties;
                    this.mode = 2;
                    if (this.page.pageNumber === 0 && this.properties.length < 10) {
                        this.page.totalElements = this.properties.length;
                    } else if (this.page.pageNumber > 0 && this.properties.length < 10) {
                        this.page.totalElements = this.page.pageNumber * 10 + this.properties.length;
                        this.page.totalPages = this.page.pageNumber;
                    }
                });
        } else if (this.propertyType === 'MY') {
            this.accountService.getAccountProperties(this.accountId, '', '', startIndex, endIndex)
                .subscribe((success: any) => {
                    this.properties = success.properties;
                    this.mode = 1;
                    if (this.page.pageNumber === 0 && this.properties.length < 10) {
                        this.page.totalElements = this.properties.length;
                    } else if (this.page.pageNumber > 0 && this.properties.length < 10) {
                        this.page.totalElements = this.page.pageNumber * 10 + this.properties.length;
                        this.page.totalPages = this.page.pageNumber;
                    }
                });
        }

    }
    reload() {
        this.setPage({ offset: 0 });
    }
    loadBookmarkView() {
        this.openBookMarks = true;
    }
    bookmarkSelected(e) {
        this.setAccountPropertyForm.recipientRS = e.data.account;
        this.openBookMarks = false;
    }
    searchAliases() {
        this.aliasesService.searchAlias(this.setAccountPropertyForm.recipientRS).subscribe((success) => {
            var aliases = success.aliases || [];
            for (var i = 0; i < aliases.length; i++) {
                var alias = aliases[i];
                if (alias.aliasName.toUpperCase() === this.setAccountPropertyForm.recipientRS.toUpperCase()) {
                    var aliasURI = alias.aliasURI;
                    var aliasType = aliasURI.split(':');
                    if (aliasType[0] === 'acct') {
                        var accountRS = aliasType[1].split('@')[0];
                        this.setAccountPropertyForm.recipientRS = accountRS;
                        break;
                    }
                }
            }
        });
    };
    setAccount() {
        this.setAccountPropertyForm.recipientRS = this.accountService.getAccountDetailsFromSession('accountRs');
    }
    setAccountProperty() {
        let form = this.setAccountPropertyForm;
        let account = form.recipientRS;
        let key = form.key;
        let value = form.value;

        let fee = 1;
        let secret = form.secretPhrase;

        let accountPublicKey = this.accountService.getAccountDetailsFromSession('publicKey');
        let secretPhraseHex;
        if (secret) {
            secretPhraseHex = this.cryptoService.secretPhraseToPrivateKey(secret);
        } else {
            secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);

        }
        this.accountService.setAccountProperty(account, key, value, accountPublicKey, fee)
            .subscribe((success: any) => {
                if (!success.errorCode) {
                    let unsignedBytes = success.unsignedTransactionBytes;
                    let signatureHex = this.cryptoService.signatureHex(unsignedBytes, secretPhraseHex);
                    let transactionBytes = this.cryptoService.signTransactionHex(unsignedBytes, signatureHex);

                    this.transactionBytes = transactionBytes;

                    this.validBytes = true;

                    this.tx_fee = success.transactionJSON.feeTQT / 100000000;
                    this.tx_amount = success.transactionJSON.amountTQT / 100000000;
                    this.tx_total = this.tx_fee + this.tx_amount;

                } else {
                    alertFunctions.InfoAlertBox('Error',
                        'Sorry, an error occured! Reason: ' + success.errorDescription,
                        'OK',
                        'error').then((isConfirm: any) => {

                        });
                }
            });
    }
    broadcastTransaction = function (transactionBytes) {
        this.accountService.broadcastTransaction(transactionBytes).subscribe((success) => {

            if (!success.errorCode) {
                alertFunctions.InfoAlertBox('Success',
                    'Transaction succesfully broadcasted with Id : ' + success.transaction,
                    'OK',
                    'success').then((isConfirm: any) => {
                    });

            } else {
                alertFunctions.InfoAlertBox('Error',
                    'Unable to broadcast transaction. Reason: ' + success.errorDescription,
                    'OK',
                    'error').then((isConfirm: any) => {

                    });
            }

        });
    };
    goToDeleteProperty(id, property, mode) {
        this.router.navigate(['/account/properties/delete-property'], { queryParams: { id: id, property: property, mode: mode } })
    }
    goToAccountDetails(id) {
        this.router.navigate(['/account/properties/account-details'], { queryParams: { id: id } });
    }

    goBack() {
        this.openBookMarks = false;
    }
}
