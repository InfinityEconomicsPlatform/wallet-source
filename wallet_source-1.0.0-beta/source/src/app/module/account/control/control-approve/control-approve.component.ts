import { Component, OnInit } from '@angular/core';
import {DataStoreService} from '../../../../services/data-store.service';
import {Location} from '@angular/common';
import {AppConstants} from '../../../../config/constants';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';
import {CommonService} from '../../../../services/common.service';
import {AccountService} from '../../account.service';
import {SessionStorageService} from '../../../../services/session-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CryptoService} from '../../../../services/crypto.service';

@Component({
  selector: 'app-control-approve',
  templateUrl: './control-approve.component.html',
  styleUrls: ['./control-approve.component.scss']
})
export class ControlApproveComponent implements OnInit {
    approveControl: any = {};
    transactionBytes: any;
    transactionJSON: any;
    validBytes = false;
  constructor(private commonService: CommonService,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private router: Router,
              private sessionStorageService: SessionStorageService,
              private cryptoService: CryptoService,
              private _location: Location) { }

  ngOnInit() {
      this.approveControl = DataStoreService.get('approve');
      this.confirmControlledTransaction();
  }
  confirmControlledTransaction() {

        let secret = this.approveControl.secretPhrase;
        let fullhash = this.approveControl.fullhash;
        let fee = 1;

        let accountPublicKey = this.accountService.getAccountDetailsFromSession('publicKey');
        let secretPhraseHex;

        if (secret) {
            secretPhraseHex = this.cryptoService.secretPhraseToPrivateKey(secret);
        } else {
            secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
        }

        this.accountService.approveTransactions(accountPublicKey, fullhash, fee, secretPhraseHex).subscribe( (success: any) => {

            if (!success.errorCode) {
                let unsignedBytes = success.unsignedTransactionBytes;
                let signatureHex = this.cryptoService.signatureHex(unsignedBytes, secretPhraseHex);
                this.transactionBytes = this.cryptoService.signTransactionHex(unsignedBytes, signatureHex);
                this.transactionJSON = success.transactionJSON;
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
    };
    broadcastTransaction = function (transactionBytes) {
        this.accountService.broadcastTransaction(transactionBytes).subscribe((success) => {

            if (!success.errorCode) {
                alertFunctions.InfoAlertBox('Success',
                    'Transaction succesfull broadcasted with Id : ' + success.transaction,
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

        }, function (error) {
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
