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

angular.module('shufflings').controller('CancelShuffleFormController',
    ['$scope', 'ShufflingService', 'SessionStorageService', '$state', 'CryptoService', 'loginConfig',
        'AlertService', 'alertConfig', '$validation', '$uibModal', 'multiStepFormScope', 'FeeService', '$rootScope',
        'CommonsService', 'AssetsService', 'CurrenciesService', 'amountToQuantFilter', 'OptionsService', '$sanitize',
        function ($scope, ShufflingService, SessionStorageService, $state, CryptoService,
                  loginConfig, AlertService, alertConfig, $validation, $uibModal, multiStepFormScope, FeeService,
                  $rootScope, CommonsService, AssetsService, CurrenciesService, amountToQuantFilter, OptionsService, $sanitize) {

            $scope.cancelShuffleForm = angular.copy(multiStepFormScope.cancelShuffleForm);

            $scope.$on('$destroy', function () {
                multiStepFormScope.cancelShuffleForm = angular.copy($scope.cancelShuffleForm);
            });

            $scope.initStep1 = function () {
                var data = $scope.$getActiveStep().data;
                $scope.cancelShuffleForm = $scope.cancelShuffleForm || {};
                if (data) {
                    $scope.cancelShuffleForm.shufflingId = data.shufflingId;
                    if (!(data.shufflingStateHash && data.cancellingAccountId)) {
                        ShufflingService.getShuffling(data.shufflingId).then(function (success) {
                            $scope.cancelShuffleForm.shufflingStateHash = success.shufflingStateHash;
                            $scope.cancelShuffleForm.cancellingAccountId = success.assignee;
                            console.log($scope.cancelShuffleForm);
                        }, function (error) {

                        })
                    } else {
                        $scope.cancelShuffleForm.shufflingStateHash = data.shufflingStateHash;
                        $scope.cancelShuffleForm.cancellingAccountId = data.cancellingAccountId;
                    }

                }
            };

            $scope.hasPrivateKeyInSession = function () {
                if (SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY)) {
                    return true;
                }
                return false;
            };

            $scope.isLocalhostOrTestnet = ShufflingService.isLocalHostOrTestnet();

            $scope.cancelShuffle = function () {
                var cancelShuffleForm = multiStepFormScope.cancelShuffleForm;
                var shufflingId = cancelShuffleForm.shufflingId;
                var shufflingStateHash = cancelShuffleForm.shufflingStateHash;
                var cancellingAccountId = cancelShuffleForm.cancellingAccountId;
                var fee = 1;

                var publicKey = CommonsService.getAccountDetailsFromSession('publicKey');


                var secret = cancelShuffleForm.secretPhrase;
                var secretPhraseHex;
                if (secret) {
                    secretPhraseHex = CryptoService.secretPhraseToPrivateKey(secret);
                } else {
                    secretPhraseHex =
                        SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
                }
                $scope.cancelShufflePromise =
                    ShufflingService.cancelShuffle(CryptoService.secretPhraseFromPrivateKey(secretPhraseHex),
                        shufflingId, shufflingStateHash, cancellingAccountId, fee)
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
                                                }, alertConfig.cancelShuffleModalAlert
                                            );
                                        }
                                    }, function (error) {
                                        AlertService.addAlert(
                                            AlertService.getNoConnectionMessage(error),
                                            alertConfig.cancelShuffleModalAlert);
                                    });
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
                            alertConfig.cancelShuffleModalAlert);
                    });
            };

        }]);
