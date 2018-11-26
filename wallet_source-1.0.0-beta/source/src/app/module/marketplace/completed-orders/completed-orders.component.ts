import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from '../marketplace.service';
import { AccountService } from 'app/module/account/account.service';
import { DataStoreService } from 'app/services/data-store.service';
import { AppConstants } from 'app/config/constants';

@Component({
    selector: 'app-completed-orders',
    templateUrl: './completed-orders.component.html',
    styleUrls: ['./completed-orders.component.scss']
})
export class CompletedOrdersComponent implements OnInit {
    accountRs: any;
    completedOrders: any[] = [];
    imageBaseUrl: string = AppConstants.marketPlaceConfig.apiUrl + "/" + AppConstants.marketPlaceConfig.endPoint + "?requestType=downloadPrunableMessage&retrieve=true&transaction=";

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        private accountService: AccountService) {

    }

    ngOnInit() {
        this.accountRs = this.accountService.getAccountDetailsFromSession('accountRs');

        this.marketplaceService.getDGSPurchases(this.accountRs, null, true).subscribe((success: any) => {
            this.completedOrders = success.purchases;
        }, (error) => {
            console.log("Completed Orders:", error);
        });
    }

    productDetails(product) {
        DataStoreService.set('marketplace_product', product);
        this.router.navigateByUrl('/marketplace/product-details');
    }

}
