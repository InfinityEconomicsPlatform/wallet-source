import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from '../../marketplace.service';
import { Location } from '@angular/common';
import { DataStoreService } from 'app/services/data-store.service';
import * as alertFunction from "../../../../shared/data/sweet-alerts";
import { AppConstants } from 'app/config/constants';
import { CommonService } from 'app/services/common.service';

@Component({
    selector: 'app-delete-product',
    templateUrl: './delete-product.component.html',
    styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {
    product: any = {};
    feeTQT: number = 100000000;
    secretPhrase: string = "";
    imageBaseUrl: string = AppConstants.marketPlaceConfig.apiUrl + "/" + AppConstants.marketPlaceConfig.endPoint + "?requestType=downloadPrunableMessage&retrieve=true&transaction=";

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        public location: Location,
        private commonService: CommonService) {

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
                let title: string = this.commonService.translateAlertTitle('Success');
                let message: string = this.commonService.translateInfoMessage('product-deleted');

                alertFunction.InfoAlertBox(
                    title,
                    message,
                    "OK",
                    'success'
                ).then((isConfirm: any) => {
                    this.router.navigateByUrl('/marketplace/product-listed');
                });
            } else {
                let title: string = this.commonService.translateAlertTitle('Error');
                let errMsg: string = this.commonService.translateErrorMessage('sorry-error-occurred', success);

                alertFunction.InfoAlertBox(
                    title,
                    errMsg,
                    "OK",
                    'error'
                );
            }
        }, (error) => {
            console.log("Change Price:", error);
        });
    }

}
