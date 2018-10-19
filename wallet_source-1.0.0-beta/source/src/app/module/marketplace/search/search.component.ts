import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../../../config/page';
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
        private marketplaceService: MarketplaceService) {

    }

    ngOnInit() {
        this.searchData = DataStoreService.get('marketplace_search_details');
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
                this.router.navigateByUrl('/marketplace/store');
            }
        }
        console.log(this.searchData);

    }

}
