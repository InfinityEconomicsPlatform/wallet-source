import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../../../currencies.service';
import { AccountService } from '../../../../account/account.service';
import { ActivatedRoute, Router } from "@angular/router";
import { AppConstants } from '../../../../../config/constants';
import * as alertFunctions from "../../../../../shared/data/sweet-alerts";
import { SessionStorageService } from '../../../../../services/session-storage.service';
import { CryptoService } from '../../../../../services/crypto.service';
import { OptionService } from '../../../../../services/option.service';
import { Location } from '@angular/common';
import { AliasesService } from '../../../../aliases/aliases.service';

@Component({
  selector: 'app-delete-currency',
  templateUrl: './delete-currency.component.html',
  styleUrls: ['./delete-currency.component.scss']
})
export class DeleteCurrencyComponent implements OnInit {

  currencyId: any;
  deleteCurrencyForm: any = {};

  accountId = '';
  accountRs = '';

  transactionBytes: any;
  tx_fee: any;
  tx_amount: any;
  tx_total: any;
  validBytes: any;

  constructor(public currenciesService: CurrenciesService,
    public route: ActivatedRoute,
    public router: Router,
    public accountService: AccountService,
    public sessionStorageService: SessionStorageService,
    public cryptoService: CryptoService,
    public aliasesService: AliasesService,
    public _location: Location) {
  }

  ngOnInit() {
    this.getCurrency();
  }

  getCurrency() {

    this.accountRs = this.accountService.getAccountDetailsFromSession('accountRs');

    this.route.params.subscribe(params => {

      this.currencyId = params['id'];
      this.currenciesService.getCurrencyById(this.currencyId).subscribe((success) => {

        this.deleteCurrencyForm.currencyId = success.currency;
        this.deleteCurrencyForm.decimals = success.decimals;
        this.deleteCurrencyForm.ticker = success.code;

      }, function (error) {
        console.log(error);
      });
    })
  }

  deleteCurrency() {
    var deleteCurrencyForm = this.deleteCurrencyForm;
    var currency = deleteCurrencyForm.currencyId;
    var fee = deleteCurrencyForm.fee;
    var publicKey = this.accountService.getAccountDetailsFromSession('publicKey');
    var accountRS = this.accountService.getAccountDetailsFromSession('accountRs');
    var secret = this.deleteCurrencyForm.secretPhrase;
    var secretPhraseHex;
    if (!fee) {
      fee = 1;
    }
    if (secret) {
      secretPhraseHex = this.cryptoService.secretPhraseToPrivateKey(secret);
    } else {
      secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
    }

    this.currenciesService.canDeleteCurrency(currency, accountRS)
      .subscribe((success) => {
        if (!success.errorCode) {
          if (success.canDelete) {
            this.currenciesService.deleteCurrency(currency, fee,
              publicKey)
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
              });
          } else {
            alertFunctions.InfoAlertBox('Error',
              'Sorry, You can not delete currency ' + currency,
              'OK',
              'error').then((isConfirm: any) => {
              });
          }
        }

      }, (error) => {
        alertFunctions.InfoAlertBox('Error',
          AppConstants.getNoConnectionMessage,
          'OK',
          'error').then((isConfirm: any) => {
          });
      });


  };

  deletesCurrency() {
    var deleteCurrencyForm = this.deleteCurrencyForm;
    var currency = deleteCurrencyForm.currencyId;
    var units = parseInt((deleteCurrencyForm.units * Math.pow(10, deleteCurrencyForm.decimals)) + '');
    var fee = 1;
    var recipientRS = deleteCurrencyForm.recipient;
    var publicKey = this.accountService.getAccountDetailsFromSession('publicKey');
    var secret = this.deleteCurrencyForm.secretPhrase;
    var secretPhraseHex;

    if (secret) {
      secretPhraseHex = this.cryptoService.secretPhraseToPrivateKey(secret);
    } else {
      secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
    }

    this.currenciesService.transferCurrency(publicKey, recipientRS, currency,
      units, fee)
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
    this.accountService.broadcastTransaction(transactionBytes).subscribe((success) => {

      if (!success.errorCode) {
        alertFunctions.InfoAlertBox('Success',
          'Transaction succesfull broadcasted with Id : ' + success.transaction,
          'OK',
          'success').then((isConfirm: any) => {
            this.route.params.subscribe(params => {
              this.router.navigate(['currencies/show-currencies/my']);
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