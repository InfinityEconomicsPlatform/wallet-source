import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayTab: string = "simple";

    constructor(public router: Router) {

    }

    ngOnInit() {

    }

    redirectToCompiler() {
        this.router.navigateByUrl('/at/workbench/compiler');
    }

    showTab(type) {
        this.displayTab = type;
    }

}
