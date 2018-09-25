import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../../../config/page';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
    recentListings: any[] = [];
    page = new Page();

    constructor(public router: Router) { }

    ngOnInit() {
    }

    openTag() {
        this.router.navigateByUrl('/marketplace/tag');
    }
}
