import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import { AppConstants } from '../../../config/constants';
import * as alertFunctions from '../../../shared/data/sweet-alerts';

@Component({
    selector: 'app-broadcast-transaction',
    templateUrl: './broadcast-transaction.component.html',
    styleUrls: ['./broadcast-transaction.component.scss']
})
export class BroadcastTransactionComponent implements OnInit {
    fullHash: any;
    requestProcessingTime: any;
    transaction: any;
    buttonColor: any;
    showTransaction: boolean = false;
    broadcastTransactionForm: any = {
        'bytes': ''
    }

    constructor(public toolsService: ToolsService) {
    }


    broadcastTransaction() {

        this.toolsService.broadcastTransaction(this.broadcastTransactionForm.bytes).subscribe((success) => {
            if (!success['errorCode']) {

                this.fullHash = success['fullHash'];
                this.requestProcessingTime = success['requestProcessingTime'];
                this.transaction = success['transaction'];

                if (success['transaction']) {
                    this.buttonColor = 'success';
                    this.showTransaction = true;
                } else {
                    this.buttonColor = 'danger';
                }

            } else {
                alertFunctions.InfoAlertBox('Error',
                    'Sorry, an error occured! Reason: ' + success['errorDescription'],
                    'OK',
                    'error').then((isConfirm: any) => {
                    });
            }
        });

    };


    ngOnInit() {
    }

}
