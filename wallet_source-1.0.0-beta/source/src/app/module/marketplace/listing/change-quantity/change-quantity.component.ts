import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from '../../marketplace.service';
import { Location } from '@angular/common';
import { DataStoreService } from 'app/services/data-store.service';

@Component({
    selector: 'app-change-quantity',
    templateUrl: './change-quantity.component.html',
    styleUrls: ['./change-quantity.component.scss']
})
export class ChangeQuantityComponent implements OnInit {
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
