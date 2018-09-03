import {Component, OnInit} from '@angular/core';
import {ToolsService} from '../tools.service';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import {AppConstants} from '../../../config/constants';

@Component({
    selector: 'app-validate-signature',
    templateUrl: './validate-signature.component.html',
    styleUrls: ['./validate-signature.component.scss']
})
export class ValidateSignatureComponent implements OnInit {
    valid: any;
    color: any = 'black';
    buttonColor: any = 'primary';
    account: any = 'Account';
    validateSignatureForm: any = {
        'token': '',
        'message': ''
    }

    constructor(public toolsService: ToolsService) {
    }

    ngOnInit() {
    }

    validateToken() {

        this.toolsService.decodeToken(this.validateSignatureForm.token, this.validateSignatureForm.message).subscribe((success) => {
            if (!success['errorCode']) {
                this.valid = success['valid'];
                if (success['valid']) {
                    this.color = 'green;';
                    this.buttonColor = 'success';
                    this.account = success['accountRS'];
                } else {
                    this.color = 'red;';
                    this.buttonColor = 'danger';
                    this.account = 'Invalid Account';
                }

            } else {
                alertFunctions.InfoAlertBox('Error',
                    'Sorry, an error occured! Reason: ' + success['errorDescription'],
                    'OK',
                    'error').then((isConfirm: any) => {
                });
            }
        }, (error) => {
            alertFunctions.InfoAlertBox('Error',
                AppConstants.getNoConnectionMessage,
                'OK',
                'error').then((isConfirm: any) => {
            });
        });

    };

}
