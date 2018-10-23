import { Component, OnInit } from '@angular/core';
import * as AlertFunctions from '../../../../shared/data/sweet-alerts';

import { HttpClient } from "@angular/common/http";
import { AppConstants } from "../../../../config/constants";

@Component({
    selector: 'app-compiler',
    templateUrl: './compiler.component.html',
    styleUrls: ['./compiler.component.scss']
})
export class CompilerComponent implements OnInit {
    atTextCode: string = "";
    outputCode: string = "";

    constructor(public httpClient: HttpClient) {

    }

    ngOnInit() {

    }

    getCode(code) {
        let params = new FormData();

        params.append('code', code);
        params.append('data', "");

        this.httpClient.post(AppConstants.ATConfig.ATCompilerURL, params, { responseType: 'json' })
            .subscribe((success: any) => {
                if (success.data) {
                    this.outputCode = success.data;
                } else {
                    this.outputCode = "";
                    AlertFunctions.InfoAlertBox(
                        'Error',
                        'Unable to generate Output code, please check your code.',
                        'OK',
                        'error')
                        .then((isConfirm: any) => {

                        });
                }
            });
    }

}
