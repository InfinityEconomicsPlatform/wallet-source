import { Component, OnInit } from '@angular/core';
import { Page } from '../../../config/page';
import { Router } from '@angular/router';
import { MarketplaceService } from '../marketplace.service';
import { AccountService } from 'app/module/account/account.service';
import { DataStoreService } from 'app/services/data-store.service';
@Component({
    selector: 'app-purchased',
    templateUrl: './purchased.component.html',
    styleUrls: ['./purchased.component.scss']
})
export class PurchasedComponent implements OnInit {
    purchased_products: any[] = [];
    page = new Page();
    accountRs: any;

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        private accountService: AccountService) {

    }

    ngOnInit() {
        this.accountRs = this.accountService.getAccountDetailsFromSession('accountRs');

        this.marketplaceService.getDGSPurchases(null, this.accountRs).subscribe((success: any) => {
            this.purchased_products = success.purchases;
        }, (error) => {
            console.log("Purchased Products:", error);
        });

    }

    decryptGood(value) {
        DataStoreService.set('decrypt_value', value);
        this.router.navigateByUrl('/marketplace/decrypt-product');

    }

}
