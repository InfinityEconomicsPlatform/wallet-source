import { Component, OnInit } from '@angular/core';
import {SessionStorageService} from '../../../../services/session-storage.service';
import {Location} from '@angular/common';
import {AccountService} from '../../../account/account.service';
import {AmountToQuantPipe} from '../../../../pipes/amount-to-quant.pipe';
import {AssetsService} from '../../assets.service';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareToQuantityPipe} from '../../../../pipes/share-to-quantity.pipe';
import {DataStoreService} from '../../../../services/data-store.service';
import {AppConstants} from '../../../../config/constants';
import {CryptoService} from '../../../../services/crypto.service';

@Component({
  selector: 'app-trade-desk-sell-asset',
  templateUrl: './trade-desk-sell-asset.component.html',
  styleUrls: ['./trade-desk-sell-asset.component.scss']
})
export class TradeDeskSellAssetComponent implements OnInit {

    constructor(public router: Router,
                public route: ActivatedRoute,
                public assetsService: AssetsService,
                public accountService: AccountService,
                public sessionStorageService: SessionStorageService,
                public cryptoService: CryptoService,
                public shareToQuantityPipe: ShareToQuantityPipe,
                public amountToQuantPipe: AmountToQuantPipe,
                public _location: Location) {
    }

    sellAssetForm: any = {};

    transactionBytes: any;
    tx_fee: any;
    tx_amount: any;
    tx_total: any;
    validBytes: any;

    ngOnInit() {
        this.sellAssetForm = DataStoreService.get('sell-asset');

        if (!this.sellAssetForm) {
            this.route.params.subscribe(params => {
                this.router.navigate(['/assets/trade', params['id']]);
            });
        }else{
            this.sellAsset();
        }
    }

    sellAsset() {

        this.sellAssetForm.fee = 1;

        var sellAssetForm = this.sellAssetForm;
        var asset = sellAssetForm.assetId;
        var quantity=  parseInt(this.shareToQuantityPipe.transform(sellAssetForm.quantity, sellAssetForm.decimals));
        var price = parseInt((this.amountToQuantPipe.transform(sellAssetForm.price) / Math.pow(10, sellAssetForm.decimals)) + '');
        var requestType = sellAssetForm.requestType;

        var fee = 1;
        var publicKey = this.accountService.getAccountDetailsFromSession('publicKey');
        var secret = this.sellAssetForm.secretPhrase;
        var secretPhraseHex;

        if (secret) {
            secretPhraseHex = this.cryptoService.secretPhraseToPrivateKey(secret);
        } else {
            secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
        }
        this.assetsService.placeOrder(publicKey, price, asset, quantity, fee, requestType)
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
                }, (error) => {
                    alertFunctions.InfoAlertBox('Error',
                        AppConstants.getNoConnectionMessage,
                        'OK',
                        'error').then((isConfirm: any) => {

                    });
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
                        this.router.navigate(['/assets/trade', params['id']]);
                    });
                });

            } else {
                alertFunctions.InfoAlertBox('Error',
                    'Unable to broadcast transaction. Reason: ' + success.errorDescription,
                    'OK',
                    'error').then((isConfirm: any) => {

                });
            }

        }, (error) => {
            alertFunctions.InfoAlertBox('Error',
                AppConstants.getNoConnectionMessage,
                'OK',
                'error').then((isConfirm: any) => {

            });
        });
    }

    goBack() {
        this._location.back();
    }

}
