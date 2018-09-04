import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EscrowService} from '../../escrow.service';
import {Location} from '@angular/common';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';
import {AppConstants} from '../../../../config/constants';
import {SessionStorageService} from '../../../../services/session-storage.service';
import {AmountToQuantPipe} from '../../../../pipes/amount-to-quant.pipe';
import {CryptoService} from '../../../../services/crypto.service';
import {AccountService} from '../../../account/account.service';
import {CommonService} from '../../../../services/common.service';


@Component({
    selector: 'app-sign-escrow',
    templateUrl: './sign-escrow.component.html',
    styleUrls: ['./sign-escrow.component.scss']
})
export class SignEscrowComponent implements OnInit {
    tx_fee: any;
    tx_amount:any;
    tx_total:any;
    accountDetails: any;
    transactionBytes: any;

    validBytes: any;
    escrow: any = {
        'escrowId': '',
        'decision': ''
    };

    constructor(private router: Router,
                private route: ActivatedRoute,
                private escrowService: EscrowService,
                private _location: Location,
                private sessionStorageService: SessionStorageService,
                public amountToQuant: AmountToQuantPipe,
                private cryptoService: CryptoService,
                public accountService: AccountService,
                private commonService: CommonService) {
    }

    ngOnInit() {

        this.route.queryParams.subscribe((params: any) => {
            if (!params.id) {
                this._location.back();
            } else {
                this.escrow.escrowId = params.id;
            }
        });
    }
    goBack() {
        this._location.back();
    }

    escrowSign() {

        const signEscrowID = this.escrow.escrowId;
        const decision = this.escrow.decision;
        const fee = 1;

        const senderPublicKey = this.accountService.getAccountDetailsFromSession('publicKey');
        const secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);

        this.accountService.getAccountDetails(signEscrowID).subscribe((success) => {
            const recipientPublicKey = success['publicKey'];
            if (!success['errorCode'] || success['errorCode'] === 5) {
                this.accountDetails = success;
                if (!recipientPublicKey) {
                    alertFunctions.InfoAlertBox('info',
                        'This account never had an outbound transaction. Make sure this account is the right one. In doubt, ask the account holder for his public key and add it on the former page to this transaction.',
                        'OK',
                        'info').then((isConfirm: any) => {
                    });
                }

                this.escrowService.escrowSign(
                    senderPublicKey,
                    signEscrowID,
                    decision,
                    fee
                ).subscribe((_success) => {
                    _success.subscribe(result => {
                        if (!result.errorCode) {
                            const unsignedBytes = result.unsignedTransactionBytes;
                            const signatureHex = this.cryptoService.signatureHex(unsignedBytes, secretPhraseHex);
                            this.transactionBytes = this.cryptoService.signTransactionHex(unsignedBytes, signatureHex);
                            this.validBytes = true;

                            this.tx_fee = result.transactionJSON.feeTQT / 100000000;
                            this.tx_amount = result.transactionJSON.amountTQT / 100000000;
                            this.tx_total = this.tx_fee + this.tx_amount;

                        } else {
                            alertFunctions.InfoAlertBox('Sorry, an error occured! Reason: ' + _success.errorDescription,
                                AppConstants.getNoConnectionMessage,
                                'OK',
                                'error').then((isConfirm: any) => {
                            });
                        }
                    })


                }, (err) => {
                    alertFunctions.InfoAlertBox('Sorry, an error occured! Reason: ' + err.errorDescription,
                        AppConstants.getNoConnectionMessage,
                        'OK',
                        'error').then((isConfirm: any) => {
                    });
                });

            } else {
                alertFunctions.InfoAlertBox('Sorry, an error occured! Reason: ' + success['errorDescription'],
                    AppConstants.getNoConnectionMessage,
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

    broadcastTransaction(transactionBytes) {
        this.commonService.broadcastTransaction(transactionBytes)
            .subscribe((success) => {
                if (!success.errorCode) {
                    alertFunctions.InfoAlertBox('Success',
                        'Transaction succesfull broadcasted with Id : ' + success.transaction,
                        'OK',
                        'success').then((isConfirm: any) => {
                        this.router.navigate(['/escrow/my-escrow']);
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
    };

}
