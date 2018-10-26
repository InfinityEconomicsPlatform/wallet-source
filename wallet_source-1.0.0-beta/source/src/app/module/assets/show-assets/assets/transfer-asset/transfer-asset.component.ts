import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../../../../services/crypto.service';
import { AppConstants } from '../../../../../config/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as alertFunctions from '../../../../../shared/data/sweet-alerts';
import { SessionStorageService } from '../../../../../services/session-storage.service';
import { CommonService } from '../../../../../services/common.service';
import { AssetsService } from '../../../assets.service';
import { ShareToQuantityPipe } from '../../../../../pipes/share-to-quantity.pipe';
import { AliasesService } from '../../../../aliases/aliases.service';

@Component({
    selector: 'app-transfer-asset',
    templateUrl: './transfer-asset.component.html',
    styleUrls: ['./transfer-asset.component.scss']
})
export class TransferAssetComponent implements OnInit {

    openBookMarks: boolean = false;
    data: any;
    transactionBytes: any;

    validBytes: any;
    tx_fee: any;
    tx_amount: any;
    tx_total: any;
    transferAssetForm = {
        'assetId': '',
        'name': '',
        'recipientRS': '',
        'quantity': '',
        'decimals': ''
    }

    constructor(private commonService: CommonService,
        private route: ActivatedRoute,
        private router: Router,
        private assetsService: AssetsService,
        private aliasesService: AliasesService,
        private sessionStorageService: SessionStorageService,
        private cryptoService: CryptoService,
        public shareToQuantityPipe: ShareToQuantityPipe,
        private _location: Location) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            if (!params.id) {
                this._location.back();
            } else {
                const assetId = params.id;
                this.assetsService.getAsset(assetId, true).subscribe((success: any) => {
                    this.transferAssetForm.assetId = success.asset;
                    this.transferAssetForm.decimals = success.decimals;
                    this.transferAssetForm.name = success.name;
                });
            }
        })
    }
    bookmarkSelected(e) {
        this.transferAssetForm.recipientRS = e.data.account;
        this.openBookMarks = false;
    }

    loadBookmarkView() {
        this.openBookMarks = true;
    }

    hideBookmark() {
        this.openBookMarks = false;
    }
    searchAliases() {
        this.aliasesService.searchAlias(this.transferAssetForm.recipientRS).subscribe((success) => {
            var aliases = success.aliases || [];
            for (var i = 0; i < aliases.length; i++) {
                var alias = aliases[i];
                if (alias.aliasName.toUpperCase() === this.transferAssetForm.recipientRS.toUpperCase()) {
                    var aliasURI = alias.aliasURI;
                    var aliasType = aliasURI.split(':');
                    if (aliasType[0] === 'acct') {
                        var accountRS = aliasType[1].split('@')[0];
                        this.transferAssetForm.recipientRS = accountRS;
                        break;
                    }
                }
            }
        });
    }

    transferAsset() {
        const quantity = this.shareToQuantityPipe.transform(this.transferAssetForm.quantity, this.transferAssetForm.decimals);
        const publicKey = this.commonService.getAccountDetailsFromSession('publicKey');
        const asset = this.transferAssetForm.assetId;
        const recipientRS = this.transferAssetForm.recipientRS;
        const fee = 1;
        const secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);

        this.assetsService.transferAsset(publicKey, recipientRS, asset, quantity, fee)
            .subscribe((success_) => {
                success_.subscribe((success) => {
                    if (!success.errorCode) {
                        const unsignedBytes = success.unsignedTransactionBytes;
                        const signatureHex = this.cryptoService.signatureHex(unsignedBytes, secretPhraseHex);
                        this.transactionBytes = this.cryptoService.signTransactionHex(unsignedBytes, signatureHex);

                        this.validBytes = true;
                        this.tx_fee = success.transactionJSON.feeTQT / 100000000;
                        this.tx_amount = success.transactionJSON.amountTQT / 100000000;
                        this.tx_total = this.tx_fee + this.tx_amount;
                    } else {
                        alertFunctions.InfoAlertBox('Sorry, an error occured! Reason: ' + success.errorDescription,
                            AppConstants.getNoConnectionMessage,
                            'OK',
                            'error').then((isConfirm: any) => {
                            });
                    }
                });
            })
    }

    broadcastTransaction(transactionBytes) {
        this.commonService.broadcastTransaction(transactionBytes)
            .subscribe((success) => {
                if (!success.errorCode) {
                    alertFunctions.InfoAlertBox('Success',
                        'Transaction succesfully broadcasted with Id : ' + success.transaction,
                        'OK',
                        'success').then((isConfirm: any) => {
                            this.router.navigate(['/assets/show-assets']);
                        });
                } else {
                    alertFunctions.InfoAlertBox('Error',
                        'Unable to broadcast transaction. Reason: ' + success.errorDescription,
                        'OK',
                        'error').then((isConfirm: any) => {
                            this.router.navigate(['/assets/show-assets']);
                        });
                }
            });
    };

    goBack() {
        this._location.back();
    }

}
