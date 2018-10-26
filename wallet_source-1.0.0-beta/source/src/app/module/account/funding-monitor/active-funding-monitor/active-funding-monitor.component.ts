import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../config/page';
import { CryptoService } from '../../../../services/crypto.service';
import { SessionStorageService } from '../../../../services/session-storage.service';
import { AccountService } from '../../account.service';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';
import { AppConstants } from '../../../../config/constants';

@Component({
    selector: 'app-active-funding-monitor',
    templateUrl: './active-funding-monitor.component.html',
    styleUrls: ['./active-funding-monitor.component.scss']
})
export class ActiveFundingMonitorComponent implements OnInit {
    monitors: any;
    page = new Page();
    secretPhrase: string = '';

    constructor(private sessionStorageService: SessionStorageService,
        private cryptoService: CryptoService,
        private accountService: AccountService) {

    }

    ngOnInit() {
        this.setPage({ offset: 0 });
    }

    setPage(pageInfo) {
        this.page.pageNumber = pageInfo.offset;
        let startIndex = this.page.pageNumber * 10;
        let endIndex = ((this.page.pageNumber + 1) * 10) - 1;
        this.getFundingMonitors();
    }

    reload() {
        this.setPage({ offset: 0 });
    }

    getFundingMonitors() {
        let privateKey = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
        this.secretPhrase = this.cryptoService.secretPhraseFromPrivateKey(privateKey);

        this.accountService.getFundingMonitors(undefined, undefined, undefined, undefined, this.secretPhrase, undefined).subscribe((success: any) => {
            this.monitors = success.monitors;
            if (this.page.pageNumber === 0 && this.monitors.length < 10) {
                this.page.totalElements = this.monitors.length;
            } else if (this.page.pageNumber > 0 && this.monitors.length < 10) {
                this.page.totalElements = this.page.pageNumber * 10 + this.monitors.length;
                this.page.totalPages = this.page.pageNumber;
            }
        })
    }

    stopFundingMonitor(fund) {
        alertFunctions.confirmText(
            'Confirm',
            'Are you sure, want to stop this monitor?',
            'OK',
            'Cancel'
        ).then((isConfirm) => {
            if (isConfirm.value) {
                if (parseInt(fund.holdingType) === 0) {
                    this.accountService.stopFundingMonitor(
                        fund.property,
                        undefined,
                        undefined,
                        undefined,
                        this.secretPhrase,
                        undefined
                    ).subscribe((success: any) => {
                        if (success.stopped === 1) {
                            alertFunctions.InfoAlertBox('Success',
                                'Funding monitor for property: ' + fund.property + ' successfully stopped',
                                'OK', 'success');
                        } else {
                            alertFunctions.InfoAlertBox('Error',
                                'unable-stop-funding-monitor',
                                'OK', 'error');
                        }
                        this.getFundingMonitors();
                    })
                } else {
                    this.accountService.stopFundingMonitor(
                        fund.property,
                        fund.holding,
                        fund.holdingType,
                        undefined,
                        this.secretPhrase,
                        undefined
                    ).subscribe((success: any) => {
                        if (success.stopped === 1) {
                            alertFunctions.InfoAlertBox('Success',
                                'Funding monitor for property: ' + fund.property + ' successfully stopped',
                                'OK', 'success');
                        } else {
                            alertFunctions.InfoAlertBox('Error',
                                'unable-stop-funding-monitor',
                                'OK', 'error');
                        }
                        this.getFundingMonitors();
                    })
                }
            }
        });
    }

}
