import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MarketplaceService } from '../marketplace.service';
import { DataStoreService } from 'app/services/data-store.service';
import * as alertFunction from "../../../shared/data/sweet-alerts";
import { CommonService } from 'app/services/common.service';

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
        public location: Location,
        private commonService: CommonService) {

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
                let title: string = this.commonService.translateAlertTitle('Success');
                let message: string = this.commonService.translateInfoMessage('success-broadcast-message');
                message += success.transaction;

                alertFunction.InfoAlertBox(
                    title,
                    message,
                    "OK",
                    'success'
                ).then((isConfirm: any) => {
                    this.router.navigateByUrl('/marketplace/store');
                });
            } else {
                let title: string = this.commonService.translateAlertTitle('Error');
                let errMsg: string = this.commonService.translateErrorMessage('sorry-error-occurred', success);

                alertFunction.InfoAlertBox(
                    title,
                    errMsg,
                    "OK",
                    'error'
                )
            }
        }, (error) => {
            console.log("Purchase Error: ", error);
        });
    }
}
