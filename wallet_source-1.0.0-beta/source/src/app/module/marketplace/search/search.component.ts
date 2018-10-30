import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MarketplaceService } from '../marketplace.service';
import { DataStoreService } from 'app/services/data-store.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchData: any = {};
    goods: any[] = [];

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        public location: Location) {

    }

    ngOnInit() {
        this.searchData = DataStoreService.get('marketplace_search_details');
        if (typeof (this.searchData) !== 'undefined') {
            switch (this.searchData.searchType) {
                case 'account_id': {
                    this.marketplaceService.getDGSGoods(this.searchData.searchTerm).subscribe((success: any) => {
                        this.goods = success.goods;
                    }, (error) => {
                        console.log(error);
                    });
                    break;
                }
                case 'title': {
                    this.marketplaceService.searchDGSGoods(this.searchData.searchTerm).subscribe((success: any) => {
                        this.goods = success.goods;
                    }, (error) => {
                        console.log(error);
                    });
                    break;
                }
                case 'description': {
                    this.marketplaceService.searchDGSGoods(this.searchData.searchTerm).subscribe((success: any) => {
                        this.goods = success.goods;
                    }, (error) => {
                        console.log(error);
                    });
                    break;
                }
                case 'tag': {
                    this.marketplaceService.searchDGSGoods(this.searchData.searchTerm).subscribe((success: any) => {
                        this.goods = success.goods;
                    }, (error) => {
                        console.log(error);
                    });
                    break;
                }
                default: {
                    this.location.back();
                }
            }
        } else {
            this.location.back();
        }
    }

    searchByTerm(searchType, searchTerm) {
        DataStoreService.set('marketplace_search_details', { 'searchType': searchType, 'searchTerm': searchTerm });
        if (searchType == 'account_id') {
            this.router.navigateByUrl('/marketplace/seller');
        } else {
            this.router.navigateByUrl('/marketplace/search');
        }
    }

    openTag(tag) {
        DataStoreService.set('marketplace_tag', tag);
        this.router.navigateByUrl('/marketplace/tag');
    }

    productDetails(product) {
        DataStoreService.set('marketplace_product', product);
        this.router.navigateByUrl('/marketplace/product-details');
    }
}
