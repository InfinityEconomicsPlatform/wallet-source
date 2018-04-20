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

angular.module('shufflings').service('ShufflingService',
    ['nodeConfig', 'SessionStorageService', 'NodeService', 'baseConfig', 'shufflingsConfig', 'Restangular',
        'TransactionService', '$rootScope', 'OptionsService', 'CommonsService',
        function (nodeConfig, SessionStorageService, NodeService, baseConfig, shufflingsConfig, Restangular,
                  TransactionService, $rootScope, OptionsService, CommonsService) {

            var ShufflingService = this;

            this.getAllShufflings = function (firstIndex, lastIndex, includeFinished) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE'),
                    OptionsService.getOption('RANDOMIZE_NODES')));
                var params = {
                    'requestType': 'getAllShufflings',
                    'firstIndex': firstIndex,
                    'lastIndex': lastIndex,
                    'includeFinished': includeFinished,
                    'includeHoldingInfo': true
                };
                return Restangular.all(shufflingsConfig.shufflingEndPoint).customGET('', params);
            };

            this.getAccountShufflings = function (account, firstIndex, lastIndex, includeFinished) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE'),
                    OptionsService.getOption('RANDOMIZE_NODES')));
                var params = {
                    'requestType': 'getAccountShufflings',
                    'account': account,
                    'firstIndex': firstIndex,
                    'lastIndex': lastIndex,
                    'includeFinished': includeFinished,
                    'includeHoldingInfo': true
                };
                return Restangular.all(shufflingsConfig.shufflingEndPoint).customGET('', params);
            };

            this.createShuffling =
                function (publicKey, amount, participantCount, registrationPeriod, holding, holdingType, fee) {

                    var params = {
                        'requestType': 'shufflingCreate',
                        'amount': parseInt(amount),
                        'publicKey': publicKey,
                        'participantCount': participantCount,
                        'registrationPeriod': registrationPeriod,
                        'holding': holding,
                        'holdingType': holdingType,
                        'feeTQT': parseInt(fee * baseConfig.TOKEN_QUANTS, 10),
                        'deadline': OptionsService.getOption('DEADLINE'),
                        'broadcast': 'false',
                    };
                    return TransactionService.createTransaction(params);
                };

            this.registerShuffle = function (publicKey, fee, shufflingFullHash) {
                var params = {
                    'requestType': 'shufflingRegister',
                    'shufflingFullHash': shufflingFullHash,
                    'publicKey': publicKey,
                    'feeTQT': parseInt(fee * baseConfig.TOKEN_QUANTS, 10),
                    'deadline': OptionsService.getOption('DEADLINE'),
                    'broadcast': 'false',
                };
                return TransactionService.createTransaction(params);
            };

            this.isLocalHostOrTestnet = function () {
                var connectionMode = OptionsService.getOption('CONNECTION_MODE');
                if (
                    connectionMode === 'TESTNET' ||
                    connectionMode === 'LOCAL_HOST' ||
                    connectionMode === 'DEVTESTNET') {
                    return true;
                }
                if (connectionMode === 'MANUAL') {
                    var connectedUrl = NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE'),
                        OptionsService.getOption('RANDOMIZE_NODES'));
                    if (connectedUrl.indexOf('localhost') > -1) {
                        return true;
                    }
                }

            }

            this.getShufflingParticipants = function (shufflingId) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE'),
                    OptionsService.getOption('RANDOMIZE_NODES')));
                var params = {
                    'requestType': 'getShufflingParticipants',
                    'shuffling': shufflingId
                };
                return Restangular.all(shufflingsConfig.shufflingEndPoint).customGET('', params);
            };

            this.getShuffling = function (shufflingId) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE'),
                    OptionsService.getOption('RANDOMIZE_NODES')));
                var params = {
                    'requestType': 'getShuffling',
                    'shuffling': shufflingId,
                    'includeHoldingInfo': true
                };
                return Restangular.all(shufflingsConfig.shufflingEndPoint).customGET('', params);
            };

            this.getShufflers = function (adminPassword, account, shufflingFullHash, secretPhrase) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE'),
                    OptionsService.getOption('RANDOMIZE_NODES')));
                var params = {
                    'requestType': 'getShufflers',
                    'adminPassword': adminPassword,
                    'account': account,
                    'shufflingFullHash': shufflingFullHash,
                    'secretPhrase': secretPhrase,
                    'adminPassword': adminPassword,
                    'includeParticipantState': true
                };
                return Restangular.all(shufflingsConfig.shufflingEndPoint).customGET('', params);
            };

            this.getShuffleAndStopIfExpired = function (shuffleId, adminPassword) {
                return ShufflingService.getShuffling(shuffleId).then(function (success) {
                    if (!success.errorCode) {
                        if ((success.stage === 4 || success.stage === 5)) {
                            return ShufflingService.stopShuffler(success.shufflingFullHash, undefined, 1,
                                adminPassword, CommonsService.getAccountDetailsFromSession('accountRs'))
                                                   .then(function (success) {
                                                       return Promise.resolve(success);
                                                   }, function (error) {
                                                       return Promise.resolve(error);
                                                   });
                        }
                        return Promise.resolve('Shuffling is in starat state');
                    } else {
                        return Promise.resolve(success);
                    }
                }, function (error) {
                    return Promise.resolve(error);
                })
            };

            this.getHoldingShufflings =
                function (holding, stage, includeFinished, firstIndex, lastIndex, adminPassword) {
                    Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE'),
                        OptionsService.getOption('RANDOMIZE_NODES')));
                    var params = {
                        'requestType': 'getHoldingShufflings',
                        'holding': holding,
                        'stage': stage,
                        'includeFinished': includeFinished,
                        'firstIndex': firstIndex,
                        'lastIndex': lastIndex,
                        'adminPassword': adminPassword
                    };
                    return Restangular.all(shufflingsConfig.shufflingEndPoint).customGET('', params);
                };

            this.getAssignedShufflings = function (account, stage, firstIndex, lastIndex, adminPassword) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE'),
                    OptionsService.getOption('RANDOMIZE_NODES')));
                var params = {
                    'requestType': 'getAssignedShufflings',
                    'account': account,
                    'includeHoldingInfo': true,
                    'firstIndex': firstIndex,
                    'lastIndex': lastIndex,
                    'adminPassword': adminPassword
                };
                return Restangular.all(shufflingsConfig.shufflingEndPoint).customGET('', params);
            };

            this.shufflingVerify = function (shuffling, shufflingStateHash, recipientSecretPhrase, secretPhrase, fee) {
                var params = {
                    'requestType': 'shufflingVerify',
                    'shuffling': shuffling,
                    'shufflingStateHash': shufflingStateHash,
                    'recipientSecretPhrase': recipientSecretPhrase,
                    'secretPhrase': secretPhrase,
                    'feeTQT': parseInt(fee * baseConfig.TOKEN_QUANTS, 10),
                    'deadline': OptionsService.getOption('DEADLINE'),
                    'broadcast': 'false',
                };
                return TransactionService.createTransaction(params);
            };

            this.startShuffler =
                function (secretPhrase, shufflingFullHash, recipientSecretPhrase, recipientPublicKey, fee) {
                    var params = {
                        'requestType': 'startShuffler',
                        'secretPhrase': secretPhrase,
                        'shufflingFullHash': shufflingFullHash,
                        'recipientSecretPhrase': recipientSecretPhrase,
                        'recipientPublicKey': recipientPublicKey,
                        'feeTQT': parseInt(fee * baseConfig.TOKEN_QUANTS, 10),
                        'deadline': OptionsService.getOption('DEADLINE'),
                        'broadcast': 'false',
                    };
                    return TransactionService.createTransaction(params);

                };

            this.stopShuffler = function (shufflingFullHash, secretPhrase, fee, adminPassword, account) {
                var params = {
                    'requestType': 'stopShuffler',
                    'shufflingFullHash': shufflingFullHash,
                    'secretPhrase': secretPhrase,
                    'adminPassword': adminPassword,
                    'account': account,
                    'feeTQT': parseInt(fee * baseConfig.TOKEN_QUANTS, 10),
                    'deadline': OptionsService.getOption('DEADLINE'),
                    'broadcast': 'false',
                };
                return TransactionService.createTransaction(params);
            };

            this.cancelShuffle = function (secretPhrase, shufflingId, shufflingStateHash, cancelAccountId, fee) {
                var params = {
                    'requestType': 'shufflingCancel',
                    'shuffling': shufflingId,
                    'shufflingStateHash': shufflingStateHash,
                    'secretPhrase': secretPhrase,
                    'cancellingAccount': cancelAccountId,
                    'feeTQT': parseInt(fee * baseConfig.TOKEN_QUANTS, 10),
                    'deadline': OptionsService.getOption('DEADLINE'),
                    'broadcast': 'false',
                };
                return TransactionService.createTransaction(params);
            };

        }]);
