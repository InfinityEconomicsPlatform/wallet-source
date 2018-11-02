import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MarketplaceService } from '../marketplace.service';
import { DataStoreService } from 'app/services/data-store.service';
import { AmountToQuantPipe } from 'app/pipes/amount-to-quant.pipe';
import * as alertFunction from "../../../shared/data/sweet-alerts";

@Component({
    selector: 'app-deliver',
    templateUrl: './deliver.component.html',
    styleUrls: ['./deliver.component.scss']
})
export class DeliverComponent implements OnInit {
    product: any = {};
    discount: number = 0;
    goodsToEncrypt: string = "";
    goodsIsText: boolean = true;
    goodsData: string = "";
    goodsNonce: string = "";
    secretPhrase: string = "";
    feeTQT: number = 100000000;

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

    deliverProduct(product) {
        let discountTQT = this.amountToQuant.transform(this.discount);
        this.marketplaceService.dgsDelivery(product.purchase, discountTQT, this.goodsToEncrypt, this.goodsIsText, this.goodsData, this.goodsNonce, this.secretPhrase, this.feeTQT).subscribe((success: any) => {
            if (!success.errorCode) {
                alertFunction.InfoAlertBox(
                    "Success",
                    "Broadcast successful",
                    "OK",
                    'success'
                ).then((isConfirm: any) => {
                    this.router.navigateByUrl('/marketplace/pending-orders');
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

        });
    }
}
