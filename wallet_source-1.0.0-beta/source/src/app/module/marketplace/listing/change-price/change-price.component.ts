import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from '../../marketplace.service';
import { Location } from '@angular/common';
import { DataStoreService } from 'app/services/data-store.service';

@Component({
    selector: 'app-change-price',
    templateUrl: './change-price.component.html',
    styleUrls: ['./change-price.component.scss']
})
export class ChangePriceComponent implements OnInit {
    product: any = {};

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        public location: Location) {

    }

    ngOnInit() {
        this.product = DataStoreService.get('marketplace_product');
        if (typeof (this.product) == "undefined") {
            this.location.back();
        }
    }

}
