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

 angular.module('AT',
     ['baseClient', 'crypto', 'ui.router', 'ui.bootstrap', 'multiStepForm', 'node', 'options']);

 angular.module('AT').constant('ATConfig', {
     'ATEndPoint': 'api',
 });

 angular.module('AT').config(['RestangularProvider', 'ATConfig', '$stateProvider', '$urlRouterProvider',
     function (RestangularProvider, ATConfig, $stateProvider, $urlRouterProvider) {

         RestangularProvider.setRestangularFields({
             options: '_options'
         });

         $stateProvider.state('client.signedin.at', {
             url: '^/at',
             templateUrl: './at/views/main.html',
             abstract: true,
         }).state('client.signedin.at.allats', {
             url: '^/at/allats',
             templateUrl: './at/views/allats.html',
             controller: 'AllATsCtrl',
         }).state('client.signedin.at.myats', {
             url: '^/at/myats',
             templateUrl: './at/views/myats.html',
             controller: 'MyATsCtrl',
         });

     }]);
