import { Injectable } from '@angular/core';
import { HttpProviderService } from '../../services/http-provider.service';
import { AppConstants } from '../../config/constants';

@Injectable()
export class MarketplaceService {
    deadline: 60;
    constructor(public http: HttpProviderService) {
        this.deadline = 60;
    }

    getDelisting(purchase, goodsToEncrypt, secretPhrase, feeTQT) {
        let params = {
            'requestType': 'dgsDelivery',
            'purchase': purchase,
            'goodsToEncrypt': goodsToEncrypt,
            'secretPhrase': secretPhrase,
            'feeTQT': feeTQT,
            'deadline': this.deadline
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getListing(secretPhrase, name, description, quantity, priceTQT, feeTQT) {
        let params = {
            'requestType': 'dgsListing',
            'secretPhrase': secretPhrase,
            'name': name,
            'description': description,
            'quantity': quantity,
            'priceTQT': priceTQT,
            'feeTQT': feeTQT,
            'deadline': this.deadline
        };

        return this.http.post(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

}
