import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetsService } from '../../../assets.service';
import { SessionStorageService } from '../../../../../services/session-storage.service';
import { AliasesService } from '../../../../aliases/aliases.service';
import { CommonService } from '../../../../../services/common.service';
import { CryptoService } from '../../../../../services/crypto.service';
import { AppConstants } from '../../../../../config/constants';
import * as alertFunctions from '../../../../../shared/data/sweet-alerts';
import { Location } from '@angular/common';

@Component({
    selector: 'app-delete-asset',
    templateUrl: './delete-asset.component.html',
    styleUrls: ['./delete-asset.component.scss']
})
export class DeleteAssetComponent implements OnInit {

    transactionBytes: any;

    validBytes: any;
    tx_fee: any;
    tx_amount: any;
    tx_total: any;
    deleteAssetFullForm = {
        'assetId': '',
        'name': ''
    };
    unsignedTx: boolean;

    constructor(private commonService: CommonService,
        private route: ActivatedRoute,
        private router: Router,
        private assetsService: AssetsService,
        private aliasesService: AliasesService,
        private sessionStorageService: SessionStorageService,
        private cryptoService: CryptoService,
        private _location: Location) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            if (!params.id) {
                this._location.back();
            } else {
                const assetId = params.id;
                this.assetsService.getAsset(assetId, true).subscribe((success: any) => {
                    this.deleteAssetFullForm.assetId = success.asset;
                    this.deleteAssetFullForm.name = success.name;
                }, (error) => {
                });
            }
        })
    }

    deleteAssetFull() {
        const publicKey = this.commonService.getAccountDetailsFromSession('publicKey');
        const asset = this.deleteAssetFullForm.assetId;
        const fee = 1;
        const secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);

        this.assetsService.deleteAssetFull(asset, fee, publicKey)
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
                        alertFunctions.InfoAlertBox('Error',
                            'Sorry, an error occured! Reason: ' + success.errorDescription + ' ' + AppConstants.getNoConnectionMessage,
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
