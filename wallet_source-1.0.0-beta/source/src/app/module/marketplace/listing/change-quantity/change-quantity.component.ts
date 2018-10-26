import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from '../../marketplace.service';
import { Location } from '@angular/common';
import { DataStoreService } from 'app/services/data-store.service';
import * as alertFunction from "../../../../shared/data/sweet-alerts";

@Component({
    selector: 'app-change-quantity',
    templateUrl: './change-quantity.component.html',
    styleUrls: ['./change-quantity.component.scss']
})
export class ChangeQuantityComponent implements OnInit {
    product: any = {};
    newQuantity: number;
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

    changeQuantity(goods, newQuantity, secretPhrase, feeTQT) {
        this.marketplaceService.dgsQuantityChange(goods, newQuantity, secretPhrase, feeTQT).subscribe((success: any) => {
            if (!success.errorCode) {
                alertFunction.InfoAlertBox(
                    "Success",
                    "Change saved successfully",
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
