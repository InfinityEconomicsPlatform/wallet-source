import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from '../../marketplace.service';
import { Location } from '@angular/common';
import { DataStoreService } from 'app/services/data-store.service';
import * as alertFunction from "../../../../shared/data/sweet-alerts";

@Component({
    selector: 'app-delete-product',
    templateUrl: './delete-product.component.html',
    styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {
    product: any = {};
    feeTQT: number = 100000000;
    secretPhrase: string = "";

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        public location: Location) {

    }

    ngOnInit() {
        this.product = DataStoreService.get('marketplace_product');
        if (typeof (this.product) == "undefined") {
            this.location.back();
        }
    }

    delete(goods, secretPhrase, feeTQT) {
        this.marketplaceService.dgsDelisting(goods, secretPhrase, feeTQT).subscribe((success: any) => {
            if (!success.errorCode) {
                alertFunction.InfoAlertBox(
                    "Success",
                    "Successfully removed the product from listing.",
                    "OK",
                    'success'
                ).then((isConfirm: any) => {
                    this.router.navigateByUrl('/marketplace/product-listed');
                });
            } else {
                alertFunction.InfoAlertBox(
                    "Error",
                    success.errorDescription,
                    "OK",
                    'error'
                )
            }
        }, (error) => {
            console.log("Change Price:", error);
        });
    }

}
