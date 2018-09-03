import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-show-currencies',
  templateUrl: './show-currencies.component.html',
  styleUrls: ['./show-currencies.component.scss']
})
export class ShowCurrenciesComponent implements OnInit {

    source: LocalDataSource;
    settings = {
        columns: {
            ticker: {
                title: 'Ticker',
                filter: false
            },
            name: {
                title: 'Name',
                filter: false
            },
            issuer: {
                title: 'Issuer',
                filter: false
            },
            supply: {
                title: 'Supply',
                filter: false
            },
            exchanges: {
                title: 'Exchanges',
                filter: false
            },
            transfers: {
                title: 'Transfers',
                filter: false
            }
        },
        editable: false,
        hideSubHeader: true,
        actions: {
            position: 'right',
            add: false,
            edit: false,
            delete: false,
            custom: [
                {
                    name: 'detail',
                    title: '<i class="fa fa-list-ul warning font-medium-1 mr-2"></i>',
                },
                {
                    name: 'trade_desk',
                    title: '<i class="fa fa-bar-chart warning font-medium-1 mr-2"></i>',
                },
                {
                    name: 'dividend',
                    title: '<i class="fa fa-usd warning font-medium-1 mr-2"></i>',
                },
            ]
        },
        attr: {
            class: "table table-responsive"
        }
    };
    constructor() {
        this.source = new LocalDataSource([ {ticker: 'BIT', name: 'Bitcoin', issuer: 'XIN-Z7ZL-KBAP-HW22-4JUQ9',
            supply: 21000000.00, exchanges: 55, transfers: 0},
            { ticker: 'BIT', name: 'Bitcoin', issuer: 'XIN-Z7ZL-KBAP-HW22-4JUQ9',
              supply: 21000000.00, exchanges: 55, transfers: 0},
            { ticker: 'BIT', name: 'Bitcoin', issuer: 'XIN-Z7ZL-KBAP-HW22-4JUQ9',
                supply: 21000000.00, exchanges: 55, transfers: 0},
            { ticker: 'BIT', name: 'Bitcoin', issuer: 'XIN-Z7ZL-KBAP-HW22-4JUQ9',
                supply: 21000000.00, exchanges: 55, transfers: 0},
            { ticker: 'BIT', name: 'Bitcoin', issuer: 'XIN-Z7ZL-KBAP-HW22-4JUQ9',
                supply: 21000000.00, exchanges: 55, transfers: 0},
            { ticker: 'BIT', name: 'Bitcoin', issuer: 'XIN-Z7ZL-KBAP-HW22-4JUQ9',
                supply: 21000000.00, exchanges: 55, transfers: 0}
        ]); // create the source
    }

    ngOnInit() {
    }
}
