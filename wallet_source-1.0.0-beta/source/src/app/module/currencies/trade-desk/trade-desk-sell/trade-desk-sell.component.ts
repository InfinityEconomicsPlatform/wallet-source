import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from '../../../../services/data-store.service';
import { Location } from '@angular/common';
import { CurrenciesService } from '../../currencies.service';
import { AccountService } from '../../../account/account.service';
import * as alertFunctions from "../../../../shared/data/sweet-alerts";
import { AppConstants } from '../../../../config/constants';
import { SessionStorageService } from '../../../../services/session-storage.service';
import { CryptoService } from '../../../../services/crypto.service';
import { ShareToQuantityPipe } from '../../../../pipes/share-to-quantity.pipe';
import { AmountToQuantPipe } from '../../../../pipes/amount-to-quant.pipe';
@Component({
    selector: 'app-trade-desk-sell',
    templateUrl: './trade-desk-sell.component.html',
    styleUrls: ['./trade-desk-sell.component.scss']
})
export class TradeDeskSellComponent implements OnInit {

    constructor(public router: Router,
        public route: ActivatedRoute,
        public currenciesService: CurrenciesService,
        public accountService: AccountService,
        public sessionStorageService: SessionStorageService,
        public cryptoService: CryptoService,
        public shareToQuantityPipe: ShareToQuantityPipe,
        public amountToQuantPipe: AmountToQuantPipe,
        public _location: Location) {
    }

    sellCurrencyForm: any = {};
    buyCurrencyData: any = {};

    transactionBytes: any;
    tx_fee: any;
    tx_amount: any;
    tx_total: any;
    validBytes: any;

    ngOnInit() {
        this.sellCurrencyForm = DataStoreService.get('sell-currency');

        if (!this.sellCurrencyForm) {
            this.route.params.subscribe(params => {
                this.router.navigate(['/currencies/trade', params['id']]);
            });
        } else {
            this.buyCurrency();
        }
    }

    buyCurrency() {

        this.sellCurrencyForm.fee = 1;

        var sellCurrencyForm = this.sellCurrencyForm;
        var currency = sellCurrencyForm.currencyId;
        var fee = 1;
        var publicKey = this.accountService.getAccountDetailsFromSession('publicKey');

        var units = parseInt(this.shareToQuantityPipe.transform(sellCurrencyForm.shares, sellCurrencyForm.decimals));
        var rateTQT = parseInt((this.amountToQuantPipe.transform(sellCurrencyForm.rate) / Math.pow(10, sellCurrencyForm.decimals)) + '');


        var fee = 1;
        var publicKey = this.accountService.getAccountDetailsFromSession('publicKey');
        var secret = this.sellCurrencyForm.secretPhrase;
        var secretPhraseHex;

        if (secret) {
            secretPhraseHex = this.cryptoService.secretPhraseToPrivateKey(secret);
        } else {
            secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
        }

        this.currenciesService.buyCurrency(publicKey, currency, rateTQT, units, fee)
            .subscribe((success_) => {
                success_.subscribe((success) => {
                    if (!success.errorCode) {
                        var unsignedBytes = success.unsignedTransactionBytes;
                        var signatureHex = this.cryptoService.signatureHex(unsignedBytes, secretPhraseHex);

                        this.transactionBytes = this.cryptoService.signTransactionHex(unsignedBytes, signatureHex);
                        this.tx_fee = success.transactionJSON.feeTQT / 100000000;
                        this.tx_amount = success.transactionJSON.amountTQT / 100000000;
                        this.tx_total = this.tx_fee + this.tx_amount;
                        this.validBytes = true;

                    } else {
                        alertFunctions.InfoAlertBox('Error',
                            'Sorry, an error occured! Reason: ' + success.errorDescription,
                            'OK',
                            'error').then((isConfirm: any) => {

                            });
                    }
                });
            })


    };

    broadcastTransaction(transactionBytes) {
        this.accountService.broadcastTransaction(transactionBytes).subscribe((success) => {

            if (!success.errorCode) {
                alertFunctions.InfoAlertBox('Success',
                    'Transaction succesfull broadcasted with Id : ' + success.transaction,
                    'OK',
                    'success').then((isConfirm: any) => {
                        this.route.params.subscribe(params => {
                            this.router.navigate(['/currencies/trade', params['id']]);
                        });
                    });

            } else {
                alertFunctions.InfoAlertBox('Error',
                    'Unable to broadcast transaction. Reason: ' + success.errorDescription,
                    'OK',
                    'error').then((isConfirm: any) => {

                    });
            }

        });
    }

    goBack() {
        this._location.back();
    }
}
