import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Page } from '../../../config/page';
import { MarketplaceService } from '../marketplace.service';
import { DataStoreService } from 'app/services/data-store.service';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
    tagListings: any[] = [];
    page = new Page();
    tag: string = "";

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        public location: Location) {

    }

    ngOnInit() {
        this.tag = DataStoreService.get('marketplace_tag');
        if (typeof (this.tag) !== 'undefined') {
            this.marketplaceService.searchDGSGoods(this.tag).subscribe((success: any) => {
                this.tagListings = success.goods;
            }, (error) => {
                console.log(error);
            });
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
