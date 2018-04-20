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

angular.module('exchanges').controller('BlockrMainController', ['$scope', 'BlockrService', '$uibModal',
    function ($scope, BlockrService, $uibModal) {

        $scope.openBtcDetailsModal = function (address) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'exchanges/modals/btc-details.html',
                size: 'lg',
                controller: 'BlockrController',
                resolve: {
                    params: function () {
                        return {
                            address: address,
                        };
                    }
                }
            });
        };
    }]);

angular.module('exchanges').controller('BlockrController',
    ['$scope', 'BlockrService', '$uibModalInstance', 'params', 'DTColumnBuilder', 'DTOptionsBuilder', '$compile',
        function ($scope, BlockrService, $uibModalInstance, params, DTColumnBuilder, DTOptionsBuilder, $compile) {

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.getBtcAdressBalance = function () {
                $scope.BlockrServicePromise=BlockrService.getAddressBalance(params.address).then(function (success) {

                    $scope.addrStr = success.addrStr;
                    $scope.balance = success.balance;
                    $scope.totalReceived = success.totalReceived;
                    $scope.totalSent = success.totalSent;
                    $scope.unconfirmedBalance = success.unconfirmedBalance;
                    $scope.txApperances = success.txApperances;
                    $scope.balance = success.balance;

                }, function (error) {

                });
            };

            $scope.dtInstanceCallback = function (_dtInstance) {
                $scope.dtInstance = _dtInstance;
            };


        }]);
