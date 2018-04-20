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

angular.module('servicemon').service('ServiceMonService', ['Restangular', 'serviceMonConfig', '$q',
    function (Restangular, serviceMonConfig, $q) {

      this.getPeerStatus = function (url, website) {
          if (!website) {
              Restangular.setBaseUrl(url);
              return Restangular.all('').one('').get();
          } else {
              return $q(function (resolve, reject) {
                  var image = new Image();
                  image.src = url;
                  image.onload = function () {
                      resolve(image);
                  };
                  image.onerror = function (e) {
                      reject(e);
                  };
              });
          }

      };

      }]);
