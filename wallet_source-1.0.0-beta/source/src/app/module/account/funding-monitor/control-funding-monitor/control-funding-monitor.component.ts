import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrenciesService } from '../../../currencies/currencies.service';
import { AssetsService } from '../../../assets/assets.service';
import { OptionService } from '../../../../services/option.service';
import { AccountService } from '../../account.service';
import * as alertFunctions from '../../../../shared/data/sweet-alerts';
import { AmountToQuantPipe } from '../../../../pipes/amount-to-quant.pipe';
import { ShareToQuantityPipe } from '../../../../pipes/share-to-quantity.pipe';

@Component({
    selector: 'app-control-funding-monitor',
    templateUrl: './control-funding-monitor.component.html',
    styleUrls: ['./control-funding-monitor.component.scss']
})
export class ControlFundingMonitorComponent implements OnInit {

    holdingOptions: any = [];
    fundingMonitorForm: any;
    hasLocal: boolean = false;
    connectionMode: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private optionService: OptionService,
        private assetsService: AssetsService,
        private currenciesService: CurrenciesService) {
        this.holdingOptions = [
            { label: 'XIN', value: '0' },
            { label: 'Asset', value: '1' },
            { label: 'Currency', value: '2' }
        ];
        this.fundingMonitorForm = {
            property: '',
            amount: 0,
            threshold: 0,
            interval: 0,
            holding: '',
            holdingType: 0,
            secretPhrase: '',
            adminPassword: ''
        };
    }
    ngOnInit() {
        this.connectionMode = this.optionService.getOption('CONNECTION_MODE', '');
        this.hasLocal = this.connectionMode === 'LOCAL_HOST';
        this.displayNotificationAlert();
    }

    displayNotificationAlert() {
        if (this.connectionMode !== 'LOCAL_HOST' && this.connectionMode !== 'TESTNET' && this.connectionMode !== 'DEVTESTNET') {
            alertFunctions.InfoAlertBox('Error',
                'block-generation-localhost-error-msg',
                'OK', 'error');
        } else {
            this.hasLocal = true;
        }
    }

    getAsset(assetId) {
        this.assetsService.getAsset(assetId).subscribe((success: any) => {
            this.fundingMonitorForm.asset = success;
        })
    }

    getCurrency(currencyCode) {
        this.currenciesService.getCurrency(currencyCode).subscribe((success: any) => {
            this.fundingMonitorForm.currency = success;
        })
    }

    fundingMonitorActions() {
        let property = this.fundingMonitorForm.property;
        let amount = this.fundingMonitorForm.amount;
        let threshold = new AmountToQuantPipe().transform(this.fundingMonitorForm.threshold); // fundingMonitorForm.threshold;
        let interval = this.fundingMonitorForm.interval;
        let holding = this.fundingMonitorForm.holding;
        let holdingType = this.fundingMonitorForm.holdingType;
        let secretPhrase = this.fundingMonitorForm.secretPhrase;
        let adminPassword = this.fundingMonitorForm.adminPassword;
        switch (holdingType) {
            case '0': {
                amount = new AmountToQuantPipe().transform(amount);
                break;
            }
            case '1': {
                amount = new ShareToQuantityPipe().transform(amount);
                break;
            }
            case '2': {
                amount = new ShareToQuantityPipe().transform(amount);
                break;
            }
        }

        this.accountService.startFundingMonitor(property, amount, threshold, interval, holding, holdingType, secretPhrase, adminPassword).subscribe((success: any) => {
            if (!success.errorCode) {
                alertFunctions.InfoAlertBox('Success',
                    'Monitor for account property : ' + property + ' successful started.',
                    'OK', 'success')
                    .then((isConfirm) => {
                        this.fundingMonitorForm = {
                            property: '',
                            amount: 0,
                            threshold: 0,
                            interval: 0,
                            holding: '',
                            holdingType: 0,
                            secretPhrase: '',
                            adminPassword: ''
                        };
                        this.router.navigateByUrl('/account/funding-monitor/active-monitors');
                    });
            } else {
                alertFunctions.InfoAlertBox('Error',
                    'Unable start the monitor for account property : ' + property + '. Reason: ' + success.errorDescription,
                    'OK', 'error');
            }
        })
    }

}
