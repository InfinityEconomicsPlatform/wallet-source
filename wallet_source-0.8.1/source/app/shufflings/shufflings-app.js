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

angular.module('shufflings',
    ['baseClient', 'crypto', 'ui.router', 'ui.bootstrap', 'multiStepForm', 'node', 'assets', 'currencies', 'options']);

angular.module('shufflings').constant('shufflingsConfig', {
    'shufflingEndPoint': 'api',
});

angular.module('shufflings').config(['RestangularProvider', 'shufflingsConfig', '$stateProvider', '$urlRouterProvider',
    function (RestangularProvider, shufflingsConfig, $stateProvider, $urlRouterProvider) {

        RestangularProvider.setRestangularFields({
            options: '_options'
        });

        $stateProvider.state('client.signedin.shufflings', {
            url: '^/shufflings',
            templateUrl: './shufflings/views/main.html',
            abstract: true,
        }).state('client.signedin.shufflings.shufflings', {
            url: '^/shufflings/shufflings',
            templateUrl: './shufflings/views/shufflings.html',
            controller: 'ShufflingsCtrl',
        }).state('client.signedin.shufflings.myshufflings', {
            url: '^/shufflings/myshufflings',
            templateUrl: './shufflings/views/myshufflings.html',
            controller: 'MyShufflingsCtrl',
        });

    }]);
