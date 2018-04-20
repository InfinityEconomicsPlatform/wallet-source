angular.module('account')
       .directive('activationDirective', ['AccountService', 'TransactionService', '$q', '$compile',
           function (AccountService, TransactionService, $q, $compile) {

               function link(scope, element, attrs) {

                   getActivationAndCurrentHeights(attrs.name, element);

                   function getActivationAndCurrentHeights(name, element) {
                       var heightPromise = TransactionService.getBlockChainStatus();
                       var activationHeightPromise = AccountService.getActivationHeights(name);
                       $q.all([heightPromise, activationHeightPromise]).then(function (response) {
                           var currentHeight = response[0].numberOfBlocks;
                           var activationHeight = response[1][name] || Number.MAX_VALUE;
                           scope.activationHeight = activationHeight;
                           scope.currentHeight = currentHeight;
                           // scope.activationHeight = 0;
                           // scope.currentHeight = Number.MAX_VALUE;
                       }, function (error) {
                           scope.activationHeight = 0;
                           scope.currentHeight = Number.MAX_VALUE;
                       }).finally(function () {
                           disableElement(element);
                       });
                   }

                   function disableElement(element) {
                       var isElementDisabled = (attrs.height || scope.activationHeight) > scope.currentHeight;
                       element.attr('disabled', isElementDisabled);
                       if (isElementDisabled) {
                           element.addClass('disabled');
                       }
                       $compile(element.contents())(scope);
                   }
               }


               return {
                   link: link
               };

           }]);

