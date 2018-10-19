import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    tag: any = {};

    constructor(public router: Router,
        private marketplaceService: MarketplaceService) {

    }

    ngOnInit() {
        this.tag = DataStoreService.get('marketplace_tag');
        this.marketplaceService.searchDGSGoods(this.tag.tag).subscribe((success: any) => {
            this.tagListings = success.goods;
        }, (error) => {
            console.log(error);
        });
    }

}
