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

angular.module('news-viewer',
    ['baseClient', 'crypto', 'ui.router', 'ui.bootstrap', 'multiStepForm', 'node','options']);

angular.module('news-viewer').constant('newsViewerConfig', {
  'newsUrl':'http://199.127.137.169:8889',
  'newsEndPoint': 'api/v1/news',
});
angular.module('news-viewer').config(['RestangularProvider', 'newsViewerConfig', '$stateProvider', '$urlRouterProvider',
    function (RestangularProvider, newsViewerConfig, $stateProvider, $urlRouterProvider) {

        $stateProvider.state('client.signedin.newsviewer', {
            url: '^/newsviewer',
            templateUrl: './extensions/news-viewer/views/main.html',
            abstract: true
        }).state('client.signedin.newsviewer.news', {
            url: '^/newsviewer/news',
            templateUrl: './extensions/news-viewer/views/news.html',
            controller:'NewsViewerMainCtrl'
        });
    }]);
