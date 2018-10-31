import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MarketplaceService } from '../marketplace.service';
import { DataStoreService } from 'app/services/data-store.service';
import * as alertFunction from "../../../shared/data/sweet-alerts";

@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
    product: any = {};
    quantity: number = 1;
    feeTQT: number = 100000000;
    deliveryDeadline: number = 24;
    secretPhrase: string = "";

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        public location: Location) {

    }

    ngOnInit() {
        this.product = DataStoreService.get('marketplace_product');
        if (typeof (this.product) == "undefined") {
            this.location.back();
        } else {
            this.marketplaceService.getDGSGood(this.product.goods).subscribe((success: any) => {
                this.product = success;
            }, (error) => {
                console.log("Product Details: ", error);
            });
        }
    }

    purchaseTheProduct(goods, quantity, deliveryDeadline, secretPhrase, feeTQT, priceTQT) {
        let deliveryDeadlineTimestamp = deliveryDeadline * 60 * 60 * 1000;
        let totalPriceTQT = quantity * priceTQT;
        this.marketplaceService.dgsPurchase(goods, quantity, deliveryDeadlineTimestamp, secretPhrase, feeTQT, totalPriceTQT).subscribe((success: any) => {
            if (!success.errorCode) {
                alertFunction.InfoAlertBox(
                    "Success",
                    "Order placed successfully",
                    "OK",
                    'success'
                ).then((isConfirm: any) => {
                    this.router.navigateByUrl('/marketplace/store');
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
            console.log("Purchase Error: ", error);
        });
    }
}
