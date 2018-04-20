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

angular.module('AT').controller('CreateATFormController',
    ['$scope', 'ATService', 'SessionStorageService', '$state', 'CryptoService', 'loginConfig',
        'AlertService', 'alertConfig', '$validation', '$uibModal', 'multiStepFormScope', 'FeeService', '$rootScope',
        'CommonsService', 'baseConfig',
        function ($scope, ATService, SessionStorageService, $state, CryptoService,
                  loginConfig, AlertService, alertConfig, $validation, $uibModal, multiStepFormScope, FeeService,
                  $rootScope, CommonsService, baseConfig) {


            $scope.createATForm = angular.copy(multiStepFormScope.createATForm);
            $scope.createATForm2 = angular.copy(multiStepFormScope.createATForm2);


            $scope.validateAndMoveNextStep = function () {
                var createATForm2 = $scope.createATForm2;
                $scope.$nextStep();
            };

            $scope.$on('$destroy', function () {
                multiStepFormScope.createATForm = angular.copy($scope.createATForm);
                multiStepFormScope.createATForm2 = angular.copy($scope.createATForm2);
            });

            $scope.hasPrivateKeyInSession = function () {
                if (SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY)) {
                    return true;
                }
                return false;
            };

            $scope.createAT = function () {
                var createATForm = multiStepFormScope.createATForm;
                var createATForm2 = multiStepFormScope.createATForm2;

                var name = createATForm.name;
                var description = createATForm.description;
                var minActivationAmountTQT = parseInt(createATForm.minActivationAmount * baseConfig.TOKEN_QUANTS);
                var code = createATForm2.code;
                var data = createATForm2.data||'';
                var creationBytes = createATForm2.bytes||'';
                var dpages = createATForm2.dpages;
                var cspages = createATForm2.cspages;
                var uspages = createATForm2.uspages;

                var fee = 1;
                var publicKey = CommonsService.getAccountDetailsFromSession('publicKey');
                var secret = createATForm.secretPhrase;
                var secretPhraseHex;
                if (secret) {
                    secretPhraseHex = CryptoService.secretPhraseToPrivateKey(secret);
                } else {
                    secretPhraseHex =
                        SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
                }

                $scope.createATPromise = ATService.createATProgram(publicKey, name, description, creationBytes, code,
                    data, dpages, cspages, uspages, minActivationAmountTQT, fee).then(function (success) {

                    if (!success.errorCode) {
                        var unsignedBytes = success.unsignedTransactionBytes;
                        var signatureHex = CryptoService.signatureHex(
                            unsignedBytes, secretPhraseHex);
                        $scope.transactionBytes =
                            CryptoService.signTransactionHex(unsignedBytes,
                                signatureHex);
                        $scope.validBytes = true;

                        $scope.tx_fee =
                            success.transactionJSON.feeTQT / 100000000;
                        $scope.tx_amount =
                            success.transactionJSON.amountTQT / 100000000;
                        $scope.tx_total = $scope.tx_fee + $scope.tx_amount;

                    } else {
                        AlertService.addAlert(
                            {
                                type: 'danger',
                                msg: 'Sorry, an error occured! Reason: ' +
                                success.errorDescription
                            }, alertConfig.createATModalAlert
                        );
                    }
                }, function (error) {
                    AlertService.addAlert(
                        AlertService.getNoConnectionMessage(error),
                        alertConfig.createATModalAlert);
                });

            };

            $scope.broadcastTransaction = function (transactionBytes) {
                $scope.createATPromise = CommonsService.broadcastTransaction(transactionBytes)
                                                       .then(function (success) {
                                                           $scope.$emit('close-modal');
                                                           $rootScope.$broadcast('reload-dashboard');
                                                           if (!success.errorCode) {
                                                               AlertService.addAlert(
                                                                   {
                                                                       type: 'success',
                                                                       msg: 'Transaction succesfull broadcasted with Id : ' +
                                                                       success.transaction +
                                                                       ''
                                                                   });
                                                               // $state.go('client.signedin.account.pending');
                                                           } else {
                                                               AlertService.addAlert(
                                                                   {
                                                                       type: 'danger',
                                                                       msg: 'Unable to broadcast transaction. Reason: ' +
                                                                       success.errorDescription
                                                                   });
                                                           }

                                                       }, function (error) {
                                                           AlertService.addAlert(
                                                               AlertService.getNoConnectionMessage(error),
                                                               alertConfig.createATModalAlert);
                                                       });
            };

        }

    ]);
