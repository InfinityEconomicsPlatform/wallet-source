import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataStoreService } from '../../../services/data-store.service';
import { Page } from '../../../config/page';
import { AppConstants } from '../../../config/constants';
import { SessionStorageService } from '../../../services/session-storage.service';
import { CryptoService } from "../../../services/crypto.service";
import * as alertFunctions from "../../../shared/data/sweet-alerts";
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  page = new Page();
  rows = new Array<any>();

  accountId = '';
  accountRs = '';
  hasControl = '';

  openBookMarks = false;
  bookMarkIndex = 0;

  setAccountControlForm: any = {
    approveAccounts: []
  };

  tx_fee: any;
  tx_amount: any;
  tx_total: any;
  transactionBytes: any;
  validBytes = false;

  constructor(public accountService: AccountService,
    public sessionStorageService: SessionStorageService,
    public route: ActivatedRoute,
    public _location: Location,
    public cryptoService: CryptoService,
    public commonService: CommonService,
    public router: Router) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  addNewAccount() {
    if (this.setAccountControlForm.approveAccounts.length >= 10) {
      alertFunctions.InfoAlertBox('Error',
        'You can add only maximum 10 accounts.',
        'OK',
        'error').then((isConfirm: any) => {

        });
    } else {
      this.setAccountControlForm.approveAccounts.push({});
    }
  }

  ngOnInit() {

    this.accountId = this.accountService.getAccountDetailsFromSession('accountId');
    this.accountRs = this.accountService.getAccountDetailsFromSession('accountRs');

    this.hasControl = this.sessionStorageService.getFromSession(AppConstants.controlConfig.SESSION_ACCOUNT_CONTROL_HASCONTROL_KEY);

    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.accountService.getVoterPhasedTransactions(
      this.accountId,
      this.page.pageNumber * 10,
      ((this.page.pageNumber + 1) * 10) - 1
    ).subscribe(response => {
      this.rows = response.transactions;
    });
  }

  goToDetails(row) {
    DataStoreService.set('transaction-details', { id: row.transaction, type: 'onlyID', view: 'transactionDetail' });
    this.router.navigate(['/account/control/transaction-details']);
  }
  goToApproveRequest(row){
      DataStoreService.set('approve', { transaction: row.transaction, fullhash: row.fullhash, sender: row.senderRS, recipient: row.recipientRS,
          amount: row.amountTQT, timestamp: row.timestamp, type: row.type, subtype: row.subtype});
      this.router.navigate(['/account/control/control-approve']);
  }

  accountDetail(accountID) {
    this.router.navigate(['/account/control/account-details'], { queryParams: { id: accountID } });
  }

  reload() {
    this.setPage({ offset: 0 });
  }

  bookmarkSelected(e) {
    this.setAccountControlForm.approveAccounts[this.bookMarkIndex].value = e.data.account; // {value: e.data.account};
    this.openBookMarks = false;
  }

  indexTracker(index: number, value: any) {
    return index;
  }

  loadBookmarkView(index) {
    this.bookMarkIndex = index;
    this.openBookMarks = true;
  }

  goBack(){
    this.openBookMarks = false;
  }

  validateForm(){
    var form = this.setAccountControlForm;
    var quorum = this.setAccountControlForm.quorum || 2;
    var totalAccounts = this.setAccountControlForm.approveAccounts || [];

    if(totalAccounts.length > quorum){
      this.setAccountControl();
    }else{
        alertFunctions.InfoAlertBox('Error',
        'This control setup is not valid, please check quorum and number of approval accounts.',
        'OK',
        'error').then((isConfirm: any) => {
        });
    }
  }

  setAccountControl(){

    var setAccountControlForm = this.setAccountControlForm;
    var quorum = setAccountControlForm.quorum;
    var accounts = [];
    
    accounts = setAccountControlForm.approveAccounts.map((elem) =>{
      return elem.value;
    })

    var fee = 1;
    var publicKey = this.commonService.getAccountDetailsFromSession('publicKey');
    var secret = setAccountControlForm.secretPhrase;
    var secretPhraseHex;
    if (secret) {
      secretPhraseHex = this.cryptoService.secretPhraseToPrivateKey(secret);
    } else {
      secretPhraseHex =
        this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
    }
    this.accountService.setAccountControl(publicKey, quorum, accounts, fee)
      .subscribe((success) => {
        if (!success.errorCode) {
          var unsignedBytes = success.unsignedTransactionBytes;
          var signatureHex = this.cryptoService.signatureHex(unsignedBytes, secretPhraseHex);
          this.transactionBytes = this.cryptoService.signTransactionHex(unsignedBytes, signatureHex);
          this.validBytes = true;

          this.tx_fee = success.transactionJSON.feeTQT / 100000000;
          this.tx_amount = success.transactionJSON.amountTQT / 100000000;
          this.tx_total = this.tx_fee + this.tx_amount;

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
  }

  broadcastTransaction(transactionBytes) {
    this.accountService.broadcastTransaction(transactionBytes).subscribe((success) => {

      if (!success.errorCode) {
        alertFunctions.InfoAlertBox('Success',
          'Transaction succesfull broadcasted with Id : ' + success.transaction,
          'OK',
          'success').then((isConfirm: any) => {
            this.router.navigate(['/crowdfunding/show-campaigns']);
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
  }
}
