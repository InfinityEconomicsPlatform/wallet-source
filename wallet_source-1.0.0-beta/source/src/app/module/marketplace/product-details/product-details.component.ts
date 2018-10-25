import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MarketplaceService } from '../marketplace.service';
import { DataStoreService } from 'app/services/data-store.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    product: any = {};
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

    purchaseProduct(product) {
        DataStoreService.set('marketplace_product', product);
        this.router.navigateByUrl('/marketplace/purchase');
    }
}
