import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../../../config/page';
import { MarketplaceService } from '../marketplace.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { AppConstants } from '../../../config/constants';
import { CryptoService } from '../../../services/crypto.service';
import { AccountService } from '../../account/account.service';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
    recentListings: any[] = [];
    recentPurchases: any[] = [];
    page = new Page();
    count: any;
    accountId: any;
    tags: any[] = [];
    term: string = "";
    searchType: string = "account_id";

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        private sessionStorageService: SessionStorageService,
        private accountService: AccountService,
        private cryptoService: CryptoService) {
        this.count = {
            purchased_products: 0,
            products_available: 0,
            total_purchases: 0,
            total_tags: 0
        }
    }

    ngOnInit() {
        this.getCounts();
        this.getRecentListings();
        this.getRecentPurchases();
    }

    getCounts() {
        this.accountId = this.accountService.getAccountDetailsFromSession('accountId');

        this.marketplaceService.getDGSPurchases(this.accountId).subscribe((success: any) => {
            this.count.purchased_products = success.purchases.length;
        }, (error) => {
            console.log("Error: getDGSPurchases ", error);
        });

        this.marketplaceService.getDGSGoodsCount().subscribe((success: any) => {
            this.count.products_available = success.numberOfGoods;
        }, (error) => {
            console.log("Error: getDGSGoodsCount ", error);
        });

        this.marketplaceService.getDGSPurchaseCount().subscribe((success: any) => {
            this.count.total_purchases = success.numberOfPurchases;
        }, (error) => {
            console.log("Error: getDGSPurchaseCount ", error);
        });

        this.marketplaceService.getDGSTags().subscribe((success: any) => {
            this.count.total_tags = success.tags.length;
            this.tags = success.tags;
        }, (error) => {
            console.log("Error: getDGSTags ", error);
        });
    }

    searchByTerm(searchType, searchTerm) {
        this.router.navigateByUrl('/marketplace/tag');
    }

    openTag() {
        this.router.navigateByUrl('/marketplace/tag');
    }

    getRecentListings() {
        this.marketplaceService.recentListings().subscribe((success: any) => {
            this.recentListings = success.goods;
        }, (error) => {
            console.log("Error: recentListings", error);
        });
    }

    getRecentPurchases() {
        this.marketplaceService.recentListings().subscribe((success: any) => {
            this.recentPurchases = success.purchases;
        }, (error) => {
            console.log("Error: recentListings", error);
        });
    }
}
