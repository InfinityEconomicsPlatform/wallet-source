import { Component, OnInit } from '@angular/core';
import { Page } from '../../../config/page';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
    page = new Page();
    products_listed: any[] = [];

    constructor() {

    }

    ngOnInit() {
    }

}
