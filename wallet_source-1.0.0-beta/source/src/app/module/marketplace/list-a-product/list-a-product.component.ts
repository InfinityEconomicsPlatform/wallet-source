import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from "../marketplace.service";
import { Router } from '@angular/router';


@Component({
    selector: 'app-list-a-product',
    templateUrl: './list-a-product.component.html',
    styleUrls: ['./list-a-product.component.scss']
})
export class ListAProductComponent implements OnInit {
    isAdvancedSettings: boolean = false;
    tabSelected: string = 'no-approval';

    constructor(public router: Router, private marketplaceService: MarketplaceService) { }

    ngOnInit() {

    }

}
