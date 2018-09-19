import { Component, OnInit } from '@angular/core';
import { Page } from '../../../config/page';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
    recentListings: any[] = [];
    page = new Page();

    constructor() { }

    ngOnInit() {
    }

}
