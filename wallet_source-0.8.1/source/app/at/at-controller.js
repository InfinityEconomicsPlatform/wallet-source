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

angular.module('AT').controller('MainATCtrl',
    ['$scope', 'SubscriptionService', 'amountTQTFilter', 'timestampFilter', 'DTOptionsBuilder', 'DTColumnBuilder',
        '$uibModal', '$compile', 'baseConfig', 'supplyFilter', 'searchTermFilter',
        function ($scope, SubscriptionService, amountTQTFilter, timestampFilter, DTOptionsBuilder, DTColumnBuilder,
                  $uibModal, $compile, baseConfig, supplyFilter, searchTermFilter) {

            $scope.openCreateATModal = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'at/modals/create-at-form.html',
                    size: 'lg',
                    controller: 'ATFormCtrl',
                    resolve: {
                        params: function () {
                            return {};
                        }
                    }
                });
            };

            $scope.openATDetailsModal = function (atId) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'at/modals/at-details.html',
                    size: 'lg',
                    controller: 'ATDetailsCtrl',
                    resolve: {
                        params: function () {
                            return {
                                'at': atId,
                            };
                        }
                    }
                });
            };

        }]);

angular.module('AT').controller('AllATsCtrl',
    ['$scope', 'ATService', 'amountTQTFilter', 'timestampFilter', 'DTOptionsBuilder', 'DTColumnBuilder',
        '$uibModal', '$compile', 'baseConfig', 'supplyFilter', 'searchTermFilter', 'CommonsService',
        'SessionStorageService',
        'txIsValidFilter',
        function ($scope, ATService, amountTQTFilter, timestampFilter, DTOptionsBuilder, DTColumnBuilder,
                  $uibModal, $compile, baseConfig, supplyFilter, searchTermFilter, CommonsService,
                  SessionStorageService, txIsValidFilter) {

            $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
                                               .withDOM('frtip')
                                               .withOption('serverSide', false)
                                               .withDataProp('ats')
                                               .withOption('processing', true)
                                               .withOption('info', false)
                                               .withOption('paging', true)
                                               .withOption('ordering', false)
                                               .withOption('bFilter', false)
                                               .withOption('fnRowCallback',
                                                   function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                                       $compile(nRow)($scope);
                                                   })
                                               .withOption('ajax', function (data, callback, settings) {
                                                   var endIndex = data.start + data.length - 1;
                                                   ATService.getAllATs(data.start, endIndex).then(function (response) {
                                                       callback({
                                                           'iTotalRecords': 1000,
                                                           'iTotalDisplayRecords': 1000,
                                                           'ats': response.ats
                                                       });
                                                   });
                                               })
                                               .withDisplayLength(10).withBootstrap();

            $scope.dtColumns = [

                DTColumnBuilder.newColumn('at').withTitle('AT').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return '<button type="button" class="btn btn-success btn-xs" ng-controller="SearchCtrl"' +
                                       ' ng-click="searchValue(\'' + data + '\')">' +
                                       '<i class="fa fa-list-ul" aria-hidden="true" style="width:15px;"></i>' +
                                       '</button>';

                               }),

                DTColumnBuilder.newColumn('atRS').withTitle('Account').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return searchTermFilter(data);
                               }),

                DTColumnBuilder.newColumn('at').withTitle('Details').notSortable()
                               .renderWith(function (data, type, row, meta) {


                                   var tt_details = ' popover-placement="left" popover-trigger="\'mouseenter\'" uib-popover=' +
                                       ' "AT Details"';

                                   var atDetaills = '<button type="button" class="btn btn-default btn-xs"  ' +
                                       tt_details + ' ng-controller="MainATCtrl"' +
                                       ' ng-click="openATDetailsModal(\'' + data + '\')">' +
                                       ' <i class="fa fa-cog" aria-hidden="true" style="width:15px;"></i> ' +
                                       '</button>';

                                   return atDetaills;


                               }),

                DTColumnBuilder.newColumn('name').withTitle('Name').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return data;
                               }),

                DTColumnBuilder.newColumn('balanceTQT').withTitle('Balance').notSortable()
                               .renderWith(function (data, type, row, meta) {

                                   return amountTQTFilter(data);

                               }),

                DTColumnBuilder.newColumn('minActivation').withTitle('Activation').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return amountTQTFilter(data);
                               }),

                DTColumnBuilder.newColumn('finished').withTitle('Finished').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return txIsValidFilter(data);
                               }),

                DTColumnBuilder.newColumn('frozen').withTitle('Frozen').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return txIsValidFilter(data);
                               }),

                DTColumnBuilder.newColumn('running').withTitle('Running').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return txIsValidFilter(data);
                               }),

                DTColumnBuilder.newColumn('stopped').withTitle('Stopped').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return txIsValidFilter(data);
                               }),

                DTColumnBuilder.newColumn('dead').withTitle('Dead').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return txIsValidFilter(data);
                               }),

                DTColumnBuilder.newColumn('at').withTitle('Action').notSortable()
                               .renderWith(function (data, type, row, meta) {

                                   var runAt = ' popover-placement="left" popover-trigger="\'mouseenter\'" uib-popover=' +
                                       ' "Run AT"';

                                   var sendToken = '<button type="button" class="btn btn-default btn-xs"  ' +
                                       runAt + ' ng-controller="AccountMainCtrl"' +
                                       ' ng-click="openSendTokenModal (\'' + data + '\')">' +
                                       ' <i class="fa fa-cogs" aria-hidden="true" style="width:15px;"></i> ' +
                                       '</button>';

                                   return sendToken;
                               }),

            ];

            $scope.dtInstanceCallback = function (_dtInstance) {
                $scope.dtInstance = _dtInstance;
            };

            $scope.reloadAllATs = function () {
                if ($scope.dtInstance) {
                    $scope.dtInstance._renderer.rerender();
                }
            };

        }]);

angular.module('AT').controller('MyATsCtrl',
    ['$scope', 'ATService', 'amountTQTFilter', 'timestampFilter', 'DTOptionsBuilder', 'DTColumnBuilder',
        '$uibModal', '$compile', 'baseConfig', 'supplyFilter', 'searchTermFilter', 'CommonsService', 'ATService','txIsValidFilter',
        function ($scope, SubscriptionService, amountTQTFilter, timestampFilter, DTOptionsBuilder, DTColumnBuilder,
                  $uibModal, $compile, baseConfig, supplyFilter, searchTermFilter, CommonsService, ATService,txIsValidFilter) {

            $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
                                              .withDOM('frtip')
                                              .withOption('serverSide', false)
                                              .withDataProp('ats')
                                              .withOption('processing', true)
                                              .withOption('info', false)
                                              .withOption('paging', true)
                                              .withOption('ordering', false)
                                              .withOption('bFilter', false)
                                               .withOption('fnRowCallback',
                                                   function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                                       $compile(nRow)($scope);
                                                   })
                                               .withOption('ajax', function (data, callback, settings) {
                                                   var accountId = CommonsService.getAccountDetailsFromSession(
                                                       'accountId');
                                                   ATService.getAccountATs(accountId).then(function (response) {
                                                       callback({
                                                           'iTotalRecords': response.ats.length,
                                                           'iTotalDisplayRecords': response.ats.length,
                                                           'ats': response.ats
                                                       });
                                                   });
                                               })
                                               .withDisplayLength(10).withBootstrap();

            $scope.dtColumns = [

                DTColumnBuilder.newColumn('at').withTitle('AT').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return '<button type="button" class="btn btn-success btn-xs" ng-controller="SearchCtrl"' +
                                       ' ng-click="searchValue(\'' + data + '\')">' +
                                       '<i class="fa fa-list-ul" aria-hidden="true" style="width:15px;"></i>' +
                                       '</button>';


                               }),

                DTColumnBuilder.newColumn('atRS').withTitle('Account').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return searchTermFilter(data);
                               }),

                DTColumnBuilder.newColumn('at').withTitle('Details').notSortable()
                               .renderWith(function (data, type, row, meta) {


                                   var tt_details = ' popover-placement="left" popover-trigger="\'mouseenter\'" uib-popover=' +
                                       ' "AT Details"';

                                   var atDetaills = '<button type="button" class="btn btn-default btn-xs"  ' +
                                       tt_details + ' ng-controller="MainATCtrl"' +
                                       ' ng-click="openATDetailsModal(\'' + data + '\')">' +
                                       ' <i class="fa fa-cog" aria-hidden="true" style="width:15px;"></i> ' +
                                       '</button>';

                                   return atDetaills;


                               }),

                DTColumnBuilder.newColumn('name').withTitle('Name').notSortable()
                               .renderWith(function (data, type, row, meta) {

                                   return data;

                               }),

                DTColumnBuilder.newColumn('balanceTQT').withTitle('Balance').notSortable()
                               .renderWith(function (data, type, row, meta) {

                                   return amountTQTFilter(data);

                               }),

                DTColumnBuilder.newColumn('minActivation').withTitle('Activation').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return amountTQTFilter(data);
                               }),

                DTColumnBuilder.newColumn('finished').withTitle('Finished').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return txIsValidFilter(data);
                               }),

                DTColumnBuilder.newColumn('frozen').withTitle('Frozen').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return txIsValidFilter(data);
                               }),

                DTColumnBuilder.newColumn('running').withTitle('Running').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return txIsValidFilter(data);
                               }),

                DTColumnBuilder.newColumn('stopped').withTitle('Stopped').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return txIsValidFilter(data);
                               }),

                DTColumnBuilder.newColumn('dead').withTitle('Dead').notSortable()
                               .renderWith(function (data, type, row, meta) {
                                   return txIsValidFilter(data);
                               }),

                DTColumnBuilder.newColumn('at').withTitle('Action').notSortable()
                               .renderWith(function (data, type, row, meta) {

                                   var runAt = ' popover-placement="left" popover-trigger="\'mouseenter\'" uib-popover=' +
                                       ' "Run AT"';

                                   var sendToken = '<button type="button" class="btn btn-default btn-xs"  ' +
                                       runAt + ' ng-controller="AccountMainCtrl"' +
                                       ' ng-click="openSendTokenModal (\'' + data + '\')">' +
                                       ' <i class="fa fa-cogs" aria-hidden="true" style="width:15px;"></i> ' +
                                       '</button>';

                                   return sendToken;
                               }),


            ];

            $scope.dtInstanceCallback = function (_dtInstance) {
                $scope.dtInstance = _dtInstance;
            };
            $scope.reloadAllATs = function () {
                if ($scope.dtInstance) {
                    $scope.dtInstance._renderer.rerender();
                }
            };


        }]);

angular.module('AT').controller('ATDetailsCtrl', ['$scope', 'ATService', 'params', '$uibModalInstance',
    function ($scope, ATService, params, $uibModalInstance) {

        $scope.initATDetails = function () {
            ATService.getAT(params.at).then(function (success) {
                $scope.atDetails = success;
            }, function (error) {
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);

angular.module('AT').controller('ATFormCtrl',
    ['$scope', '$uibModalInstance', 'params', function ($scope, $uibModalInstance, params) {

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.$on('close-modal', function () {
            $uibModalInstance.dismiss('cancel');
        });

        var createATSteps = [
            {
                templateUrl: 'at/modals/create-at-details.html',
                title: 'Create AT Step 1',
                controller: 'CreateATFormController',
                isolatedScope: true,
                data: params,
            },
            {
                templateUrl: 'at/modals/create-at-details-2.html',
                title: 'Create AT Step 2',
                controller: 'CreateATFormController',
                isolatedScope: true,
                data: params,
            },

            {
                templateUrl: 'at/modals/create-at-confirm.html',
                title: 'Create AT Confirmation',
                controller: 'CreateATFormController',
                isolatedScope: true,
            },
        ];

        $scope.steps = {};

        $scope.steps.createATForm = createATSteps;

    }]);
