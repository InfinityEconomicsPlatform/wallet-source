import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../../../config/page';
import { MarketplaceService } from '../marketplace.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { AppConstants } from '../../../config/constants';
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
                "signatureHash": "565bc0a6140ae1331cd5db009fbd9da164d8802330939ef40204a9bc343b3149",
                "unsignedTransactionBytes": "031092aedf013c0057fb6f3a958e320bb49c4e81b4c2cf28b9f25d086c143b...",
                "transactionJSON": {
                    "senderPublicKey": "57fb6f3a958e320bb49c4e81b4c2cf28b9f25d086c143b473beec228f79ff93c",
                    "signature": "465ed3dfef9a02fc97fc18a6f83bb9f07c285aef41ff78c957d59cda2972ba...",
                    "feeTQT": "100000000",
                    "type": 3,
                    "fullHash": "a98a63204cd1f2a3304cee79776854f290f0472883c576056fec16a23efa90df",
                    "version": 1,
                    "ecBlockId": "4480409615309425420",
                    "signatureHash": "565bc0a6140ae1331cd5db009fbd9da164d8802330939ef40204a9bc343b3149",
                    "attachment": {
                        "priceTQT": "100000000",
                        "quantity": 3,
                        "name": "Test Product",
                        "description": "Testing the DGS.",
                        "version.DigitalGoodsListing": 1,
                        "tags": "test, product, tag, extra"
                    },
                    "senderRS": "NXT-L6FM-89WK-VK8P-FCRBB",
                    "subtype": 0,
                    "amountTQT": "0",
                    "sender": "15323192282528158131",
                    "ecBlockHeight": 291240,
                    "deadline": 60,
                    "transaction": "11813734897437346473",
                    "timestamp": 31436434,
                    "height": 2147483647
                },
                "broadcasted": true,
                "requestProcessingTime": 8958,
                "transactionBytes": "031092aedf013c0057fb6f3a958e320bb49c4e81b4c2cf28b9f25d086c143b473b...",
                "fullHash": "a98a63204cd1f2a3304cee79776854f290f0472883c576056fec16a23efa90df",
                "transaction": "11813734897437346473"
            }
        )

    }

    ngOnInit() {
        this.secretPhraseHex = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
        this.secretPhrase = this.cryptoService.secretPhraseFromPrivateKey(this.secretPhraseHex);

        this.marketplaceService.getListing(this.secretPhrase, "Test Product", "Testing the DGS.tags=test, product, tag, extra", 3, 100000000, 100000000)
            .subscribe((success: any) => {
                console.log(success);
            })
    }

}
