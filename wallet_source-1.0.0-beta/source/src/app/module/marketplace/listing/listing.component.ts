import { Component, OnInit } from '@angular/core';
import { Page } from '../../../config/page';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
    page = new Page();
    products_listed: any[] = [
        {
            "seller": "15323192282528158131",
            "quantity": 2,
            "goods": "11813734897437346473",
            "description": "Testing the DGS.",
            "sellerRS": "XIN-L6FM-89WK-VK8P-FCRBB",
            "delisted": false,
            "parsedTags": [
                "test",
                "product",
                "tag"
            ],
            "tags": "test, product, tag, extra",
            "priceTQT": "200000000",
            "numberOfPublicFeedbacks": 0,
            "name": "Test Product",
            "numberOfPurchases": 0,
            "timestamp": 31436434
        },
        {
            "seller": "15323192282528158131",
            "quantity": 2,
            "goods": "11813734897437346473",
            "description": "Testing the DGS.",
            "sellerRS": "XIN-L6FM-89WK-VK8P-FCRBB",
            "delisted": false,
            "parsedTags": [
                "test",
                "product",
                "tag"
            ],
            "tags": "test, product, tag, extra",
            "priceTQT": "200000000",
            "numberOfPublicFeedbacks": 0,
            "name": "Worthless Junk",
            "numberOfPurchases": 0,
            "timestamp": 31436434
        }
    ];

    constructor() {

    }

    ngOnInit() {
    }

}
