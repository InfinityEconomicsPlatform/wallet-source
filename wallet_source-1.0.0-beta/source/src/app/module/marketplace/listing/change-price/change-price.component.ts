import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from '../../marketplace.service';
import { Location } from '@angular/common';
import { DataStoreService } from 'app/services/data-store.service';
import { AmountToQuantPipe } from 'app/pipes/amount-to-quant.pipe';
import * as alertFunction from "../../../../shared/data/sweet-alerts";

@Component({
    selector: 'app-change-price',
    templateUrl: './change-price.component.html',
    styleUrls: ['./change-price.component.scss']
})
export class ChangePriceComponent implements OnInit {
    product: any = {};
    newPrice: number;
    feeTQT: number = 100000000;
    secretPhrase: string = "";

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        private amountToQuant: AmountToQuantPipe,
        public location: Location) {

    }

    ngOnInit() {
        this.product = DataStoreService.get('marketplace_product');
        if (typeof (this.product) == "undefined") {
            this.location.back();
        }
    }

    changePrice(goods, price, secretPhrase, feeTQT) {
        let priceTQT = this.amountToQuant.transform(price);
        this.marketplaceService.dgsPriceChange(goods, priceTQT, secretPhrase, feeTQT).subscribe((success: any) => {
            if (!success.errorCode) {
                alertFunction.InfoAlertBox(
                    "Success",
                    "Changes saved successfully",
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
