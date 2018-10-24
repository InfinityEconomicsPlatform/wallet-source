import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VotingService } from '../../../voting.service';
import { CommonService } from '../../../../../services/common.service';
import { CryptoService } from '../../../../../services/crypto.service';
import { SessionStorageService } from '../../../../../services/session-storage.service';
import { AppConstants } from '../../../../../config/constants';
import * as AlertFunctions from '../../../../../shared/data/sweet-alerts';

@Component({
    selector: 'app-poll-vote',
    templateUrl: './poll-vote.component.html',
    styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements OnInit {
    poll: any;
    options: any[] = [];
    isStepOneFormValid: boolean = false;
    optionSelected: any[] = [];
    signatureHex: string;
    transactionBytes: string;
    transactionJSON: string;
    tx_fee: number;
    tx_amount: number;
    tx_total: number;
    validBytes: boolean;
    signedTx: boolean = true;

    constructor(private _location: Location, private route: ActivatedRoute, public votingService: VotingService, public commonService: CommonService, private cryptoService: CryptoService, public sessionStorageService: SessionStorageService) {
        this.poll = {
            options: []
        }
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            this.getPollDetails(params.id);
        });
    }

    getPollDetails(pollId) {
        if (pollId != 'undefined') {
            this.votingService.getPoll(pollId).subscribe((pollDetails: any) => {
                this.poll = pollDetails;
                this.options = this.poll.options.map((option, index) => {
                    return {
                        index: index,
                        name: option,
                        value: false
                    }
                });
            });
        } else {
            this._location.back();
        }
    }

    handleOptions(option) {
        this.options[option].value = !this.options[option].value;

        this.optionSelected = this.options.filter((val, index) => {
            if (val.value) return val;
        }).map((value) => {
            return value.name;
        });

        if (this.poll.minNumberOfOptions <= this.optionSelected.length && this.poll.maxNumberOfOptions >= this.optionSelected.length) {
            this.isStepOneFormValid = true;
        } else {
            this.isStepOneFormValid = false;
        }
    }

    nextStep() {
        if (this.isStepOneFormValid) {
            this.castVote();
        } else {
            AlertFunctions.InfoAlertBox(
                'Error',
                'You have to select atleast min. ' + this.poll.minNumberOfOptions + ' and max. ' + this.poll.maxNumberOfOptions + ' options.',
                'OK',
                'error')
                .then((isConfirm: any) => {

                });
        }
    }

    castVote() {
        let publicKey = this.commonService.getAccountDetailsFromSession('publicKey');
        let pollId = this.poll.poll;
        let options = this.optionSelected;
        let secret = this.poll.secretPhrase;
        let optionNames = this.votingService.getOptionNames(this.poll.options, options);
        let fee = 1;
        let secretPhraseHex;

        if (secret) {
            secretPhraseHex = this.cryptoService.secretPhraseToPrivateKey(secret);
        } else {
            secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
        }

        this.votingService.castVote(publicKey, pollId, optionNames, fee).subscribe((promise: any) => {
            promise.subscribe((success) => {
                if (!success.errorCode) {
                    this.signatureHex = this.cryptoService.signatureHex(success.unsignedTransactionBytes, secretPhraseHex);

                    this.transactionBytes = this.cryptoService.signTransactionHex(success.unsignedTransactionBytes, this.signatureHex);
                    this.transactionJSON = success.transactionJSON;

                    this.tx_fee = success.transactionJSON.feeTQT / 100000000;
                    this.tx_amount = success.transactionJSON.amountTQT / 100000000;
                    this.tx_total = this.tx_fee + this.tx_amount;

                    this.validBytes = true;
                } else {
                    AlertFunctions.InfoAlertBox(
                        'Error',
                        'Sorry, an error occured! Reason: ' + success.errorDescription,
                        'OK',
                        'error')
                        .then((isConfirm: any) => {
                            this._location.back();
                        });
                }
            });

        });
    }

    broadcastTransaction(transactionBytes) {
        this.commonService.broadcastTransaction(this.transactionBytes).subscribe((success: any) => {
            if (!success.errorCode) {
                AlertFunctions.InfoAlertBox(
                    'Success',
                    'Transaction successful broadcasted with Id : ' + success.transaction + '',
                    'OK',
                    'success')
                    .then((isConfirm: any) => {
                        this._location.back();
                    });
            } else {
                AlertFunctions.InfoAlertBox(
                    'Error',
                    'Unable to broadcast transaction. Reason: ' + success.errorDescription,
                    'OK',
                    'Error')
                    .then((isConfirm: any) => {

                    });
            }
        })
    }

    signedTransaction() {
        this.signedTx = !this.signedTx;
    }

    goBack() {
        this._location.back();
    }
}
