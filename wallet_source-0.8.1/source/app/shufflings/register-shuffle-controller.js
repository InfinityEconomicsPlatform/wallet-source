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

angular.module('shufflings').controller('RegisterShuffleFormController',
    ['$scope', 'ShufflingService', 'SessionStorageService', '$state', 'CryptoService', 'loginConfig',
        'AlertService', 'alertConfig', '$validation', '$uibModal', 'multiStepFormScope', 'FeeService', '$rootScope',
        'CommonsService', 'AssetsService', 'CurrenciesService', 'amountToQuantFilter', '$sanitize',
        function ($scope, ShufflingService, SessionStorageService, $state, CryptoService,
                  loginConfig, AlertService, alertConfig, $validation, $uibModal, multiStepFormScope, FeeService,
                  $rootScope, CommonsService, AssetsService, CurrenciesService, amountToQuantFilter,$sanitize) {


            $scope.registerShuffleForm = angular.copy(multiStepFormScope.registerShuffleForm);

            $scope.initStep1 = function () {
                var data = $scope.$getActiveStep().data;
                $scope.registerShuffleForm = $scope.registerShuffleForm || {};
                if (data) {
                    $scope.registerShuffleForm.shufflingFullHash = data.shufflingFullHash;
                    $scope.registerShuffleForm.amount = data.amount;
                    $scope.registerShuffleForm.shuffling = data.shuffling;
                    $scope.registerShuffleForm.holding = data.holding;
                }
            };

            $scope.isLocalhostOrTestnet = ShufflingService.isLocalHostOrTestnet() || false;


            if (!$scope.isLocalhostOrTestnet) {

              AlertService.addAlert(
                  {
                      type: 'danger',
                      msg: 'You must be connected to localhost or testnet to perform shuffling'
                  },
                  alertConfig.createShuffleModalAlert);

            }

            $scope.$on('$destroy', function () {
                multiStepFormScope.registerShuffleForm = angular.copy($scope.registerShuffleForm);
            });

            $scope.alerts = [
                { type: 'warning', msg: 'After creating or joining a shuffling you must keep your node online and your shuffler running. Make sure your balance is able to cover the 12 XIN shuffling fees until the shuffling completes. If you don\'t and miss your turn you will be charged 1.000 XIN.' }
              ];

            $scope.closeAlert = function(index) {
              $scope.alerts.splice(index, 1);
            };

            $scope.hasPrivateKeyInSession = function () {
                if (SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY)) {
                    return true;
                }
                return false;
            };

            $scope.registerShuffle = function () {
                var registerShuffleForm = multiStepFormScope.registerShuffleForm;
                var fee = 1;

                var shufflingFullHash = registerShuffleForm.shufflingFullHash;
                var publicKey = CommonsService.getAccountDetailsFromSession('publicKey');

                var secret = registerShuffleForm.secretPhrase;
                var secretPhraseHex;
                if (secret) {
                    secretPhraseHex = CryptoService.secretPhraseToPrivateKey(secret);
                } else {
                    secretPhraseHex =
                        SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
                }

                if ($scope.isLocalhostOrTestnet) {
                    $scope.registerShufflePromise =
                        ShufflingService.registerShuffle(publicKey, fee, shufflingFullHash)
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
                                                    }, alertConfig.registerShuffleModalAlert
                                                );
                                            }
                                        }, function (error) {
                                            AlertService.addAlert(
                                                AlertService.getNoConnectionMessage(error),
                                                alertConfig.registerShuffleModalAlert);
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
                            alertConfig.registerShuffleModalAlert);
                    });
            };

        }]);
