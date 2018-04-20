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

// Priority  - 0 = low  / 5 = medium / 10 = high
// Type      - 0 = news / 1 = announcement / 2 = Voting Result
// section   - 0 = Info / 1 = Feature / 2 = Update / 3 = Security / 4 = Voting / 5 = Improvement / 6 = Alert

angular.module('news-viewer').controller('NewsViewerMainCtrl',
    ['$scope', 'NewsViewerService', 'baseConfig', 'DTOptionsBuilder',
        'DTColumnBuilder', '$interval', '$uibModal', '$compile', 'timestampFilter',
        '$sanitize', '$compile', '$sce', 'CommonsService', 'newsTypeFilter', 'newsSectionFilter', 'newsPriorityFilter',
        function ($scope, NewsViewerService, baseConfig, DTOptionsBuilder,
                  DTColumnBuilder, $interval, $uibModal, $compile, timestampFilter,
                  $sanitize, $compile, $sce, CommonsService, newsTypeFilter, newsSectionFilter, newsPriorityFilter) {

            $scope.channel = 'Foundation';

            $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
                                               .withDOM('frtip')
                                               .withOption('info', false)
                                               .withOption('ordering', false)
                                               .withOption('info', false)
                                               .withOption('serverSide', true)
                                               .withDataProp('news')
                                               .withOption('processing', true)
                                               .withOption('bFilter', false)

                                               .withOption('fnRowCallback',
                                                   function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                                       $compile(nRow)($scope);
                                                   })
                                               .withOption('ajax', function (data, callback, settings) {
                                                   var pageNum = (data.start / data.length) + 1;
                                                   NewsViewerService.getNews(pageNum, data.length)
                                                                    .then(function (response) {

                                                                      // console.log(response);

                                                                      response = CommonsService.sanitizeJson(response);
                                                                      $scope.data = {'news': response};
                                                                        callback({
                                                                            'iTotalRecords': 1000,
                                                                            'iTotalDisplayRecords': 1000,
                                                                            'news': $scope.data.news,
                                                                        });
                                                                    }, function (error) {
                                                                        callback({
                                                                            'iTotalRecords': 0,
                                                                            'iTotalDisplayRecords': 0,
                                                                            'news': []
                                                                        });
                                                                    });

                                               })
                                               .withDisplayLength(10).withBootstrap()
                                               .withOption('rank', [1, 'desc'])
                                               .withOption('rowReordering', true);

            $scope.dtColumns = [

                DTColumnBuilder.newColumn('date').withTitle('Date').notSortable()
                               .renderWith( function (data, type, row, meta) {
                                   return $sanitize(data);
                               }),

               DTColumnBuilder.newColumn('priority').withTitle('Priority').notSortable()
                              .renderWith(function (data, type, row, meta) {
                                  return newsPriorityFilter(data);
                              }),

                DTColumnBuilder.newColumn('title').withTitle('Title').notSortable()
                               .renderWith(  function (data, type, row, meta)  {
                                   return $sanitize(data);
                               }),

                DTColumnBuilder.newColumn('section').withTitle('Section').notSortable()
                               .renderWith( function (data, type, row, meta)  {
                                   return newsSectionFilter(data);
                               } ),

                 DTColumnBuilder.newColumn('_id').withTitle('Action').notSortable()
                                .renderWith(function (data, type, row, meta) {

                                    var but_col_info = 'btn-success';
                                    var tt_info = ' popover-placement="left" popover-trigger="\'mouseenter\'" uib-popover=' +
                                        ' "Read News"';

                                    var info = '<button type="button" class="btn ' + but_col_info + ' btn-xs" + '
                                        + tt_info +
                                        ' ng-controller="NewsViewerMainCtrl"' +
                                        ' ng-click="openReadNewsModal(\'' + meta.row  +
                                        '\')" ng-disabled="' + 'false' +
                                        '"> <i class="fa fa-envelope-open-o" aria-hidden="true" style="width:15px;"></i> </button>';

                                    return info;
                                }),

            ];

            $scope.openReadNewsModal = function (row) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'extensions/news-viewer/modals/read-news-form.html',
                    size: 'lg',
                    controller: 'StepNewsFormCtrl',
                    resolve: {
                        params: function () {
                            return $scope.data.news[row];
                        }
                    }
                });
            };

            $scope.dtInstanceCallback = function (_dtInstance) {
                $scope.dtInstance = _dtInstance;
            };

            $scope.reloadNews = function () {
                if ($scope.dtInstance) {
                    $scope.dtInstance._renderer.rerender();
                }
            };

        }]);

angular.module('news-viewer').controller('StepNewsFormCtrl',
    ['$scope', '$uibModalInstance', 'params', function ($scope, $uibModalInstance, params) {

      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      };

      $scope.$on('close-modal', function () {
          $uibModalInstance.dismiss('cancel');
      });

        var readNewsSteps = [
            {
                templateUrl: 'extensions/news-viewer/modals/read-news-details.html',
                title: 'Read News',
                controller: 'NewsViewerReadCtrl',
                isolatedScope: true,
                data: params
            }
        ];

        $scope.steps = {};

        $scope.steps.readNewsForm = readNewsSteps;

    }]);

angular.module('news-viewer').controller('NewsViewerReadCtrl',
    ['$scope', '$state', '$rootScope', 'CommonsService', 'SessionStorageService',
        'loginConfig', 'NewsViewerService', 'alertConfig', 'AlertService', 'CryptoService',
        function ($scope, $state, $rootScope, CommonsService, SessionStorageService,
                  loginConfig, NewsViewerService, alertConfig, AlertService, CryptoService) {

        $scope.readNews = function () {
          var params = $scope.$getActiveStep().data;
          $scope.params = params;
        };

        $scope.getLatestNews = function (page, results) {
            NewsViewerService.getNews(page, results).then(function (success) {
                $scope.news_content = success;
            }, function (error) {

            })
        }

    }]);
