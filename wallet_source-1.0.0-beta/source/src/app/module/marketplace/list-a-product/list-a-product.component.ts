import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from "../marketplace.service";
import { Router } from '@angular/router';
import { AmountToQuantPipe } from 'app/pipes/amount-to-quant.pipe';
import * as alertFunction from "../../../shared/data/sweet-alerts";

@Component({
    selector: 'app-list-a-product',
    templateUrl: './list-a-product.component.html',
    styleUrls: ['./list-a-product.component.scss']
})
export class ListAProductComponent implements OnInit {
    tabSelected: string = 'no-approval';
    product: any = {
        name: '',
        description: '',
        tags: '',
        priceTQT: 0,
        quantity: 0,
        feeTQT: 1,
        secretPhrase: ''
    };

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        private amountToQuant: AmountToQuantPipe) {

    }

    ngOnInit() {

    }

    putProductForSale(product) {
        let priceTQT = this.amountToQuant.transform(product.priceTQT);
        let feeTQT = this.amountToQuant.transform(product.feeTQT);

        this.marketplaceService.dgsListing(product.secretPhrase, product.name, product.description, product.tags, product.quantity, priceTQT, feeTQT).subscribe((success: any) => {
            if (!success.errorCode) {
                alertFunction.InfoAlertBox(
                    "Success",
                    "Product listed for sale successfully",
                    "OK",
                    'success'
                ).then((isConfirm: any) => {
                    this.product = {
                        name: '',
                        description: '',
                        tags: '',
                        priceTQT: 0,
                        quantity: 0,
                        feeTQT: 1,
                        secretPhrase: ''
                    };
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
            console.log("List a Product:", error);
        })
    }

}
