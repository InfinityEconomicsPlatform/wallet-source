/******************************************************************************
 * Copyright © 2017 XIN Community                                             *
 *                                                                            *
 * See the DEVELOPER-AGREEMENT.txt and LICENSE.txt files at  the top-level    *
 * directory of this distribution for the individual copyright  holder        *
 * information and the developer policies on copyright and licensing.         *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * XIN software, including this file, may be copied, modified, propagated,    *
 * or distributed except according to the terms contained in the LICENSE.txt  *
 * file.                                                                      *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

angular.module('baseClient').directive('fiatView', function () {

    var controller = ['$scope', '$rootScope', 'FiatService', '$q', 'quantToAmountFilter',
        function ($scope, $rootScope, FiatService, $q, quantToAmountFilter) {

            $scope.$watch('amountTqt', function (newValue) {
                if (newValue) {
                    var finalAmount = quantToAmountFilter(newValue);
                    getXinPrice(finalAmount);
                }
            });

            $scope.$watch('amount', function (newValue) {
                if (newValue) {
                    getXinPrice(newValue);
                }
            });

            function getXinPrice(finalAmount) {
                var btcPricePromise = FiatService.getBtcPrice();
                var xinPricePromise = FiatService.getXinPrice();

                $q.all([btcPricePromise, xinPricePromise]).then(function (success) {
                    var btcPriceJson = success[0];
                    var xinPriceJson = success[1];

                    $scope.xinUSDBTC   = btcPriceJson.averages.day || 0;
                    $scope.xinPriceUSD = xinPriceJson[0].price_usd || 0;

                    $scope.xinPriceBTC = xinPriceJson[0].price_btc || 0;
                    $scope.xinVolume24 = xinPriceJson[0]['24h_volume_usd'] || 0;
                    $scope.xinChange24 = xinPriceJson[0].percent_change_24h || 0;

                    $scope.finalAmount = finalAmount * xinPriceJson[0].price_usd;

                }, function (error) {
                    console.log(error);
                });
            }
        }];

    return {
        restrict: 'EA', //Default in 1.3+
        scope: {
            amount: '=',
            amountTqt: '=',
            template: '@',

        },
        controller: controller,
        templateUrl: function (elem, attr) {
            return attr.template || 'global/views/fiat-template.html';
        }
    };
});

angular.module('baseClient').constant('fiatConfig', {
    'btcEndpoint': 'http://185.35.139.104/',
    'xinEndpoint': 'http://185.35.139.104/'
    //'btcEndpoint': 'https://securewallet.infinity-economics.org/',
    //'xinEndpoint': 'https://securewallet.infinity-economics.org/'

});

angular.module('baseClient').service('FiatService', ['Restangular', 'fiatConfig', function (Restangular, fiatConfig) {

    this.getBtcPrice = function () {
        Restangular.setBaseUrl(fiatConfig.btcEndpoint);
        return Restangular.all('bitcoinaverage.json').customGET('');
    };

    this.getXinPrice = function () {
        Restangular.setBaseUrl(fiatConfig.xinEndpoint);
        return Restangular.all('xin.json').customGET('');
        //return Restangular.all('coingather.json').customGET('');
    };
}]);
