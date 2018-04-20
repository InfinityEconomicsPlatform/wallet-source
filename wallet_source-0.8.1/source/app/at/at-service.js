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

angular.module('AT').service('ATService',
    ['nodeConfig', 'SessionStorageService', 'NodeService', 'baseConfig', 'Restangular', 'loginConfig',
        'CryptoService', 'TransactionService', '$rootScope', 'OptionsService', 'ATConfig',
        function (nodeConfig, SessionStorageService, NodeService, baseConfig, Restangular, loginConfig,
                  CryptoService, TransactionService, $rootScope, OptionsService, ATConfig) {

            this.createATProgram =
                function (publicKey, name, description, creationBytes, code, data, dpages, cspages, uspages,
                          minActivationAmountTQT, fee) {
                    Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE'),
                        OptionsService.getOption('RANDOMIZE_NODES')));
                    var params = {
                        'publicKey': publicKey,
                        'requestType': 'createATProgram',

                        'name': name,
                        'description': description,
                        'creationBytes': creationBytes,
                        'code': code,
                        'data': data,
                        'dpages': dpages,
                        'cspages': cspages,
                        'uspages': uspages,
                        'minActivationAmountTQT': parseInt(minActivationAmountTQT),

                        'feeTQT': parseInt(fee * baseConfig.TOKEN_QUANTS, 10),
                        'broadcast': 'false',
                        'deadline': OptionsService.getOption('DEADLINE')
                    };
                    return TransactionService.createTransaction(params);
                };

            this.getAT = function (at) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE')));
                var params = {
                    'requestType': 'getAT',
                    'at': at
                };
                return Restangular.all(ATConfig.ATEndPoint).customGET('', params);
            };

            this.getATDetails = function (at) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE')));
                var params = {
                    'requestType': 'getATDetails',
                    'at': at
                };
                return Restangular.all(ATConfig.ATEndPoint).customGET('', params);
            };

            this.getATDetails = function (at) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE')));
                var params = {
                    'requestType': 'getATDetails',
                    'at': at
                };
                return Restangular.all(ATConfig.ATEndPoint).customGET('', params);
            };

            this.getATIds = function () {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE')));
                var params = {
                    'requestType': 'getATIds'
                };
                return Restangular.all(ATConfig.ATEndPoint).customGET('', params);
            };

            this.getAllATs = function () {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE')));
                var params = {
                    'requestType': 'getAllATs'
                };
                return Restangular.all(ATConfig.ATEndPoint).customGET('', params);
            };

            this.getATLong = function (hexString) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE')));
                var params = {
                    'requestType': 'getATLong',
                    'hexString': hexString
                };
                return Restangular.all(ATConfig.ATEndPoint).customGET('', params);
            };

            this.getAccountATs = function (account) {
                Restangular.setBaseUrl(NodeService.getNodeUrl(OptionsService.getOption('CONNECTION_MODE')));
                var params = {
                    'requestType': 'getAccountATs',
                    'account': account
                };
                return Restangular.all(ATConfig.ATEndPoint).customGET('', params);
            };

        }]);
