import { Component, OnInit } from '@angular/core';
import { AmountToQuantPipe } from '../../../../pipes/amount-to-quant.pipe';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';
import { CryptoService } from '../../../../services/crypto.service';
import { AppConstants } from '../../../../config/constants';
import { SessionStorageService } from '../../../../services/session-storage.service';
import { CurrenciesService } from '../../../currencies/currencies.service';
import { AliasesService } from '../../../aliases/aliases.service';
import { OptionService } from '../../../../services/option.service';
import { AccountService } from '../../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-send-secret',
    templateUrl: './send-secret.component.html',
    styleUrls: ['./send-secret.component.scss']
})
export class SendSecretComponent implements OnInit {

    t: any;
    hasPrivateMessage: boolean;
    hasReceiverPublicKey: boolean;
    sendSecretForm = {
        currentHeight: 0,
        deferredHeight: 1440,
        recipientRS: '',
        amount: null,
        fee: 0,
        secret: '',
        message: '',
        pubkey: '',
        secretHash: ''
    };
    deferredHeight = 1440;
    days = 1;
    accountDetails: any = '';
    validForm = false;
    validBytes = false;
    hasPublicKeyAdded = false;
    hasMessageAdded = false;
    encrypted: any = '';
    tx_fee: any;
    tx_amount: any;
    tx_total: any;
    openBookMarks: boolean = false;
    transactionBytes: any;

    unsignedTx: boolean;
    addMessage: boolean;

    constructor(public sessionStorageService: SessionStorageService,
        public accountService: AccountService,
        public cryptoService: CryptoService,
        public amountToQuant: AmountToQuantPipe,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public aliasesService: AliasesService,
        public currenciesService: CurrenciesService,
        public optionService: OptionService) {
        this.hasPrivateMessage = false;
        this.hasReceiverPublicKey = false;
        this.getBlockChainStatus();
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: any) => {
            if (params.recipient) {
                this.sendSecretForm.recipientRS = params.recipient;
            }
        });
    }

    setMessage() {
        this.hasPrivateMessage = !this.hasPrivateMessage;
        if (!this.hasPrivateMessage) {
            this.sendSecretForm.message = '';
        }
    }

    setPublicKey() {
        this.hasReceiverPublicKey = !this.hasReceiverPublicKey;
        if (!this.hasReceiverPublicKey) {
            this.sendSecretForm.pubkey = '';
        }
    }

    bookmarkSelected(e) {
        //this.sendSecretForm.recipientRS = e.data.account;
        this.openBookMarks = false;
    }

    loadBookmarkView() {
        this.router.navigate(['/account/send/bookmark-list-only'], { queryParams: { fromView: 'secret' } });
        //this.openBookMarks = true;
    }

    goBack() {
        this.openBookMarks = false;
    }

    searchAliases() {
        this.aliasesService.searchAlias(this.sendSecretForm.recipientRS).subscribe((success) => {
            var aliases = success.aliases || [];
            for (var i = 0; i < aliases.length; i++) {
                var alias = aliases[i];
                if (alias.aliasName.toUpperCase() === this.sendSecretForm.recipientRS.toUpperCase()) {
                    var aliasURI = alias.aliasURI;
                    var aliasType = aliasURI.split(':');
                    if (aliasType[0] === 'acct') {
                        var accountRS = aliasType[1].split('@')[0];
                        this.sendSecretForm.recipientRS = accountRS;
                        break;
                    }
                }
            }
        });
    };

    getBlockChainStatus() {
        this.currenciesService.getBlockChainStatus().subscribe((success) => {
            this.sendSecretForm.currentHeight = success.numberOfBlocks;
        });
    };

    increment() {
        if (this.deferredHeight >= 14400) {
            this.deferredHeight = 14400;
            return;
        } else {
            this.deferredHeight = this.deferredHeight + 1440;
        }

        this.sendSecretForm.deferredHeight = this.deferredHeight;
        this.days = parseInt(String(this.deferredHeight / 1440), 0);
    };

    decrement() {
        if (this.deferredHeight <= 1440) {
            this.deferredHeight = 1440;
            return;
        } else {
            this.deferredHeight = this.deferredHeight - 1440;
        }

        this.sendSecretForm.deferredHeight = this.deferredHeight;
        this.days = parseInt(String(this.deferredHeight / 1440), 0);
    };

    max() {
        this.deferredHeight = 14400;
        this.sendSecretForm.deferredHeight = 14400;

        this.days = parseInt(String(this.deferredHeight / 1440), 0);

    };

    min() {
        this.deferredHeight = 1440;
        this.sendSecretForm.deferredHeight = 1440;
        this.days = parseInt(String(this.deferredHeight / 1440), 0);
    };

    createAndSignTransaction(transactionOptions, secretPhraseHex) {
        this.accountService.createPhasedTransaction(
            transactionOptions
        ).subscribe((success_) => {
            success_.subscribe((success) => {
                if (!success.errorCode) {

                    let unsignedBytes = success.unsignedTransactionBytes;
                    let signatureHex = this.cryptoService.signatureHex(unsignedBytes, secretPhraseHex);
                    let transactionBytes = this.cryptoService.signTransactionHex(unsignedBytes, signatureHex);

                    this.transactionBytes = transactionBytes;
                    this.validBytes = true;

                    this.tx_fee = success.transactionJSON.feeTQT / 100000000;
                    this.tx_amount = success.transactionJSON.amountTQT / 100000000;
                    this.tx_total = this.tx_fee + this.tx_amount;

                    return transactionBytes;
                } else {
                    alertFunctions.InfoAlertBox('Error',
                        'Sorry, an error occured! Reason: ' + success.errorDescription,
                        'OK',
                        'error').then((isConfirm: any) => {

                        });
                }
            });
        });
    };

    getAndVerifyAccount(sendTokenForm) {
        this.validBytes = false;
        let sendForm = sendTokenForm;

        let recipientRS = sendForm.recipientRS;
        let amount = this.amountToQuant.transform(sendForm.amount);
        let fee = 1; //sendForm.fee;
        let secret = sendForm.secretPhrase;
        var secretHash = sendForm.secretHash;
        let message = sendForm.message;
        let pubkey = sendForm.pubkey;

        let cuurHeight = parseInt(String(sendForm.currentHeight), 0);
        let defOffset = parseInt(String(sendForm.deferredHeight), 0);
        let deferredBlocks = cuurHeight + defOffset;

        let hasPublicKeyAdded = false;
        let hasMessageAdded = false;
        let hasSecretAdded = false;

        if (pubkey && pubkey.length > 0) {
            hasPublicKeyAdded = true;
        }
        if (message && message.length > 0) {
            hasMessageAdded = true;
        }
        if (secret && secret.length > 0) {
            hasSecretAdded = true;
        }

        if (!fee) {
            fee = 1;
        }

        this.hasPublicKeyAdded = hasPublicKeyAdded;
        this.hasMessageAdded = hasMessageAdded;

        let senderPublicKey = this.accountService.getAccountDetailsFromSession('publicKey');
        let secretPhraseHex;
        if (hasSecretAdded) {
            secretPhraseHex = this.cryptoService.secretPhraseToPrivateKey(secret);
        } else {
            secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
        }

        this.accountService.getAccountDetails(recipientRS).subscribe((success: any) => {

            let recipientPublicKey = success.publicKey;

            if (!recipientPublicKey && hasPublicKeyAdded) {
                recipientPublicKey = pubkey;
            }

            if (!success.errorCode || success.errorCode === 5) {

                this.accountDetails = success;

                if (!recipientPublicKey && !hasPublicKeyAdded && hasMessageAdded) {
                    alertFunctions.InfoAlertBox('Error',
                        'Sorry, an error occured! Reason: This account has no visible public key because it never had any outbound transaction. Encrypted messages are not available without a public key. Ask the account holder for his public key and add the key on the former page to this transaction',
                        'OK',
                        'error').then(() => {

                        });
                    return;
                }

                if (!recipientPublicKey && !hasPublicKeyAdded) {
                    alertFunctions.InfoAlertBox('Info',
                        'Note: This account never had an outbound transaction. Make sure this account is the right one. In doubt, ask the account holder for his public key and add it on the former page to this transaction.',
                        'OK',
                        'info').then((isConfirm: any) => {

                        });
                }

                let encrypted: any = { data: '', nonce: '' };
                if (hasMessageAdded) {
                    if (!recipientPublicKey) {
                        recipientPublicKey = pubkey;
                    }
                    encrypted = this.cryptoService.encryptMessage(message, secretPhraseHex, recipientPublicKey);
                    this.encrypted = JSON.stringify(encrypted);
                } else {
                    this.encrypted = encrypted;
                }

                let transactionOptions = {
                    'requestType': 'sendToken',
                    'publicKey': senderPublicKey,
                    'recipient': recipientRS,
                    'amountTQT': amount,
                    'feeTQT': fee,
                    'deadline': this.optionService.getOption('DEADLINE', ''), // $rootScope.options.DEADLINE,
                    'broadcast': false,
                    'recipientPublicKey': recipientPublicKey,

                    'messageToEncryptIsText': 'true',
                    'compressMessageToEncrypt': 'true',
                    'encryptedMessageIsPrunable': false,
                    'encryptedMessageData': encrypted.data,
                    'encryptedMessageNonce': encrypted.nonce,

                    'phased': true,
                    'phasingFinishHeight': deferredBlocks,
                    'phasingVotingModel': 5,
                    'phasingQuorum': 1,

                    'phasingMinBalance': 0,
                    'phasingMinBalanceModel': 0,
                    'phasingHolding': null,
                    'phasingLinkedFullHash': null,
                    'phasingHashedSecret': secretHash,
                    'phasingHashedSecretAlgorithm': 2
                };

                this.createAndSignTransaction(transactionOptions, secretPhraseHex);

                if (encrypted.data === '') {
                    encrypted = '';
                }

            } else {
                alertFunctions.InfoAlertBox('Error',
                    'Sorry, an error occured! Reason: ' + success.errorDescription,
                    'OK',
                    'error').then(() => {

                    });
            }
        });
    };

    broadcastTransaction = function (transactionBytes) {
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
