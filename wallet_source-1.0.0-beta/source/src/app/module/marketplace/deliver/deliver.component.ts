import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MarketplaceService } from '../marketplace.service';
import { DataStoreService } from 'app/services/data-store.service';

@Component({
    selector: 'app-deliver',
    templateUrl: './deliver.component.html',
    styleUrls: ['./deliver.component.scss']
})
export class DeliverComponent implements OnInit {
    product: any = {};
    goodsData: string = "";

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        public location: Location) {
    }

    ngOnInit() {
        this.product = DataStoreService.get('marketplace_product');
        if (typeof (this.product) == "undefined") {
            this.location.back();
        } else {
            this.marketplaceService.getDGSGood(this.product.goods).subscribe((success: any) => {
                this.product = success;
            }, (error) => {
                console.log("Product Details: ", error);
            });
        }
    }

}
