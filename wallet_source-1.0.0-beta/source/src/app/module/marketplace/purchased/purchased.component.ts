import { Component, OnInit } from '@angular/core';
import { Page } from '../../../config/page';

@Component({
    selector: 'app-purchased',
    templateUrl: './purchased.component.html',
    styleUrls: ['./purchased.component.scss']
})
export class PurchasedComponent implements OnInit {
    purchased_products: any[] = [];
    page = new Page();

    constructor() {

    }

    ngOnInit() {

    }

}
