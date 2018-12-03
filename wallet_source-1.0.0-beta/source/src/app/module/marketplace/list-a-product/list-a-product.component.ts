import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from "../marketplace.service";
import { Router } from '@angular/router';
import { AmountToQuantPipe } from 'app/pipes/amount-to-quant.pipe';
import * as alertFunction from "../../../shared/data/sweet-alerts";
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'app/config/constants';
import { CommonService } from 'app/services/common.service';

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
        secretPhrase: '',
        messageFile: '',
        messageIsPrunable: true
    };
    selectedFile: File;

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        private amountToQuant: AmountToQuantPipe,
        public http: HttpClient,
        private commonService: CommonService) {

    }

    ngOnInit() {

    }

    onFileChange(event) {
        if ((event.target.files[0].size / 1024) < 20) {
            this.selectedFile = event.target.files[0];
        } else {
            let title: string = this.commonService.translateAlertTitle('Error');
            let errMsg: string = this.commonService.translateInfoMessage('error-image-size');

            alertFunction.InfoAlertBox(
                title,
                errMsg,
                "OK",
                'error'
            ).then((isConfirm: any) => {
                event.target.value = "";
            });
        }
    }

    putProductForSale(product, productImage) {
        let priceTQT = this.amountToQuant.transform(product.priceTQT);
        let feeTQT = this.amountToQuant.transform(product.feeTQT);
        let formdata = new FormData();
        formdata.append('messageFile', this.selectedFile, this.selectedFile.name);
        formdata.append('requestType', 'dgsListing');
        formdata.append('secretPhrase', product.secretPhrase);
        formdata.append('name', product.name);
        formdata.append('description', product.description);
        formdata.append('tags', product.tags);
        formdata.append('quantity', product.quantity);
        formdata.append('priceTQT', priceTQT);
        formdata.append('feeTQT', feeTQT);
        formdata.append('messageIsPrunable', product.messageIsPrunable);
        formdata.append('deadline', '60');

        this.http.post(AppConstants.marketPlaceConfig.apiUrl + '/' + AppConstants.pollConfig.pollEndPoint, formdata).subscribe((success: any) => {
            if (!success.errorCode) {
                let title: string = this.commonService.translateAlertTitle('Success');
                let message: string = this.commonService.translateInfoMessage('success-product-listing');

                alertFunction.InfoAlertBox(
                    title,
                    message,
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
                        secretPhrase: '',
                        messageFile: '',
                        messageIsPrunable: true
                    };
                    productImage.value = "";
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
            console.log("List a Product:", error);
        });
    }
}
