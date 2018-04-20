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

angular.module('shufflings').controller('CreateShuffleFormController',
    ['$scope', 'ShufflingService', 'SessionStorageService', '$state', 'CryptoService', 'loginConfig',
        'AlertService', 'alertConfig', '$validation', '$uibModal', 'multiStepFormScope', 'FeeService', '$rootScope',
        'CommonsService', 'AssetsService', 'CurrenciesService', 'amountToQuantFilter', 'OptionsService',
        'shareToQuantiyFilter', '$sanitize', '$timeout',
        function ($scope, ShufflingService, SessionStorageService, $state, CryptoService,
                  loginConfig, AlertService, alertConfig, $validation, $uibModal, multiStepFormScope, FeeService,
                  $rootScope, CommonsService, AssetsService, CurrenciesService, amountToQuantFilter, OptionsService,
                  shareToQuantiyFilter,$sanitize, $timeout) {


            $scope.createShuffleForm = angular.copy(multiStepFormScope.createShuffleForm);

            $scope.$on('$destroy', function () {
                multiStepFormScope.createShuffleForm = angular.copy($scope.createShuffleForm);
            });

            $scope.alerts = [
                {
                    type: 'warning',
                    msg: 'After creating or joining a shuffling you must keep your node online and your shuffler running. Make sure your balance is able to cover the 12 XIN shuffling fees until the shuffling completes. If you don\'t and miss your turn you will be charged 1.000 XIN.'
                }
            ];

            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.isLocalhostOrTestnet = ShufflingService.isLocalHostOrTestnet() || false;

            if (!$scope.isLocalhostOrTestnet) {

              $timeout(function () {
                  AlertService.addAlert(
                      {
                          type: 'danger',
                          msg: 'Localhost (127.0.0.1) is not available. For security reasons localhost is mandatory to create a shuffle.'
                      }, alertConfig.createShuffleModalAlert);
              }, 1000);

            }

            $scope.finishHeight = 1440;

            $scope.increment = function () {
                if ($scope.finishHeight >= 20000) {
                    $scope.finishHeight = 20000;
                    return;
                } else {
                    $scope.finishHeight = $scope.finishHeight + 1440;
                }

                $scope.createShuffleForm.finishHeight = $scope.finishHeight;
            };

            $scope.decrement = function () {
                if ($scope.finishHeight <= 1440) {
                    $scope.finishHeight = 1440;
                    return;
                } else {
                    $scope.finishHeight = $scope.finishHeight - 1440;
                }

                $scope.createShuffleForm.finishHeight = $scope.finishHeight;
            };

            $scope.max = function () {
                $scope.finishHeight = 20000;
                $scope.createShuffleForm.finishHeight = 20000;
            };

            $scope.min = function () {
                $scope.finishHeight = 1440;
                $scope.createShuffleForm.finishHeight = 1440;
            };

            $scope.getAsset = function (assetId) {
                AssetsService.getAsset(assetId).then(function (success) {
                    $scope.createShuffleForm.asset = success;
                });
            };

            $scope.getCurrency = function (currencyCode) {
                CurrenciesService.getCurrency(currencyCode).then(function (success) {
                    $scope.createShuffleForm.currency = success;
                });
            };

            $scope.getBlockChainStatus = function () {
                CurrenciesService.getBlockChainStatus().then(function (success) {
                    $scope.createShuffleForm.currentHeight = success.numberOfBlocks;
                });
            };

            $scope.hasPrivateKeyInSession = function () {
                if (SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY)) {
                    return true;
                }
                return false;
            };

            $scope.holdingOptions = [
                {label: 'XIN', value: '0'},
                {label: 'Asset', value: '1'},
                {label: 'Currency', value: '2'}
            ];

            $scope.isLocalhostOrTestnet = ShufflingService.isLocalHostOrTestnet();

            $scope.createShuffle = function () {
                var createShuffleForm = multiStepFormScope.createShuffleForm;
                var shuffleJson = {};
                shuffleJson.amount = createShuffleForm.amount;
                shuffleJson.holdingType = createShuffleForm.holdingType;
                shuffleJson.holding = createShuffleForm.holding;
                shuffleJson.participantCount = createShuffleForm.participantCount;
                if (shuffleJson.holdingType === '2') {
                    shuffleJson.holding = createShuffleForm.currency.currency;
                    shuffleJson.amount = shareToQuantiyFilter(shuffleJson.amount, createShuffleForm.currency.decimals);
                } else if (shuffleJson.holdingType === '1') {
                    shuffleJson.amount = shareToQuantiyFilter(shuffleJson.amount, createShuffleForm.asset.decimals);
                } else if (shuffleJson.holdingType === '0') {
                    shuffleJson.amount = amountToQuantFilter(shuffleJson.amount);
                }

                shuffleJson.fee = 1;


                shuffleJson.publicKey = CommonsService.getAccountDetailsFromSession('publicKey');

                shuffleJson.finishHeight = createShuffleForm.finishHeight;

                var secret = createShuffleForm.secretPhrase;
                var secretPhraseHex;
                if (secret) {
                    secretPhraseHex = CryptoService.secretPhraseToPrivateKey(secret);
                } else {
                    secretPhraseHex =
                        SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
                }
                if (ShufflingService.isLocalHostOrTestnet()) {
                    $scope.createShufflePromise =
                        ShufflingService.createShuffling(shuffleJson.publicKey, shuffleJson.amount,
                            shuffleJson.participantCount, shuffleJson.finishHeight, shuffleJson.holding,
                            shuffleJson.holdingType, shuffleJson.fee)
                                        .then(function (success) {
                                            if (!success.errorCode) {
                                                var unsignedBytes = success.unsignedTransactionBytes;
                                                var signatureHex = CryptoService.signatureHex(
                                                    unsignedBytes, secretPhraseHex);

                                                $scope.transactionBytes =
                                                    CryptoService.signTransactionHex(unsignedBytes,
                                                        signatureHex);

                                                $scope.tx_fee =
                                                    success.transactionJSON.feeTQT / 100000000;
                                                $scope.tx_amount =
                                                    success.transactionJSON.amountTQT / 100000000;
                                                $scope.tx_total = $scope.tx_fee + $scope.tx_amount;

                                                $scope.validBytes = true;


                                            } else {
                                                AlertService.addAlert(
                                                    {
                                                        type: 'danger',
                                                        msg: 'Sorry, an error occured! Reason: ' +
                                                        $sanitize(success.errorDescription)
                                                    }, alertConfig.createShuffleModalAlert
                                                );
                                            }
                                        }, function (error) {
                                            AlertService.addAlert(
                                                AlertService.getNoConnectionMessage(error),
                                                alertConfig.createShuffleModalAlert);
                                        });
                } else {
                    AlertService.addAlert(
                        {
                            type: 'danger',
                            msg: 'You must be connected to localhost or testnet to perform shuffling'
                        },
                        alertConfig.createShuffleModalAlert);
                }
            };

            $scope.broadcastTransaction = function (transactionBytes) {
                $scope.createPollPromise =
                    CommonsService.broadcastTransaction(transactionBytes).then(function (success) {
                        $scope.$emit('close-modal');
                        $rootScope.$broadcast('reload-dashboard');
                        if (!success.errorCode) {
                            AlertService.addAlert(
                                {
                                    type: 'success',
                                    msg: 'Transaction succesfull broadcasted with Id : ' + $sanitize(success.transaction) +
                                    ''
                                });
                            // $state.go('client.signedin.account.pending');
                        } else {
                            AlertService.addAlert(
                                {
                                    type: 'danger',
                                    msg: 'Unable to broadcast transaction. Reason: ' + $sanitize(success.errorDescription)
                                });
                        }

                    }, function (error) {
                        AlertService.addAlert(AlertService.getNoConnectionMessage(error),
                            alertConfig.createShuffleModalAlert);
                    });
            };

        }]);
