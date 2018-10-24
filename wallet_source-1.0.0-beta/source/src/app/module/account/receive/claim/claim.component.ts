import { Component, OnInit } from '@angular/core';
import {AppConstants} from '../../../../config/constants';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';
import {SessionStorageService} from '../../../../services/session-storage.service';
import {CryptoService} from '../../../../services/crypto.service';
import {AccountService} from '../../account.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {
    validBytes = false;
    claimSeceretForm = {
        fullHash: '',
        secretText: ''
    };
    transactionBytes: any;
    transactionJSON: any;
  constructor(public sessionStorageService: SessionStorageService,
              public accountService: AccountService,
              public cryptoService: CryptoService) { }

  ngOnInit() {
  }
    confirmControlledTransaction = function (fullHash, secretText) {

        let fee = 1;

        let accountPublicKey = this.accountService.getAccountDetailsFromSession('publicKey');
        let secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);

        this.accountService.approveTransactions(accountPublicKey, fullHash, fee, secretText)
            .subscribe((success) => {

                if (!success.errorCode) {
                    let unsignedBytes = success.unsignedTransactionBytes;
                    let signatureHex = this.cryptoService.signatureHex(unsignedBytes, secretPhraseHex);
                    this.transactionBytes = this.cryptoService.signTransactionHex(unsignedBytes, signatureHex);
                    this.transactionJSON = success.transactionJSON;
                    this.validBytes = true;

                } else {
                    alertFunctions.InfoAlertBox('Error',
                        'Unable to broadcast transaction. Reason: ' + success.errorDescription,
                        'OK',
                        'error').then((isConfirm: any) => {

                    });
                }
            });
    }

    broadcastTransaction = function(transactionBytes) {
        this.accountService.broadcastTransaction(transactionBytes).subscribe((success) => {
            if (!success.errorCode) {
                alertFunctions.InfoAlertBox('Success',
                    'Transaction succesfull broadcasted with Id : ' + success.transaction,
                    'OK',
                    'success').then((isConfirm: any) => {
                    this.router.navigate(['/account/transactions/pending']);
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
