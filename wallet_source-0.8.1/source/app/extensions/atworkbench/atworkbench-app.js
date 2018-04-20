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

angular.module('atworkbench',
    ['baseClient', 'crypto', 'ui.router', 'ui.bootstrap', 'multiStepForm', 'node','options']);

angular.module('atworkbench').constant('ATWorkbenchConfig', {

});
angular.module('atworkbench').config(['RestangularProvider', 'ATWorkbenchConfig', '$stateProvider', '$urlRouterProvider',
    function (RestangularProvider, ATWorkbenchConfig, $stateProvider, $urlRouterProvider) {

        $stateProvider.state('client.signedin.atworkbench', {
            url: '^/atworkbench',
            templateUrl: './extensions/atworkbench/views/main.html',
            abstract: true
        }).state('client.signedin.atworkbench.start', {
            url: '^/atworkbench/start',
            templateUrl: './extensions/atworkbench/views/start.html',
            controller:'ATWorkbenchMainCtrl'
        });
    }]);
