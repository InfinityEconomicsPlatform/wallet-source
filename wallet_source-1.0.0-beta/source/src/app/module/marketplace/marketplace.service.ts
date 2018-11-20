import { Injectable } from '@angular/core';
import { HttpProviderService } from '../../services/http-provider.service';
import { AppConstants } from '../../config/constants';

@Injectable()
export class MarketplaceService {
    deadline: 60;
    constructor(public http: HttpProviderService) {
        this.deadline = 60;
    }

    dgsDelisting(goods, secretPhrase, feeTQT) {
        let params = {
            'requestType': 'dgsDelisting',
            'goods': goods,
            'secretPhrase': secretPhrase,
            'feeTQT': feeTQT,
            'deadline': this.deadline
        };

        return this.http.post(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    dgsDelivery(purchase, discountTQT, goodsToEncrypt, goodsIsText, goodsData, goodsNonce, secretPhrase, feeTQT) {
        let params = {
            'requestType': 'dgsDelivery',
            'purchase': purchase,
            'discountTQT': discountTQT,
            'goodsToEncrypt': goodsToEncrypt,
            'goodsIsText': goodsIsText,
            'goodsData': goodsData,
            'goodsNonce': goodsNonce,
            'secretPhrase': secretPhrase,
            'feeTQT': feeTQT,
            'deadline': this.deadline
        };

        return this.http.post(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    dgsFeedback(purchase, secretPhrase, feeTQT, message) {
        let params = {
            'requestType': 'dgsFeedback',
            'purchase': purchase,
            'secretPhrase': secretPhrase,
            'feeTQT': feeTQT,
            'message': message,
            'deadline': this.deadline
        };

        return this.http.post(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    dgsListing(secretPhrase, name, description, tags, quantity, priceTQT, feeTQT, messageFile, messageIsPrunable) {
        let params = {
            'requestType': 'dgsListing',
            'secretPhrase': secretPhrase,
            'name': name,
            'description': description,
            'tags': tags,
            'quantity': quantity,
            'priceTQT': priceTQT,
            'feeTQT': feeTQT,
            'messageFile': messageFile,
            'messageIsPrunable': messageIsPrunable,
            'deadline': this.deadline
        };

        return this.http.post(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    dgsPriceChange(goods, priceTQT, secretPhrase, feeTQT) {
        let params = {
            'requestType': 'dgsPriceChange',
            'goods': goods,
            'priceTQT': priceTQT,
            'secretPhrase': secretPhrase,
            'feeTQT': feeTQT,
            'deadline': this.deadline
        };

        return this.http.post(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    dgsPurchase(goods, quantity, deliveryDeadlineTimestamp, secretPhrase, feeTQT, priceTQT) {
        let params = {
            'requestType': 'dgsPurchase',
            'goods': goods,
            'quantity': quantity,
            'deliveryDeadlineTimestamp': deliveryDeadlineTimestamp,
            'secretPhrase': secretPhrase,
            'feeTQT': feeTQT,
            'priceTQT': priceTQT,
            'deadline': this.deadline
        };

        return this.http.post(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    dgsQuantityChange(goods, deltaQuantity, secretPhrase, feeTQT) {
        let params = {
            'requestType': 'dgsQuantityChange',
            'goods': goods,
            'deltaQuantity': deltaQuantity,
            'secretPhrase': secretPhrase,
            'feeTQT': feeTQT,
            'deadline': this.deadline
        };

        return this.http.post(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    dgsRefund(purchase, refundTQT, secretPhrase, feeTQT) {
        let params = {
            'requestType': 'dgsRefund',
            'purchase': purchase,
            'refundTQT': refundTQT,
            'secretPhrase': secretPhrase,
            'feeTQT': feeTQT,
            'deadline': this.deadline
        };

        return this.http.post(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSExpiredPurchases(seller) {
        let params = {
            'requestType': 'getDGSExpiredPurchases',
            'seller': seller
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSGood(goods) {
        let params = {
            'requestType': 'getDGSGood',
            'goods': goods
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSGoods(seller) {
        let params = {
            'requestType': 'getDGSGoods',
            'seller': seller
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSGoodsCount(seller?: any) {
        let params = {
            'requestType': 'getDGSGoodsCount',
            'seller': seller
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSGoodsPurchaseCount(goods) {
        let params = {
            'requestType': 'getDGSGoodsPurchaseCount',
            'goods': goods
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSGoodsPurchases(goods) {
        let params = {
            'requestType': 'getDGSGoodsPurchases',
            'goods': goods
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSPendingPurchases(seller) {
        let params = {
            'requestType': 'getDGSPendingPurchases',
            'seller': seller
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSPurchase(purchase) {
        let params = {
            'requestType': 'getDGSPurchase',
            'purchase': purchase
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSPurchaseCount(seller?: any) {
        let params = {
            'requestType': 'getDGSPurchaseCount',
            'seller': seller
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSPurchases(seller?: any, buyer?: any, completed?: boolean, lastIndex?: any, ) {
        let params = {
            'requestType': 'getDGSPurchases',
            'seller': seller,
            'buyer': buyer,
            'completed': completed,
            'lastIndex': lastIndex
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSTagCount() {
        let params = {
            'requestType': 'getDGSTagCount'
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSTags(firstIndex?: number, lastIndex?: number) {
        let params = {
            'requestType': 'getDGSTags',
            'firstIndex': firstIndex,
            'lastIndex': lastIndex
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    getDGSTagsLike(tagPrefix) {
        let params = {
            'requestType': 'getDGSTagsLike',
            'tagPrefix': tagPrefix
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    searchDGSGoods(tag?: any, query?: any, firstIndex?: number, lastIndex?: number, isStockOnly?: boolean) {
        let params = {
            'requestType': 'searchDGSGoods',
            'tag': tag,
            'query': query,
            'firstIndex': firstIndex,
            'lastIndex': lastIndex,
            'isStockOnly': isStockOnly
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    recentListings() {
        let params = {
            'requestType': 'getDGSGoods',
            'completed': true
        };

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    uploadTaggedData(file, secretPhrase, feeTQT) {
        let params = {
            'requestType': 'uploadTaggedData',
            'file': file,
            'secretPhrase': secretPhrase,
            'feeTQT': feeTQT,
            'deadline': this.deadline
        }

        return this.http.post(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }

    downloadTaggedData(transaction) {
        let params = {
            'requestType': 'downloadTaggedData',
            'transaction': transaction
        }

        return this.http.get(AppConstants.marketPlaceConfig.apiUrl, AppConstants.pollConfig.pollEndPoint, params);
    }
}
