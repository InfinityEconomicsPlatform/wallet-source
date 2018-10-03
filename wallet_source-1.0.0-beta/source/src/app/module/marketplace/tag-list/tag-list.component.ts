import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../../../config/page';
import { MarketplaceService } from '../marketplace.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { CryptoService } from '../../../services/crypto.service';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
    tagListings: any[] = [];
    page = new Page();
    secretPhraseHex = '';
    secretPhrase = '';

    constructor(public router: Router,
        private marketplaceService: MarketplaceService,
        private sessionStorageService: SessionStorageService,
        private cryptoService: CryptoService) {
        this.tagListings.push(
            {
                "signatureHash": "82109ce415fcf8f022e261602a936dedb35bcea520fe8e3cbe8b7edc8be44161",
                "transactionJSON": {
                    "senderPublicKey": "1e5af8b86f1737365aeec67051edcce44355bb9beebf3476f1aca08e0c395c65",
                    "signature": "d505327a21c3013b8e831ce7393d4726af2325b24e9d3f24ff6c7e611ef01d0076006600b738c7e085834f5f6dd1ef6c50279281a16c5e8828350d29b2523901",
                    "type": 3,
                    "fullHash": "23e28063cea5e5071704fa40f25140c54267519cb2401dddb06c3971b69f002a",
                    "version": 1,
                    "phased": false,
                    "ecBlockId": "5443954284430465804",
                    "signatureHash": "82109ce415fcf8f022e261602a936dedb35bcea520fe8e3cbe8b7edc8be44161",
                    "amountTQT": "0",
                    "attachment": {
                        "quantity": 3,
                        "priceTQT": "100000000",
                        "name": "Test Product",
                        "description": "Testing the DGS.tags=test, product, tag, extra",
                        "version.DigitalGoodsListing": 1,
                        "tags": ""
                    },
                    "senderRS": "XIN-G33X-3483-W7KB-9X4YU",
                    "subtype": 0,
                    "sender": "9041078543237710909",
                    "ecBlockHeight": 924350,
                    "deadline": 60,
                    "feeTQT": "400000000",
                    "transaction": "569043233783472675",
                    "timestamp": 54355578,
                    "height": 2147483647
                },
                "unsignedTransactionBytes": "03107a663d033c001e5af8b86f1737365aeec67051edcce44355bb9beebf3476f1aca08e0c395c6551668adcf83c14e300000000000000000084d7170000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000be1a0e000c9bf11094cf8c4b010c00546573742050726f647563742e0054657374696e6720746865204447532e746167733d746573742c2070726f647563742c207461672c20657874726100000300000000e1f50500000000",
                "broadcasted": true,
                "requestProcessingTime": 8,
                "transactionBytes": "03107a663d033c001e5af8b86f1737365aeec67051edcce44355bb9beebf3476f1aca08e0c395c6551668adcf83c14e300000000000000000084d717000000000000000000000000000000000000000000000000000000000000000000000000d505327a21c3013b8e831ce7393d4726af2325b24e9d3f24ff6c7e611ef01d0076006600b738c7e085834f5f6dd1ef6c50279281a16c5e8828350d29b252390100000000be1a0e000c9bf11094cf8c4b010c00546573742050726f647563742e0054657374696e6720746865204447532e746167733d746573742c2070726f647563742c207461672c20657874726100000300000000e1f50500000000",
                "fullHash": "23e28063cea5e5071704fa40f25140c54267519cb2401dddb06c3971b69f002a",
                "transaction": "569043233783472675"
            }
        )

    }

    ngOnInit() {
    }

}
