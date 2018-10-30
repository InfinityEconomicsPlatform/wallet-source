import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from '../marketplace.service';
import { AccountService } from 'app/module/account/account.service';
import { DataStoreService } from 'app/services/data-store.service';

@Component({
    selector: 'app-pending-orders',
    templateUrl: './pending-orders.component.html',
    styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {
    accountRs: any;
    pendingProducts: any[] = [];

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        private accountService: AccountService) {

    }

    ngOnInit() {
        this.accountRs = this.accountService.getAccountDetailsFromSession('accountRs');

        this.marketplaceService.getDGSPendingPurchases(this.accountRs).subscribe((success: any) => {
            this.pendingProducts = success.purchases;
        }, (error) => {
            console.log("Purchased Products:", error);
        });
    }

    productDetails(product) {
        DataStoreService.set('marketplace_product', product);
        this.router.navigateByUrl('/marketplace/product-details');
    }

}
