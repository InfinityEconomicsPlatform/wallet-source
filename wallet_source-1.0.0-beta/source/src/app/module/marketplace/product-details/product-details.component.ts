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
        this.product = {
            name: "",
            parsedTags: [],
            quantity: 0,
            priceTQT: 0,
            sellerRS: '',
            description: '',
            tags: '',
            timestamp: 0
        }
    }

    ngOnInit() {
        this.product = DataStoreService.get('marketplace_product');
    }
}
