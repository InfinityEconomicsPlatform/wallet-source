import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import { AppConstants } from '../../../config/constants';
import * as alertFunctions from '../../../shared/data/sweet-alerts';

@Component({
    selector: 'app-parse-transaction',
    templateUrl: './parse-transaction.component.html',
    styleUrls: ['./parse-transaction.component.scss']
})
export class ParseTransactionComponent implements OnInit {
    buttonColor: any = 'primary';
    parseTransactionForm: any = {
        'bytes': '',
        'Json': ''
    }

    constructor(public toolsService: ToolsService) {
    }

    ngOnInit() {
    }

    parseTransaction() {

        this.toolsService.parseTransaction(this.parseTransactionForm.bytes).subscribe((success) => {
            if (!success['errorCode']) {

                delete success['restangularized'];
                delete success['fromServer'];
                delete success['parentResource'];
                delete success['restangularCollection'];
                delete success['route'];
                delete success['reqParams'];

                if (success['verify']) {
                    this.buttonColor = 'success';
                } else {
                    this.buttonColor = 'danger';
                }

                this.parseTransactionForm.json = JSON.stringify(success);

            } else {

                alertFunctions.InfoAlertBox('Error',
                    'Sorry, an error occured! Reason: ' + success['errorDescription'],
                    'OK',
                    'error').then((isConfirm: any) => {
                    });
            }
        });

    };

}
