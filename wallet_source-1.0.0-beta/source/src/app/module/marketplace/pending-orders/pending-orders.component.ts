import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from '../marketplace.service';
import { AccountService } from 'app/module/account/account.service';
import { DataStoreService } from 'app/services/data-store.service';
import { AppConstants } from 'app/config/constants';

@Component({
    selector: 'app-pending-orders',
    templateUrl: './pending-orders.component.html',
    styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {
    accountRs: any;
    pendingProducts: any[] = [];
    imageBaseUrl: string = AppConstants.marketPlaceConfig.apiUrl + "/" + AppConstants.marketPlaceConfig.endPoint + "?requestType=downloadPrunableMessage&retrieve=true&transaction=";

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

    deliverProduct(product) {
        DataStoreService.set('marketplace_product', product);
        this.router.navigateByUrl('/marketplace/delivery');
    }
}
