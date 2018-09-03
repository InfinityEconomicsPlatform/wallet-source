import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from '../../../../services/login.service';
import { DataStoreService } from '../../../../services/data-store.service';
import * as alertFunctions from "../../../../shared/data/sweet-alerts";

@Component({
    selector: 'app-signup-confirm',
    templateUrl: './signup-confirm.component.html',
    styleUrls: ['./signup-confirm.component.scss']
})
export class SignupConfirmComponent implements OnInit {
    secret: string;
    model: Login = new Login();

    constructor(public router: Router, public loginService: LoginService) {

    }

    ngOnInit() {
        this.secret = DataStoreService.get('signupSecret');
    }

    confirmAndLogin() {
        let rememberSecret = true;  // We are making it default now

        if (this.model.passPhrase === this.secret) {
            this.loginService.calculateAccountDetailsFromSecret(this.model.passPhrase, true);

            if (rememberSecret) {
                this.loginService.calculatePrivateKeyFromSecret(this.model.passPhrase, true);
            }
            this.router.navigateByUrl('/dashboard');
        } else {
            alertFunctions.InfoAlertBox(
                'Error',
                'Please enter same Passphrase',
                'OK',
                'error')
                .then((isConfirm: any) => {

                });
        }
    }

}

class Login {
    constructor(public passPhrase: string = '') {

    }
}