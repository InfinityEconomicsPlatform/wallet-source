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

angular.module('servicemon').controller('ServiceStatusCtrl',
    ['$scope', 'ServiceMonService', 'ServicePeerEndpoints', 'ServiceMacapEndpoints','ServiceWebsiteEndpoints', 'ServiceTestnetEndpoints', 'ServiceApiEndpoints' , 'isOnlineFilter', '$sce',
        function ($scope, ServiceMonService, ServicePeerEndpoints, ServiceMacapEndpoints,ServiceWebsiteEndpoints, ServiceTestnetEndpoints, ServiceApiEndpoints, isOnlineFilter, $sce) {

            $scope.peerEndpoints = ServicePeerEndpoints;
            $scope.macapEndpoints = ServiceMacapEndpoints;
            $scope.websiteEndpoints = ServiceWebsiteEndpoints;
            $scope.testnetEndpoints = ServiceTestnetEndpoints;
            $scope.apiEndpoints = ServiceApiEndpoints;

            $scope.trustAsHtml = $sce.trustAsHtml;

            $scope.IP_STATUS = {};

            $scope.getAllIpStatus = function (ipArray,website) {

                angular.forEach(ipArray, function (value, key) {
                    ServiceMonService.getPeerStatus(value.url,website).then(function (success) {
                        //console.log(success);
                        $scope.IP_STATUS[value.url] = $scope.IP_STATUS[value.url] || {};
                        $scope.IP_STATUS[value.url].status = '<span class="label label-success">ONLINE</span>';
                        $scope.IP_STATUS[value.url].timestamp = new Date().toString();
                    }, function (error) {
                        //console.log(error);
                        $scope.IP_STATUS[value.url] = $scope.IP_STATUS[value] || {};
                        $scope.IP_STATUS[value.url].status = '<span class="label label-warning">OFFLINE</span>';
                        $scope.IP_STATUS[value.url].timestamp = new Date().toString();
                    });
                });
            };

            $scope.getStatus = function (check, website) {

                var url = check.url;
                $scope.IP_STATUS[url] = {};
                return ServiceMonService.getPeerStatus(url,website).then(function (success) {
                    $scope.IP_STATUS[url] = $scope.IP_STATUS[url] || {};
                    $scope.IP_STATUS[url].status = '<span class="label label-success">ONLINE</span>';
                    $scope.IP_STATUS[url].timestamp = new Date().toString();
                }, function (error) {
                    $scope.IP_STATUS[url] = $scope.IP_STATUS[url] || {};
                    $scope.IP_STATUS[url].status = '<span class="label label-warning">OFFLINE</span>';
                    $scope.IP_STATUS[url].timestamp = new Date().toString();
                });
            };

        }]);
