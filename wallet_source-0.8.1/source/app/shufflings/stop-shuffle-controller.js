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

angular.module('shufflings').controller('StopShuffleFormController',
    ['$scope', 'ShufflingService', 'SessionStorageService', '$state', 'CryptoService', 'loginConfig',
        'AlertService', 'alertConfig', '$validation', '$uibModal', 'multiStepFormScope', 'FeeService', '$rootScope',
        'CommonsService', 'AssetsService', 'CurrenciesService', 'amountToQuantFilter', '$sanitize',
        function ($scope, ShufflingService, SessionStorageService, $state, CryptoService,
                  loginConfig, AlertService, alertConfig, $validation, $uibModal, multiStepFormScope, FeeService,
                  $rootScope, CommonsService, AssetsService, CurrenciesService, amountToQuantFilter, $sanitize) {


            $scope.stopShuffleForm = angular.copy(multiStepFormScope.stopShuffleForm);

            $scope.initStep1 = function () {
                var data = $scope.$getActiveStep().data;
                $scope.stopShuffleForm = $scope.stopShuffleForm || {};
                if (data) {
                    $scope.stopShuffleForm.shufflingFullHash = data.shufflingFullHash;
                }
            };

            $scope.$on('$destroy', function () {
                multiStepFormScope.stopShuffleForm = angular.copy($scope.stopShuffleForm);
            });

            $scope.alerts = [
                { type: 'warning', msg: 'If you stop your already started shuffle (an already fully joined running shuffle) you will be charged 1.000 XIN. ' }
              ];

            $scope.closeAlert = function(index) {
              $scope.alerts.splice(index, 1);
            };

            $scope.showStop = true;

            $scope.hasPrivateKeyInSession = function () {
                if (SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY)) {
                    return true;
                }
                return false;
            };

            $scope.stopShuffle = function (stopShuffleForm) {

                stopShuffleForm = stopShuffleForm||multiStepFormScope.stopShuffleForm;
                var fee = 1;

                $scope.showStop = false;

                $scope.closeAlert(0);

                var shufflingFullHash = stopShuffleForm.shufflingFullHash;

                var secret = stopShuffleForm.secretPhrase;
                var secretPhraseHex;
                if (secret) {
                    secretPhraseHex = CryptoService.secretPhraseToPrivateKey(secret);
                } else {
                    secretPhraseHex =
                        SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
                }

                $scope.stopShufflePromise =
                    ShufflingService.stopShuffler(shufflingFullHash,CryptoService.secretPhraseFromPrivateKey(secretPhraseHex),fee)
                                    .then(function (success) {
                                        if (!success.errorCode) {


                                          var result = 'Shuffler succesfully stopped';
                                          var resType = 'success';

                                          if ( success.stoppedShuffler == false) {
                                            result = "No running shuffler found. Please start the shuffler before stopping.";
                                            var resType = 'info';
                                          };

                                            AlertService.addAlert(
                                                {
                                                    type: resType,
                                                    msg: 'Stop shuffle: '+ $sanitize(result)

                                                }, alertConfig.stopShuffleModalAlert
                                            );

                                        } else {
                                            AlertService.addAlert(
                                                {
                                                    type: 'danger',
                                                    msg: 'Sorry, an error occured! Reason: ' +
                                                    $sanitize(success.errorDescription)
                                                }, alertConfig.stopShuffleModalAlert
                                            );
                                        }
                                    }, function (error) {
                                        AlertService.addAlert(
                                            AlertService.getNoConnectionMessage(error),
                                            alertConfig.stopShuffleModalAlert);
                                    });
            };


        }]);
