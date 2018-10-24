import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AlertFunctions from '../../../shared/data/sweet-alerts';
import { CurrenciesService } from '../../../module/currencies/currencies.service';
import { AssetsService } from '../../assets/assets.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { CommonService } from '../../../services/common.service';
import { CryptoService } from '../../../services/crypto.service';
import { AppConstants } from '../../../config/constants';
import { VotingService } from '../voting.service';

@Component({
    selector: 'app-create-poll',
    templateUrl: './create-poll.component.html',
    styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent implements OnInit {
    votingModel: number;
    votingOptions: any[] = [];
    pollOptions: any[] = [];

    minimumBalance: number = 0;
    assetId: string;
    currency: string;
    name: string;
    description: string;
    currentHeight: number;
    minNumberOfOptions: number = 1;
    maxNumberOfOptions: number = 1;
    finishHeight: number = 1440;
    finHeight: number = 1440;
    holding: any;
    secretPhrase: any;

    transactionBytes: string;
    tx_fee: number;
    tx_amount: number;
    tx_total: number;
    validBytes: boolean = false;
    signedTx: boolean = true;

    isSecondStepValid: boolean = false;
    assetError: string = '';
    currencyError: string = '';
    errorMessage: string = '';

    constructor(private router: Router,
        private currenciesService: CurrenciesService,
        private assetsService: AssetsService,
        private commonService: CommonService,
        private cryptoService: CryptoService,
        private sessionStorageService: SessionStorageService,
        private votingService: VotingService) {
        this.votingModel = 0;
        this.votingOptions = [
            { label: 'Account', value: 0 },
            { label: 'Balance', value: 1 },
            { label: 'Asset', value: 2 },
            { label: 'Currency', value: 3 }
        ];
    }

    ngOnInit() {

    }

    min() {
        this.finHeight = 1440;
        this.finishHeight = this.finHeight;
        this.validateStepTwo();
    }

    max() {
        this.finHeight = 20000;
        this.finishHeight = this.finHeight;
        this.validateStepTwo();
    }

    increment() {
        this.finHeight = ((this.finHeight + 1440) >= 20000) ? 20000 : this.finHeight + 1440;
        this.finishHeight = this.finHeight;
        this.validateStepTwo();
    }

    decrement() {
        this.finHeight = ((this.finishHeight - 1440) <= 1440) ? 1440 : this.finHeight - 1440;
        this.finishHeight = this.finHeight;
        this.validateStepTwo();
    }

    addNewOption() {
        if (this.pollOptions.length < 10) {
            this.pollOptions.push({});
        } else {
            this.showError('You can add maximum 10 options');
        }
        this.validateStepTwo();
    }

    validateStepOne() {
        if (this.votingModel == 1 && this.minimumBalance == null) {
            this.showError('Enter minimum balance');
            return;
        }

        if (this.votingModel == 2 && !this.assetId) {
            this.showError('Enter the asset ID (numeric)');
            return;
        }

        if (this.votingModel == 3 && !this.currency) {
            this.showError('Enter the currency ticker');
            return;
        }

        if (!this.name) {
            this.showError('Enter a poll name');
            return;
        }

        if (!this.description) {
            this.showError('Enter the poll description');
            return;
        }
    }

    validateStepTwo() {
        this.errorMessage = '';
        this.isSecondStepValid = false;

        if (this.minNumberOfOptions == null) {
            this.errorMessage = 'Enter minimum number of option a voter can choose.';
            return;
        }

        if (this.maxNumberOfOptions == null) {
            this.errorMessage = 'Enter maximum number of option a voter can choose.';
            return;
        }

        if (this.finishHeight == null) {
            this.errorMessage = 'Enter the height of the block.';
            return;
        }

        if (this.finishHeight < 1440 || this.finishHeight > 20000) {
            this.errorMessage = 'The height of the block should be greater than 1440 or less than 20000.';
            return;
        }

        if (this.minNumberOfOptions < 1 || this.minNumberOfOptions > 10) {
            this.errorMessage = 'Minimum number of options a voter can choose should be between 1 to 10.';
            return;
        }

        if (this.maxNumberOfOptions < 1 || this.maxNumberOfOptions > 10) {
            this.errorMessage = 'Maximum number of options a voter can choose should be between 1 to 10.';
            return;
        }

        if (this.minNumberOfOptions > this.maxNumberOfOptions) {
            this.errorMessage = 'The minimum number of options cannot be greater than maximum number of options.';
            return;
        }

        let invalidOptions = this.pollOptions.filter((option, index) => {
            if (!option.value || (option.value && option.value == null)) {
                return option
            }
        });

        if (invalidOptions.length > 0) {
            this.errorMessage = 'Please enter all the options.';
            return;
        }

        if (this.pollOptions.length < this.maxNumberOfOptions) {
            this.errorMessage = 'Enter minimum ' + this.maxNumberOfOptions + ' option(s) & maximum 10 options for the voters to choose from.';
            return;
        }

        if (this.errorMessage == '') {
            this.isSecondStepValid = true;
        }
    }

    getAsset(assetId) {
        this.assetsService.getAsset(assetId).subscribe((success: any) => {
            if (!success.errorCode) {
                this.holding = success.asset;
                this.assetError = '';
            } else {
                this.assetError = success.errorDescription.replace('&#34;', '"').replace('&#34;', '"');
            }
        });
    }

    getCurrency(currencyCode) {
        this.currenciesService.getCurrency(currencyCode).subscribe((success: any) => {
            if (!success.errorCode) {
                this.currency = success.code;
                this.holding = success.currency;
                this.currencyError = '';
            } else {
                this.currencyError = success.errorDescription.replace('&#34;', '"').replace('&#34;', '"');
            }
        });
    }

    createPoll() {
        if (this.errorMessage == '') {
            let pollJson = {
                'name': this.name,
                'description': this.description,
                'votingModel': this.votingModel,
                'minBalanceModel': this.votingModel,
                'minBalance': (this.minimumBalance * 100000000),
                'minNumberOfOptions': this.minNumberOfOptions,
                'maxNumberOfOptions': this.maxNumberOfOptions,
                'minRangeValue': 0,
                'maxRangeValue': this.maxNumberOfOptions,
                'holding': this.holding,
                'fee': 1,
                'options': this.pollOptions.map((o) => {
                    return o.value;
                }),
                'publicKey': this.commonService.getAccountDetailsFromSession('publicKey'),
                'finishHeight': this.currentHeight + this.finishHeight,
                'currentHeight': this.currentHeight
            };

            if (pollJson.votingModel === 3) {
                //pollJson.holding = this.currency;
            }

            let secret = this.secretPhrase;
            let secretPhraseHex;

            if (secret) {
                secretPhraseHex = this.cryptoService.secretPhraseToPrivateKey(secret);
            } else {
                secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
            }

            this.votingService.createPoll(pollJson).subscribe((transaction) => {
                transaction.subscribe((success) => {
                    if (!success.errorCode) {
                        let unsignedBytes = success.unsignedTransactionBytes,
                            signatureHex = this.cryptoService.signatureHex(unsignedBytes, secretPhraseHex);

                        this.transactionBytes = this.cryptoService.signTransactionHex(unsignedBytes, signatureHex);

                        this.tx_fee = success.transactionJSON.feeTQT / 100000000;
                        this.tx_amount = success.transactionJSON.amountTQT / 100000000;
                        this.tx_total = this.tx_fee + this.tx_amount;

                        this.validBytes = true;

                    } else {
                        this.showError('Sorry, an error occured! Reason: ' + success.errorDescription);
                    }
                })
            });
        } else {
            this.showError(this.errorMessage);
        }
    }

    broadcastTransaction(transactionBytes: string) {
        this.commonService.broadcastTransaction(transactionBytes).subscribe((success) => {
            if (!success.errorCode) {
                AlertFunctions.InfoAlertBox(
                    'Success',
                    'Transaction successfully broadcasted with Id : ' + success.transaction + '',
                    'OK',
                    'success')
                    .then((isConfirm: any) => {
                        this.router.navigate(['/voting/show-polls/my']);
                    });
            } else {
                this.showError('Unable to broadcast transaction. Reason: ' + success.errorDescription);
            }
        })
    }

    showError(message: string): void {
        AlertFunctions.InfoAlertBox(
            'Error',
            message,
            'OK',
            'error')
            .then((isConfirm: any) => {

            });
    }

    getBlockChainStatus() {
        this.currenciesService.getBlockChainStatus().subscribe((success: any) => {
            this.currentHeight = success.numberOfBlocks;
        })
    }
}
