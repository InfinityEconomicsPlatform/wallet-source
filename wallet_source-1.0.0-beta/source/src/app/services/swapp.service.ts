import {Injectable} from '@angular/core';
import {CommonService} from './common.service';

@Injectable()
export class SwappService {

    swapps: Array<any>;
    watchList: Array<any>;
    keyForLocalStore: string;
    constructor(public commonsService: CommonService) {
       this.loadSWApps();
    }

    loadSWApps() {
        let publicKey = this.commonsService.getAccountDetailsFromSession('publicKey');
        this.keyForLocalStore = "swapps_array_" + publicKey;
        const localStored = (localStorage[this.keyForLocalStore] !== undefined) ? JSON.parse(localStorage[this.keyForLocalStore]) : undefined;
        this.swapps = localStored || [
            {
                name: 'Assets',
                icon: 'icon-assets',
                desc: 'The Asset Exchange is IEP\'s built­in decentralised trading engine. Using the Asset Exchange  you can create, buy and sell assets that represent data beyond simple   coin   transfers   which   opens   up   wide­ranging   possibilities.',
                isEnabled: false
            },
            {
                name: 'Currencies',
                icon: 'icon-currencies',
                desc: 'The currency entity is the basic building block of the IEP Currencies System. A currency has a unique name and code and uniqueness is guaranteed by the protocol, currencies can be deleted and their code can be reused under certain conditions. The total currency supply is divisible into currency units.',
                isEnabled: false
            },
            {
                name: 'Aliases',
                icon: 'icon-Aliases',
                desc: 'Alias System feature essentially allows one piece of text to be substituted for another, so that key-phrases can be used to represent other things.',
                isEnabled: false
            },
            {
                name: 'Voting',
                icon: 'icon-Voting',
                desc: 'The IEP Voting System enables any account to create a poll with one question and up to 10 answers. ',
                isEnabled: false
            },
            {
                name: 'AT',
                icon: 'icon-AT',
                desc: 'Smart contracts are computer programs that can automatically execute the terms of a contract.',
                isEnabled: false
            },
            {
                name: 'Crowdfunding',
                icon: 'icon-Extensions',
                desc: 'Crowdfunding is the practice of funding a project or venture by raising monetary contributions from a large number of people. ',
                isEnabled: false
            },
            {
                name: 'Subscriptions',
                icon: 'icon-Subscription',
                desc: 'IEP offers decentralized recurring payments that users can initiate and cancel at any time.',
                isEnabled: false
            },
            {
                name: 'Escrow',
                icon: 'icon-Escrow',
                desc: 'An escrow service allows safer payment by securely holding a buyer’s coins in escrow until the terms of the sale are met and as a result the buyer releases payment to the seller.',
                isEnabled: false
            },
            {
                name: 'Shuffling',
                icon: 'icon-Shuffling',
                desc: 'Shuffling is an effective privacy feature and it enables participants to mix their funds quickly and efficiently with other participants funds. ',
                isEnabled: false
            },
            {
                name: 'Tools',
                icon: 'icon-Extensions',
                desc: 'Enable tools to activate the access to extensions like Market Capitalization, recent news regarding the XIN, and everything related to the XIN environment.',
                isEnabled: false
            },
        ];
        this.watchList = [];
    }

    clearSwapps() {
        let publicKey = this.commonsService.getAccountDetailsFromSession('publicKey');
        localStorage.removeItem("swapps_array_" + publicKey);
    }

    getAllSwapps() {
        return this.swapps;
    }

    setSwappSetting(swapps) {
        localStorage[this.keyForLocalStore] = JSON.stringify(this.swapps);
        this.swapps = swapps;
    }

    pushToWatch(appName, _this) {
        this.watchList.push({_this, appName})
    }

    applyChanges() {
        let _this = this;
        this.watchList.forEach(view => {
            view._this.viewContainer.clear();

            _this.swapps.forEach(function (app) {
                if (app.name == view.appName && app.isEnabled) {
                    view._this.viewContainer.createEmbeddedView(view._this.templateRef);
                }
            })
        });
    }
}
