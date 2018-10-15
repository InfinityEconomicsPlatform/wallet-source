import { Component, OnInit } from '@angular/core';
import { Page } from '../../../config/page';
import { Router } from '@angular/router';
import { MarketplaceService } from '../marketplace.service';
import { Location } from '@angular/common';
import { AccountService } from 'app/module/account/account.service';
import { DataStoreService } from 'app/services/data-store.service';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
    page = new Page();
    products_listed: any[] = [];
    accountRs: string = "";

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        public location: Location,
        private accountService: AccountService) {

    }

    ngOnInit() {
        this.accountRs = this.accountService.getAccountDetailsFromSession('accountRs');

        this.marketplaceService.getDGSGoods(this.accountRs).subscribe((success: any) => {
            this.products_listed = success.goods;
            this.page.totalElements = success.goods.length;
        }, (error) => {
            console.log(error);
        });
    }

    productDetails(product) {
        DataStoreService.set('marketplace_product', product);
        this.router.navigateByUrl('/marketplace/product-details');
    }

    changePrice(product) {
        DataStoreService.set('marketplace_product', product);
        this.router.navigateByUrl('/marketplace/change-price');
    }

    changeQuantity(product) {
        DataStoreService.set('marketplace_product', product);
        this.router.navigateByUrl('/marketplace/change-quantity');
    }

    deleteProduct(product) {
        DataStoreService.set('marketplace_product', product);
        this.router.navigateByUrl('/marketplace/remove-product');
    }

}
