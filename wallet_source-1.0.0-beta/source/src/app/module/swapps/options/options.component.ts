import { Component, OnInit } from '@angular/core';
import { OptionService } from "../../../services/option.service";
import { SessionStorageService } from "../../../services/session-storage.service";
import { CommonService } from "../../../services/common.service";
import { NodeService } from "../../../services/node.service";
import { LocalhostService } from "../../../services/localhost.service";
import { AppConstants } from "../../../config/constants";
import * as AlertFunctions from "../../../shared/data/sweet-alerts";
import { isBoolean } from 'util';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
    CONNECTION_MODES: any[] = [];
    connectedURL: string = '';

    optionsForm: any;
    activeIds: string[] = [];

    constructor(public optionService: OptionService, public sessionStorageService: SessionStorageService, public commonService: CommonService, public localhostService: LocalhostService, public nodeService: NodeService) {
        this.CONNECTION_MODES = ['AUTO', 'HTTPS', 'FOUNDATION', 'MANUAL', 'LOCAL_HOST', 'TESTNET', 'LOCALTESTNET', 'DEVTESTNET'];
        this.activeIds = ["nodeAndConnections", "blocksAndConfirmations", "wallet", "extensions"];
        this.optionsForm = {
            CONNECTION_MODE: '',
            USER_NODE_URL: '',
            RANDOMIZE_NODES: 0,
            REFRESH_INTERVAL_MILLI_SECONDS: 60,
            AUTO_UPDATE: false,
            EXTENSIONS: 1
        }
    }

    ngOnInit() {
        let publicKey = this.commonService.getAccountDetailsFromSession('publicKey');

        this.optionService.loadOptions(publicKey, (optionsObject) => {
            this.optionsForm = this.copyJson(optionsObject, this.optionsForm);
            this.sessionStorageService.saveToSession(AppConstants.baseConfig.SESSION_APP_OPTIONS, optionsObject);
        }, (e) => {
            this.sessionStorageService.saveToSession(AppConstants.baseConfig.SESSION_APP_OPTIONS, AppConstants.DEFAULT_OPTIONS);
        });

        this.connectedURL = this.nodeService.getNodeUrl(this.optionService.getOption('CONNECTION_MODE', publicKey), this.optionService.getOption('RANDOMIZE_NODES', publicKey));
    }

    copyJson(fromJson, toJson) {
        fromJson = fromJson || {};
        toJson = toJson || {};
        for (let key in fromJson) {
            if (fromJson.hasOwnProperty(key)) {
                if (!isNaN(fromJson[key]) && !isBoolean(fromJson[key])) {
                    fromJson[key] = parseInt(fromJson[key]);
                }
                toJson[key] = fromJson[key];
            }
        }
        return toJson;
    }

    getOptionsJsonObject(options) {
        let finalJson = {};
        for (let key in AppConstants.DEFAULT_OPTIONS) {
            if (AppConstants.DEFAULT_OPTIONS.hasOwnProperty(key)) {
                finalJson[key] = options[key];
            }
        }
        return finalJson;
    }

    nodeUrl() {
        var connectionMode = this.optionsForm.CONNECTION_MODE;
        if (connectionMode === 'AUTO') {
            return true;
        }
        return this.isValidUrl();
    }

    validateAndUpdate() {
        let url = this.optionsForm.USER_NODE_URL;
        let connectionMode = this.optionsForm.CONNECTION_MODE;

        this.updateConnectionMode(this.optionsForm);

        if (connectionMode === 'AUTO') {
            this.updateOptions();
        } else if (url) {
            this.localhostService.getPeerState(url).subscribe((success) => {
                this.updateOptions();
            });
        }
    }

    updateOptions() {
        let publicKey = this.commonService.getAccountDetailsFromSession('publicKey'),
            options = this.getOptionsJsonObject(this.optionsForm),
            finalOptions = [];
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                let option = { 'publicKey': publicKey, 'optionName': key, 'value': options[key] };
                finalOptions.push(option);
            }
        }

        this.optionService.updateOptions(finalOptions, (success) => {
            let publicKey = this.commonService.getAccountDetailsFromSession('publicKey');

            this.optionService.loadOptions(publicKey, (optionsObject) => {
                this.sessionStorageService.saveToSession(AppConstants.baseConfig.SESSION_APP_OPTIONS, optionsObject);
                this.nodeService.clearNodeConfig();
                this.optionService.emitOptionsChanged();
            }, (error) => {
                this.sessionStorageService.saveToSession(AppConstants.baseConfig.SESSION_APP_OPTIONS, AppConstants.DEFAULT_OPTIONS);
                this.optionService.emitOptionsChanged();
            })

        }, (error) => {

        });
    }

    updateConnectionMode(form) {
        let connectionMode = this.optionsForm.CONNECTION_MODE;

        if (connectionMode === 'LOCAL_HOST') {
            this.optionsForm.USER_NODE_URL = 'http://localhost:23457';
            this.optionsForm.RANDOMIZE_NODES = 0;
            this.optionsForm.TESTNET = false;
            this.optionsForm.EXTENSIONS = 1;
        } else if (connectionMode === 'MANUAL') {
            this.optionsForm.RANDOMIZE_NODES = 0;
            this.optionsForm.TESTNET = false;
            this.optionsForm.EXTENSIONS = 1;
        } else if (connectionMode === 'HTTPS') {
            this.optionsForm.USER_NODE_URL = 'https://ssl.infinity-economics.org';
            this.optionsForm.RANDOMIZE_NODES = 0;
            this.optionsForm.TESTNET = false;
            this.optionsForm.EXTENSIONS = 1;
        } else if (connectionMode === 'AUTO') {
            this.optionsForm.RANDOMIZE_NODES = 1;
            this.optionsForm.TESTNET = false;
            this.optionsForm.EXTENSIONS = 1;
        } else if (connectionMode === 'FOUNDATION') {
            this.optionsForm.USER_NODE_URL = 'http://46.244.20.41:23457';
            this.optionsForm.RANDOMIZE_NODES = 0;
            this.optionsForm.TESTNET = false;
            this.optionsForm.EXTENSIONS = 1;
        } else if (connectionMode === 'TESTNET') {
            this.optionsForm.USER_NODE_URL = 'http://185.35.138.140:9876';
            this.optionsForm.RANDOMIZE_NODES = 0;
            this.optionsForm.TESTNET = true;
            this.optionsForm.EXTENSIONS = 1;
        } else if (connectionMode === 'LOCALTESTNET') {
            this.optionsForm.USER_NODE_URL = 'http://localhost:9876';
            this.optionsForm.RANDOMIZE_NODES = 0;
            this.optionsForm.TESTNET = true;
            this.optionsForm.EXTENSIONS = 1;
        } else if (connectionMode === 'DEVTESTNET') {
            this.optionsForm.USER_NODE_URL = 'http://185.35.138.140:9000';
            this.optionsForm.RANDOMIZE_NODES = 0;
            this.optionsForm.TESTNET = true;
            this.optionsForm.DEVNET = true;
            this.optionsForm.EXTENSIONS = 1;
        }
    }

    isValidUrl() {
        let url = this.optionsForm.USER_NODE_URL;
        if (url) {
            return this.localhostService.isValidUrl(url);
        } else {
            return false;
        }
    }

}
