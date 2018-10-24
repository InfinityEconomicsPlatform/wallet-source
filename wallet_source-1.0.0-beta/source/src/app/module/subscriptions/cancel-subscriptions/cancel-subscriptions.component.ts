import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { SubscriptionService } from '../subscription.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { AppConstants } from '../../../config/constants';
import { CryptoService } from '../../../services/crypto.service';
import * as alertFunctions from '../../../shared/data/sweet-alerts';

@Component({
    selector: 'app-cancel-subscriptions',
    templateUrl: './cancel-subscriptions.component.html',
    styleUrls: ['./cancel-subscriptions.component.scss']
})
export class CancelSubscriptionsComponent implements OnInit {

    cancelOrderPromise: any;
    setCancelSubscriptionPromise: any;
    data: any;

    transactionBytes: any;

    validBytes: any;
    tx_fee: any;
    tx_amount: any;
    tx_total: any;
    unsignedTx: boolean;

    constructor(
        private commonService: CommonService,
        private route: ActivatedRoute,
        private router: Router,
        private _location: Location,
        private subscriptionService: SubscriptionService,
        private sessionStorageService: SessionStorageService,
        private cryptoService: CryptoService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            if (!params.id) {
                this._location.back();
            } else {
                this.data = {
                    'id': params.id,
                    'account': params.accountID
                }
                this.cancelSubscription();
            }
        });

    }
    goBack() {
        this._location.back();
    }
    hasPrivateKeyInSession() {
        if (this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY)) {
            return true;
        }
        return false;
    };
    cancelSubscription() {
        const publicKey = this.commonService.getAccountDetailsFromSession('publicKey');
        const subscription = this.data.id;
        const fee = 1;
        const secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);

        this.setCancelSubscriptionPromise = this.subscriptionService.subscriptionCancel(publicKey, subscription, fee)
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
    };
    broadcastTransaction(transactionBytes) {
        this.cancelOrderPromise = this.commonService.broadcastTransaction(transactionBytes)
            .subscribe((success) => {
                if (!success.errorCode) {
                    alertFunctions.InfoAlertBox('Success',
                        'Transaction succesfull broadcasted with Id : ' + success.transaction,
                        'OK',
                        'success').then((isConfirm: any) => {
                            this.router.navigate(['/subscriptions/my-subscriptions']);
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
}
