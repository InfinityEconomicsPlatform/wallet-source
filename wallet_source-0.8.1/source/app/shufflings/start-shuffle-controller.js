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

angular.module('shufflings').controller('StartShuffleFormController',
    ['$scope', 'ShufflingService', 'SessionStorageService', '$state', 'CryptoService', 'loginConfig',
        'AlertService', 'alertConfig', '$validation', '$uibModal', 'multiStepFormScope', 'FeeService', '$rootScope',
        'CommonsService', 'AssetsService', 'CurrenciesService', 'amountToQuantFilter', '$sanitize',
        function ($scope, ShufflingService, SessionStorageService, $state, CryptoService,
                  loginConfig, AlertService, alertConfig, $validation, $uibModal, multiStepFormScope, FeeService,
                  $rootScope, CommonsService, AssetsService, CurrenciesService, amountToQuantFilter, $sanitize) {


            $scope.startShuffleForm = angular.copy(multiStepFormScope.startShuffleForm);

            $scope.initStep1 = function () {
                var data = $scope.$getActiveStep().data;
                $scope.startShuffleForm = $scope.startShuffleForm || {};
                if (data) {
                    $scope.startShuffleForm.shufflingFullHash = data.shufflingFullHash;
                }
            };

            $scope.$on('$destroy', function () {
                multiStepFormScope.startShuffleForm = angular.copy($scope.startShuffleForm);
            });

            $scope.alerts = [
                { type: 'warning', msg: 'Your passphrase is needed to start the shuffle on the connected node. Due to security reason this is only allowed on a local node or the dedicated SSL node provided by the foundation. The most secure way is to run your own local node for shuffling. To proceed please enter the recipient public key where to send token/assets or currencies. The recipient account has to be an unused, new account. You can generate a new account from login. Write down the passphrase!' }
              ];

            $scope.closeAlert = function(index) {
              $scope.alerts.splice(index, 1);
            };

            $scope.showStart = true;

            $scope.hasPrivateKeyInSession = function () {
                if (SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY)) {
                    return true;
                }
                return false;
            };

            $scope.startShuffle = function (startShuffleForm) {
                startShuffleForm = startShuffleForm||multiStepFormScope.startShuffleForm;
                var fee = 1;

                $scope.showStart = false;

                $scope.closeAlert(0);

                var shufflingFullHash = startShuffleForm.shufflingFullHash;
                var publicKey = CommonsService.getAccountDetailsFromSession('publicKey');
                var recipientPublickey = startShuffleForm.recipientPublickey;

                var secret = startShuffleForm.secretPhrase;
                var secretPhraseHex;
                if (secret) {
                    secretPhraseHex = CryptoService.secretPhraseToPrivateKey(secret);
                } else {
                    secretPhraseHex =
                        SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
                }

                $scope.stopShufflePromise =
                    ShufflingService.startShuffler(CryptoService.secretPhraseFromPrivateKey(secretPhraseHex),
                        shufflingFullHash, undefined, recipientPublickey, fee)
                                    .then(function (success) {

                                    //  console.log (success)

                                        if (!success.errorCode) {

                                            AlertService.addAlert(
                                                {
                                                    type: 'success',
                                                    msg: 'Shuffling ' + $sanitize(success.shuffling) + ' successfull started. Recipient: ' +
                                                    success.recipientRS + ' '

                                                }, alertConfig.startShuffleModalAlert
                                            );

                                        } else {
                                            AlertService.addAlert(
                                                {
                                                    type: 'danger',
                                                    msg: 'Sorry, an error occured! Reason: ' +
                                                    $sanitize(success.errorDescription)
                                                }, alertConfig.startShuffleModalAlert
                                            );
                                        }
                                    }, function (error) {
                                        AlertService.addAlert(
                                            AlertService.getNoConnectionMessage(error),
                                            alertConfig.startShuffleModalAlert);
                                    });
            };



        }]);
