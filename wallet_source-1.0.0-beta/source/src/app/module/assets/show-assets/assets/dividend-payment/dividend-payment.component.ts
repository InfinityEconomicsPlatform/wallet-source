import { Component, OnInit } from '@angular/core';
import {CryptoService} from '../../../../../services/crypto.service';
import {AppConstants} from '../../../../../config/constants';
import {AliasesService} from '../../../../aliases/aliases.service';
import {SessionStorageService} from '../../../../../services/session-storage.service';
import {Location} from '@angular/common';
import {AssetsService} from '../../../assets.service';
import * as alertFunctions from '../../../../../shared/data/sweet-alerts';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../../../services/common.service';
import {CurrenciesService} from '../../../../currencies/currencies.service';
import {AmountToQuantPipe} from '../../../../../pipes/amount-to-quant.pipe';

@Component({
  selector: 'app-dividend-payment',
  templateUrl: './dividend-payment.component.html',
  styleUrls: ['./dividend-payment.component.scss']
})
export class DividendPaymentComponent implements OnInit {
    transactionBytes: any;

    validBytes: any;
    tx_fee: any;
    tx_amount: any;
    tx_total: any;
    dividendPaymentForm = {
        'assetId': '',
        'name': '',
        'amountPerQuant': '',
        'height': 0,
        'decimals': ''
    }

    constructor(private commonService: CommonService,
                private route: ActivatedRoute,
                private router: Router,
                private assetsService: AssetsService,
                private aliasesService: AliasesService,
                private sessionStorageService: SessionStorageService,
                private cryptoService: CryptoService,
                private currenciesService: CurrenciesService,
                private amountToQuantPipe: AmountToQuantPipe,
                private _location: Location) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            if (!params.id) {
                this._location.back();
            } else {
                const assetId = params.id;
                this.assetsService.getAsset(assetId, true).subscribe((success: any) => {
                    this.dividendPaymentForm.assetId = success.asset;
                    this.dividendPaymentForm.decimals = success.decimals;
                    this.dividendPaymentForm.name = success.name;
                }, (error) => {
                });

                this.currenciesService.getBlockChainStatus().subscribe((success: any) => {
                    this.dividendPaymentForm.height = success.numberOfBlocks;
                    this.dividendPaymentForm.height = this.dividendPaymentForm.height - 1;
                }, (error) => {
                });
            }
        })
    }
    dividendPayment() {
        const amountPerQuant = this.amountToQuantPipe.transform(this.dividendPaymentForm.amountPerQuant);
       /* amountPerQuant = parseInt(amountPerQuant / Math.pow(10, parseInt(this.dividendPaymentForm.decimals, 10)), 10);

        if (amountPerQuant < 1) {

            alertFunctions.InfoAlertBox('Error',
                'Sorry, an error occured! Reason: ' + 'Amount per share less than asset decimals: (' +
                this.dividendPaymentForm.decimals + '). Dividend would be (0) per smallest asset unit.',
                'OK',
                'error').then((isConfirm: any) => {
            });
        }*/
        const publicKey = this.commonService.getAccountDetailsFromSession('publicKey');
        const assetId = this.dividendPaymentForm.assetId;
        const height = this.dividendPaymentForm.height;
        const fee = 1;
        const secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);

        this.assetsService.dividendPayment(publicKey, assetId, height, amountPerQuant, fee)
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
                }, function (error) {
                    alertFunctions.InfoAlertBox('Error',
                        AppConstants.getNoConnectionMessage,
                        'OK',
                        'error').then((isConfirm: any) => {
                    });
                });
            })
    }

    broadcastTransaction(transactionBytes) {
        this.commonService.broadcastTransaction(transactionBytes)
            .subscribe((success) => {
                if (!success.errorCode) {
                    alertFunctions.InfoAlertBox('Success',
                        'Transaction succesfull broadcasted with Id : ' + success.transaction,
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
            }, (error) => {

                alertFunctions.InfoAlertBox('Error',
                    AppConstants.getNoConnectionMessage,
                    'OK',
                    'error').then((isConfirm: any) => {

                });
            });
    };

    goBack() {
        this._location.back();
    }

}
