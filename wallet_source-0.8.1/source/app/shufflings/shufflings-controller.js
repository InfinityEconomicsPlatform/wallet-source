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


angular.module('shufflings').controller('ShufflingsMainCtrl',
    ['$scope', 'ShufflingService', 'amountTQTFilter', 'timestampFilter', 'DTOptionsBuilder', 'DTColumnBuilder',
        '$uibModal', '$compile', 'baseConfig', 'supplyFilter', 'searchTermFilter', 'shufflingsConfig', '$q',
        'AlertService', 'CryptoService', 'CommonsService', 'SessionStorageService', 'loginConfig',
        function ($scope, ShufflingService, amountTQTFilter, timestampFilter, DTOptionsBuilder, DTColumnBuilder,
                  $uibModal, $compile, baseConfig, supplyFilter, searchTermFilter, shufflingsConfig, $q, AlertService,
                  CryptoService, CommonsService, SessionStorageService, loginConfig) {

            $scope.openCreateShuffleModal = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'shufflings/modals/create-shuffle-form.html',
                    size: 'lg',
                    controller: 'ShufflingFormCtrl',
                    resolve: {
                        params: function () {
                            return {};
                        }
                    }
                });
            };

            $scope.openRegisterShuffleModal = function (shufflingFullHash, amount, shuffling, holding) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'shufflings/modals/register-shuffle-form.html',
                    size: 'lg',
                    controller: 'ShufflingFormCtrl',
                    resolve: {
                        params: function () {
                            return {
                                shufflingFullHash: shufflingFullHash,
                                amount: amount,
                                shuffling: shuffling,
                                holding: holding
                            };
                        }
                    }
                });
            };

            $scope.openStartShuffleModal = function (shufflingFullHash) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'shufflings/modals/start-shuffle-form.html',
                    size: 'lg',
                    controller: 'ShufflingFormCtrl',
                    resolve: {
                        params: function () {
                            return {
                                shufflingFullHash: shufflingFullHash
                            };
                        }
                    }
                });
            };

            $scope.openStopShuffleModal = function (shufflingFullHash) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'shufflings/modals/stop-shuffle-form.html',
                    size: 'lg',
                    controller: 'ShufflingFormCtrl',
                    resolve: {
                        params: function () {
                            return {
                                shufflingFullHash: shufflingFullHash
                            };
                        }
                    }
                });
            };

            $scope.openCancelShuffleModal = function (shufflingId, shufflingStateHash, cancellingAccountId) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'shufflings/modals/cancel-shuffle-form.html',
                    size: 'lg',
                    controller: 'ShufflingFormCtrl',
                    resolve: {
                        params: function () {
                            return {
                                shufflingId: shufflingId,
                                shufflingStateHash: shufflingStateHash,
                                cancellingAccountId: cancellingAccountId
                            };
                        }
                    }
                });
            };

            $scope.openShufflingParticipantsModal = function (shufflingId) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'shufflings/modals/shuffling-participants.html',
                    size: 'lg',
                    controller: 'ShufflingParticipantsCtrl',
                    resolve: {
                        params: function () {
                            return {
                                shufflingId: shufflingId
                            };
                        }
                    }
                });
            };

            $scope.openShufflingDetailsModal = function (shufflingId) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'shufflings/modals/shuffling-details.html',
                    size: 'lg',
                    controller: 'ShufflingDetailsCtrl',
                    resolve: {
                        params: function () {
                            return {
                                shufflingId: shufflingId
                            };
                        }
                    }
                });
            };

            $scope.clearAllShufflers = function () {
                var account = CommonsService.getAccountDetailsFromSession('accountId');
                var secretPhraseHex =
                    SessionStorageService.getFromSession(loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
                $scope.clearShufflerPromise =
                    ShufflingService.getAccountShufflings(account, undefined, undefined, true).then(function (success) {
                        var existingShufflers = success.shufflings;
                        if (existingShufflers.length > 0) {
                            var promisesArray = [];
                            var maxLength = Math.min(existingShufflers.length, 10);
                            for (var i = 0; i < maxLength; i++) {
                                var current = existingShufflers[i];
                                if ((current.stage === 4 || current.stage === 5)) {
                                    promisesArray.push(ShufflingService.stopShuffler(current.shufflingFullHash,
                                        CryptoService.secretPhraseFromPrivateKey(secretPhraseHex)));
                                }
                            }
                            if (promisesArray.length > 0) {
                                $scope.clearShufflerPromise = $q.all(promisesArray).then(function (success) {
                                    AlertService.addAlert({
                                        type: 'success',
                                        msg: 'Succesfully stopped all the shufflers on testnet node'
                                    });
                                }, function (error) {

                                });
                            }
                        }
                    }, function (error) {

                    })
            };

        }]);

angular.module('shufflings').controller('ShufflingsCtrl',
    ['$scope', 'ShufflingService', 'DTOptionsBuilder', 'DTColumnBuilder', '$interval', '$uibModal', '$compile',
        'amountTQTFilter', 'baseConfig', 'searchTermFilter', 'SessionStorageService', 'shufflingStageFilter',
        'holdingTypeFilter', 'CommonsService', 'quantityToShareFilter', 'numberStringFilter', '$sanitize',
        function ($scope, ShufflingService, DTOptionsBuilder, DTColumnBuilder, $interval, $uibModal, $compile,
                  amountTQTFilter, baseConfig, searchTermFilter, SessionStorageService, shufflingStageFilter,
                  holdingTypeFilter, CommonsService, quantityToShareFilter, numberStringFilter, $sanitize) {


            $scope.includeFinished = false;

            $scope.account = CommonsService.getAccountDetailsFromSession('accountRs');

            $scope.filterNone = function () {
                $scope.includeFinished = false;
                $scope.reloadShufflings();
            };

            $scope.activeShuffles = function () {
                $scope.includeFinished = false;
                $scope.reloadShufflings();
            };

            $scope.allShuffles = function () {
                $scope.includeFinished = true;
                $scope.reloadShufflings();
            };

            $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
                                               .withDOM('frtip')
                                               .withOption('info', false)
                                               .withOption('ordering', false)
                                               .withOption('serverSide', true)
                                               .withDataProp('shufflings')
                                               .withOption('processing', true)
                                               .withOption('ordering', false)
                                               .withOption('bFilter', false)
                                               .withOption('fnRowCallback',
                                                   function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                                       $compile(nRow)($scope);
                                                   })
                                               .withOption('ajax', function (data, callback, settings) {
                                                   var endIndex = data.start + data.length - 1;
                                                   ShufflingService.getAllShufflings(data.start, endIndex,
                                                       $scope.includeFinished)
                                                                   .then(function (response) {
                                                                       callback({
                                                                           'iTotalRecords': 1000,
                                                                           'iTotalDisplayRecords': 1000,
                                                                           'shufflings': response.shufflings || []
                                                                       });
                                                                   });
                                               })
                                               .withDisplayLength(10).withBootstrap();

            $scope.dtColumns = [

                DTColumnBuilder.newColumn('shuffling').withTitle('Details').notSortable()

                               .renderWith(function (data, type, row, meta) {
                                   return '<button class="btn btn-success btn-xs" ng-controller="SearchCtrl"' +
                                       ' ' +
                                       'ng-click="searchValue(\'' + $sanitize(data) + '\')">' +
                                       '<i class="fa fa-list-ul" aria-hidden="true" style="width:15px;"></i>' +
                                       '</button>';
                               }),

                DTColumnBuilder.newColumn('participantCount').withTitle('Participants').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return $sanitize(data) + '/' + $sanitize(row['registrantCount']);
                               }),

                DTColumnBuilder.newColumn('shuffling').withTitle('Shuffling').notSortable()
                               .renderWith(function (data, type, row, meta) {

                                   var but_col_info = 'btn-default';
                                   var tt_info = ' popover-placement="left" popover-trigger="\'mouseenter\'" uib-popover=' +
                                       ' "Shuffling Details"';

                                   var info = '<button type="button" class="btn ' + but_col_info + ' btn-xs" + '
                                       + tt_info +
                                       ' ng-controller="ShufflingsMainCtrl"' +
                                       ' ng-click="openShufflingDetailsModal(\'' + $sanitize(data) +
                                       '\')" ng-disabled="' + 'false' +
                                       '"> <i class="fa fa-question-circle-o" aria-hidden="true" style="width:15px;"></i> </button>';

                                   return info;

                               }),

                DTColumnBuilder.newColumn('stage').withTitle('Stage').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return shufflingStageFilter( $sanitize(data));
                               }),


                DTColumnBuilder.newColumn('holdingType').withTitle('Type').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return holdingTypeFilter($sanitize(data));
                               }),

                DTColumnBuilder.newColumn('holding').withTitle('Holding').notSortable()
                               .renderWith(function (data, type, row, meta) {


                                   var holdingType = row['holdingType'];
                                   if (holdingType === 1) {
                                       return '<a ng-click="openAssetDetailsModal(\'' + $sanitize(data) +
                                           '\')" ng-controller="AssetsMainCtrl"> ' + 'Details' + '</a>';

                                   } else if (holdingType === 2) {
                                       return '<a ng-click="openCurrencyDetailsModal(\'' + $sanitize(row.holdingInfo.code) +
                                           '\')" ng-controller="CurrenciesMainCtrl"> ' + 'Details' + '</a>';
                                   } else {
                                       return '';
                                   }

                               }),

                DTColumnBuilder.newColumn('amount').withTitle('Amount').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   var holdingTYpe = row.holdingType;
                                   if (holdingTYpe === 0) {
                                       return amountTQTFilter($sanitize(data));
                                   } else if (holdingTYpe === 1 || holdingTYpe === 2) {
                                       return numberStringFilter(quantityToShareFilter(data, $sanitize(row.holdingInfo.decimals)));
                                   }

                               }),


                DTColumnBuilder.newColumn('issuerRS').withTitle('Assigne').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return searchTermFilter($sanitize(data));
                               }),

                DTColumnBuilder.newColumn('blocksRemaining').withTitle('Blocks').notSortable(),

                DTColumnBuilder.newColumn('shufflingFullHash').withTitle('Action').notSortable()
                               .renderWith(function (data, type, row, meta) {

                                   var canRegisterDisabled = false; // row.stage > 0;
                                   var but_col = 'btn-success';

                                   if (row.stage > 0 || row.issuerRS === $scope.account) {
                                       canRegisterDisabled = true;
                                       but_col = 'btn-default';
                                   }
                                   ;

                                   var tt_join = ' popover-placement="left" popover-trigger="\'mouseenter\'" uib-popover=' +
                                       ' "Join Shuffling"';

                                   var register = '<button type="button" class="btn ' + but_col + ' btn-xs" + '
                                       + tt_join +
                                       ' ng-controller="ShufflingsMainCtrl"' +
                                       ' ng-click="openRegisterShuffleModal(\'' + $sanitize(data) + '\',' + '\'' + $sanitize(row.amount) +
                                       '\',' + '\'' + $sanitize(row.shuffling) + '\',' + '\'' + $sanitize(row.holding) +
                                       '\')" ng-disabled="' + canRegisterDisabled +
                                       '"> <i class="fa fa-plus" aria-hidden="true" style="width:15px;"></i> </button>';

                                   return register;

                               }),

            ];

            $scope.dtInstanceCallback = function (_dtInstance) {
                $scope.dtInstance = _dtInstance;
            };
            $scope.reloadShufflings = function () {
                if ($scope.dtInstance) {
                    $scope.dtInstance._renderer.rerender();
                }
            };

        }]);

angular.module('shufflings').controller('MyShufflingsCtrl',
    ['$scope', 'ShufflingService', 'DTOptionsBuilder', 'DTColumnBuilder', '$interval', '$uibModal', '$compile',
        'amountTQTFilter', 'baseConfig', 'searchTermFilter', 'SessionStorageService', 'shufflingStageFilter',
        'holdingTypeFilter', 'CommonsService', 'quantityToShareFilter', 'numberStringFilter', 'shufflingsConfig', '$q',
        'loginConfig','CryptoService', '$sanitize',
        function ($scope, ShufflingService, DTOptionsBuilder, DTColumnBuilder, $interval, $uibModal, $compile,
                  amountTQTFilter, baseConfig, searchTermFilter, SessionStorageService, shufflingStageFilter,
                  holdingTypeFilter, CommonsService, quantityToShareFilter, numberStringFilter, shufflingsConfig, $q,
                  loginConfig,CryptoService, $sanitize) {


            $scope.includeFinished = false;

            $scope.filterNone = function () {
                $scope.includeFinished = false;
                $scope.reloadShufflings();
            };

            $scope.activeShuffles = function () {
                $scope.includeFinished = false;
                $scope.reloadShufflings();
            };

            $scope.allShuffles = function () {
                $scope.includeFinished = true;
                $scope.reloadShufflings();
            };

            $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
                                               .withDOM('frtip')
                                               .withOption('info', false)
                                               .withOption('ordering', false)
                                               .withOption('serverSide', true)
                                               .withDataProp('shufflings')
                                               .withOption('processing', true)
                                               .withOption('ordering', false)
                                               .withOption('bFilter', false)
                                               .withOption('fnRowCallback',
                                                   function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                                       $compile(nRow)($scope);
                                                   })
                                               .withOption('ajax', function (data, callback, settings) {
                                                   var endIndex = data.start + data.length - 1;
                                                   var account = CommonsService.getAccountDetailsFromSession(
                                                       'accountId');
                                                   var secretPhraseHex =
                                                       SessionStorageService.getFromSession(
                                                           loginConfig.SESSION_ACCOUNT_PRIVATE_KEY);
                                                   var shufflersPromise = ShufflingService.getShufflers(undefined,
                                                       account,undefined,
                                                       CryptoService.secretPhraseFromPrivateKey(secretPhraseHex));
                                                   var accountShufflings = ShufflingService.getAccountShufflings(
                                                       account, data.start, endIndex,
                                                       $scope.includeFinished);
                                                   $q.all([accountShufflings, shufflersPromise])
                                                     .then(function (response) {
                                                         var accountShufflings = response[0];
                                                         $scope.shufflersState = {};
                                                         angular.forEach(response[1].shufflers, function (newValue) {
                                                             $scope.shufflersState[newValue.shuffling] = newValue;
                                                         });
                                                         callback({
                                                             'iTotalRecords': 1000,
                                                             'iTotalDisplayRecords': 1000,
                                                             'shufflings': accountShufflings.shufflings || []
                                                         });
                                                     });
                                               })
                                               .withDisplayLength(10).withBootstrap();

            $scope.dtColumns = [

                DTColumnBuilder.newColumn('shuffling').withTitle('Details').notSortable()

                               .renderWith(function (data, type, row, meta) {
                                   return '<button class="btn btn-success btn-xs" ng-controller="SearchCtrl"' +
                                       ' ' +
                                       'ng-click="searchValue(\'' + $sanitize(data) + '\')">' +
                                       '<i class="fa fa-list-ul" aria-hidden="true" style="width:15px;"></i>' +
                                       '</button>';
                               }),

                DTColumnBuilder.newColumn('participantCount').withTitle('Participants').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return '<a  ng-controller="ShufflingsMainCtrl"' +
                                       ' ng-click="openShufflingParticipantsModal(\'' + $sanitize(row.shuffling) + '\')">' + $sanitize(data) +
                                       '/' + row['registrantCount'] + '</a>';
                               }),

                DTColumnBuilder.newColumn('shuffling').withTitle('Shuffling').notSortable()
                               .renderWith(function (data, type, row, meta) {

                                   var but_col_info = 'btn-default';
                                   var tt_info = ' popover-placement="left" popover-trigger="\'mouseenter\'" uib-popover=' +
                                       ' "Shuffling Details"';

                                   var info = '<button type="button" class="btn ' + but_col_info + ' btn-xs" + '
                                       + tt_info +
                                       ' ng-controller="ShufflingsMainCtrl"' +
                                       ' ng-click="openShufflingDetailsModal(\'' + $sanitize(data) +
                                       '\')" ng-disabled="' + 'false' +
                                       '"> <i class="fa fa-question-circle-o" aria-hidden="true" style="width:15px;"></i> </button>';

                                   return info;

                               }),

                DTColumnBuilder.newColumn('stage').withTitle('Stage').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return shufflingStageFilter($sanitize(data));
                               }),


                DTColumnBuilder.newColumn('holdingType').withTitle('Type').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return holdingTypeFilter($sanitize(data));
                               }),

                DTColumnBuilder.newColumn('holding').withTitle('Holding').notSortable()
                               .renderWith(function (data, type, row, meta) {


                                   var holdingType = row['holdingType'];
                                   if (holdingType === 1) {
                                       return '<a ng-click="openAssetDetailsModal(\'' + $sanitize(data) +
                                           '\')" ng-controller="AssetsMainCtrl"> ' + 'Details' + '</a>';

                                   } else if (holdingType === 2) {
                                       return '<a ng-click="openCurrencyDetailsModal(\'' + $sanitize(row.holdingInfo.code) +
                                           '\')" ng-controller="CurrenciesMainCtrl"> ' + 'Details' + '</a>';
                                   } else {
                                       return '';
                                   }

                               }),

                DTColumnBuilder.newColumn('amount').withTitle('Amount').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   var holdingTYpe = row.holdingType;
                                   if (holdingTYpe === 0) {
                                       return amountTQTFilter($sanitize(data));
                                   } else if (holdingTYpe === 1 || holdingTYpe === 2) {
                                       return numberStringFilter(quantityToShareFilter($sanitize(data), $sanitize(row.holdingInfo.decimals)));
                                   }
                               }),

                DTColumnBuilder.newColumn('issuerRS').withTitle('Assigne').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return searchTermFilter($sanitize(data));
                               }),

                DTColumnBuilder.newColumn('blocksRemaining').withTitle('Blocks').notSortable(),

                DTColumnBuilder.newColumn('shufflingFullHash').withTitle('Action').notSortable()
                               .renderWith(function (data, type, row, meta) {

                                   var canStartDisabled = row.stage !== 1;
                                   var canStopDisabled = row.stage !== 1;
                                   var canCancelDisabled = false;

                                   var but_col_start = 'btn-default';
                                   var but_col_stop = 'btn-default';
                                   var but_col_cancel = 'btn-default';

                                   canStartDisabled = $scope.shufflersState[row.shuffling]?true:false;
                                   canStopDisabled = !$scope.shufflersState[row.shuffling]?true:false;
                                   canCancelDisabled = false;

                                   var tt_start = ' popover-placement="left" popover-trigger="\'mouseenter\'" uib-popover=' +
                                       ' "Start Shuffling"';

                                   var tt_stop = ' popover-placement="left" popover-trigger="\'mouseenter\'" uib-popover=' +
                                       ' "Stop Shuffling"';

                                   var start = '<button type="button" class="btn ' + but_col_start + ' btn-xs" + '
                                       + tt_start +
                                       ' ng-controller="ShufflingsMainCtrl"' +
                                       ' ng-click="openStartShuffleModal(\'' + $sanitize(data) + '\',' + '\'' + $sanitize(row.amount) +
                                       '\')" ng-disabled="' + canStartDisabled +
                                       '"> <i class="fa fa-play" aria-hidden="true" style="width:15px;"></i> </button>';

                                   var stop = '<button type="button" class="btn ' + but_col_stop + ' btn-xs" + '
                                       + tt_stop +
                                       ' ng-controller="ShufflingsMainCtrl"' +
                                       ' ng-click="openStopShuffleModal(\'' + $sanitize(data) + '\')" ng-disabled="' +
                                       canStopDisabled +
                                       '"> <i class="fa fa-stop" aria-hidden="true" style="width:15px;"></i> </button>'

                                   return start + '&nbsp;' + stop;

                               }),


            ];

            $scope.dtInstanceCallback = function (_dtInstance) {
                $scope.dtInstance = _dtInstance;
            };
            $scope.reloadShufflings = function () {
                if ($scope.dtInstance) {
                    $scope.dtInstance._renderer.rerender();
                }
            };

        }]);

angular.module('shufflings').controller('ShufflingFormCtrl',
    ['$scope', '$uibModalInstance', 'params', function ($scope, $uibModalInstance, params) {

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.$on('close-modal', function () {
            $uibModalInstance.dismiss('cancel');
        });

        var createShuffleSteps = [
            {
                templateUrl: 'shufflings/modals/create-shuffle-details.html',
                title: 'Create Shuffle Details',
                controller: 'CreateShuffleFormController',
                isolatedScope: true,
                data: params,
            },
            {
                templateUrl: 'shufflings/modals/create-shuffle-confirm.html',
                title: 'Create Shuffle Confirmation',
                controller: 'CreateShuffleFormController',
                isolatedScope: true,
            },
        ];

        var cancelShuffleSteps = [
            {
                templateUrl: 'shufflings/modals/cancel-shuffle-details.html',
                title: 'Cancel Shuffle Details',
                controller: 'CancelShuffleFormController',
                isolatedScope: true,
                data: params,
            },
            {
                templateUrl: 'shufflings/modals/cancel-shuffle-confirm.html',
                title: 'Cacnel Shuffle Confirmation',
                controller: 'CancelShuffleFormController',
                isolatedScope: true,
            },
        ];

        var registerShuffleSteps = [
            {
                templateUrl: 'shufflings/modals/register-shuffle-details.html',
                title: 'Join Shuffle Details',
                controller: 'RegisterShuffleFormController',
                isolatedScope: true,
                data: params,
            },
            {
                templateUrl: 'shufflings/modals/register-shuffle-confirm.html',
                title: 'Join Shuffle Confirmation',
                controller: 'RegisterShuffleFormController',
                isolatedScope: true,
            },
        ];

        var startShuffleSteps = [
            {
                templateUrl: 'shufflings/modals/start-shuffle-details.html',
                title: 'Start Shuffle Details',
                controller: 'StartShuffleFormController',
                isolatedScope: true,
                data: params,
            }
        ];

        var stopShuffleSteps = [
            {
                templateUrl: 'shufflings/modals/stop-shuffle-details.html',
                title: 'Stop Shuffle Details',
                controller: 'StopShuffleFormController',
                isolatedScope: true,
                data: params,
            }
        ];

        $scope.steps = {};

        $scope.steps.createShuffleForm = createShuffleSteps;
        $scope.steps.registerShuffleForm = registerShuffleSteps;
        $scope.steps.startShuffleForm = startShuffleSteps;
        $scope.steps.stopShuffleForm = stopShuffleSteps;
        $scope.steps.cancelShuffleForm = cancelShuffleSteps;

    }]);

angular.module('shufflings').controller('ShufflingParticipantsCtrl',
    ['$scope', 'ShufflingService', 'SessionStorageService', '$state', 'CryptoService', 'loginConfig',
        'AlertService', 'alertConfig', '$validation', '$uibModal', 'FeeService', '$rootScope',
        'CommonsService', 'AssetsService', 'CurrenciesService', 'amountToQuantFilter', 'OptionsService',
        '$uibModalInstance', 'params', 'searchTermFilter', 'shufflingStageFilter', 'DTOptionsBuilder',
        'DTColumnBuilder', '$compile', '$sanitize',
        function ($scope, ShufflingService, SessionStorageService, $state, CryptoService,
                  loginConfig, AlertService, alertConfig, $validation, $uibModal, FeeService,
                  $rootScope, CommonsService, AssetsService, CurrenciesService, amountToQuantFilter, OptionsService,
                  $uibModalInstance, params, searchTermFilter, shufflingStageFilter, DTOptionsBuilder, DTColumnBuilder,
                  $compile, $sanitize) {

            $scope.params = params;

            $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
                                               .withDOM('frtip')
                                               .withOption('info', false)
                                               .withOption('ordering', false)
                                               .withOption('serverSide', true)
                                               .withDataProp('participants')
                                               .withOption('processing', true)
                                               .withOption('ordering', false)
                                               .withOption('bFilter', false)
                                               .withOption('fnRowCallback',
                                                   function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                                       $compile(nRow)($scope);
                                                   })
                                               .withOption('ajax', function (data, callback, settings) {
                                                   var endIndex = data.start + data.length - 1;
                                                   ShufflingService.getShufflingParticipants(params.shufflingId)
                                                                   .then(function (response) {

                                                                       // console.log(response);

                                                                       callback({
                                                                           'iTotalRecords': response.participants.length,
                                                                           'iTotalDisplayRecords': response.participants.length,
                                                                           'participants': response.participants ||
                                                                           []
                                                                       });
                                                                   });
                                               })
                                               .withDisplayLength(10).withBootstrap();

            $scope.dtColumns = [

                DTColumnBuilder.newColumn('state').withTitle('Stage').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return shufflingStageFilter($sanitize(data));
                               }),
                DTColumnBuilder.newColumn('accountRS').withTitle('Assigne').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return searchTermFilter($sanitize(data));
                               }),

            ];

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.$on('close-modal', function () {
                $uibModalInstance.dismiss('cancel');
            });


        }]);

angular.module('shufflings').controller('ShufflingDetailsCtrl',
    ['$scope', 'ShufflingService', 'SessionStorageService', '$state', 'CryptoService', 'loginConfig',
        'AlertService', 'alertConfig', '$validation', '$uibModal', 'FeeService', '$rootScope',
        'CommonsService', 'AssetsService', 'CurrenciesService', 'amountToQuantFilter', 'OptionsService',
        '$uibModalInstance', 'params', 'searchTermFilter', 'shufflingStageFilter', 'DTOptionsBuilder',
        'DTColumnBuilder', '$compile',
        function ($scope, ShufflingService, SessionStorageService, $state, CryptoService,
                  loginConfig, AlertService, alertConfig, $validation, $uibModal, FeeService,
                  $rootScope, CommonsService, AssetsService, CurrenciesService, amountToQuantFilter, OptionsService,
                  $uibModalInstance, params, searchTermFilter, shufflingStageFilter, DTOptionsBuilder, DTColumnBuilder,
                  $compile) {

            $scope.params = params;

            $scope.getShuffleDetails = function (shufflingId) {
                shufflingId = shufflingId || params.shufflingId;
                $scope.shuffleDetailsPromise = ShufflingService.getShuffling(shufflingId).then(function (success) {
                    $scope.shuffle = success;
                }, function (error) {
                    console.log(error);
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.$on('close-modal', function () {
                $uibModalInstance.dismiss('cancel');
            });


        }]);
