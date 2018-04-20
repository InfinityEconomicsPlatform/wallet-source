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

angular.module('baseClient').filter('timestamp', ['$sce', 'moment', 'baseConfig', function ($sce, moment, baseConfig) {
    return function (val) {
        try {
            var actual = val + baseConfig.EPOCH;
            var momentObj = moment.unix(actual);
            return momentObj.format('YYYY-MM-DDTHH:mm:ss');
        } catch (e) {
            return val;
        }
    };
}]);

angular.module('baseClient').filter('amountTQT', ['$sce', 'baseConfig', function ($sce, baseConfig) {
    return function (val) {
        if (!val) {
            val = 0;
        }
        var amount = val / baseConfig.TOKEN_QUANTS;
        return amount.toLocaleString('en-US', {minimumFractionDigits: 2});
    };
}]);

angular.module('baseClient').filter('amountToDecimal', ['$sce', 'baseConfig', function ($sce, baseConfig) {
    return function (val, numOfDecimals) {
        if (!val) {
            val = 0;
        }
        val = val * Math.pow(10, numOfDecimals);
        return val.toLocaleString('en-US', {minimumFractionDigits: numOfDecimals});
    };
}]);

angular.module('baseClient').filter('numericalString', ['$sce', 'baseConfig', function ($sce, baseConfig) {
    return function (val) {
        if (!val) {
            val = 0;
        }
        return val.toLocaleString('en-US', {minimumFractionDigits: 2});
    };
}]);

angular.module('baseClient').filter('amountToQuant', ['$sce', 'baseConfig', function ($sce, baseConfig) {
    return function (val) {
        if (!val) {
            val = 0;
        }

        var amount = parseInt(parseFloat(val) * baseConfig.TOKEN_QUANTS);

        return amount;
    };
}]);

angular.module('baseClient').filter('quantToAmount', ['$sce', 'baseConfig', function ($sce, baseConfig) {
    return function (val) {
        if (!val) {
            val = 0;
        }
        var amount = parseFloat(val) / baseConfig.TOKEN_QUANTS;
        return amount;
    };
}]);

angular.module('baseClient').filter('fiatUSD', ['$sce', 'baseConfig', function ($sce, baseConfig) {
    return function (val) {
        if (!val) {
            val = 0;
        }
        val = (val ) * 0.0000;
        return val;
    };
}]);

angular.module('baseClient').filter('amountTKN', ['$sce', function ($sce) {
    return function (val) {
        if (!val) {
            val = 0;
        }
        var amount = parseFloat(val);
        return amount.toLocaleString('en-US', {minimumFractionDigits: 2});
    };
}]);

angular.module('baseClient').filter('supply', ['$sce', function ($sce) {
    return function (val, numOfDecimals) {
        var actualPow = numOfDecimals;
        var divider = Math.pow(10, actualPow);
        val = val / divider;
        return val.toLocaleString('en-US', {minimumFractionDigits: 2});
    };
}]);

angular.module('baseClient').filter('quantityToShare', ['$sce', function ($sce) {
    return function (val, numOfDecimals) {
        var actualPow = numOfDecimals;
        var divider = Math.pow(10, actualPow);
        val = parseFloat(val) / divider;
        return val;
    };
}]);

angular.module('baseClient').filter('shareToQuantiy', ['$sce', function ($sce) {
    return function (val, numOfDecimals) {
        var actualPow = numOfDecimals;
        var multiplier = Math.pow(10, actualPow);
        val = parseFloat(val) * multiplier;
        return val;
    };
}]);

angular.module('baseClient').filter('decimals', ['$sce', function ($sce) {
    return function (val, numOfDecimals) {
        var divider = Math.pow(10, numOfDecimals);
        val = val / divider;
        return val.toLocaleString('en-US', {minimumFractionDigits: 2});
    };
}]);

angular.module('baseClient').filter('numberString', ['$sce', function ($sce) {
    return function (val, numOfDecimals) {
        numOfDecimals = numOfDecimals || 2;
        return val.toLocaleString('en-US',
            {maximumFractionDigits: numOfDecimals, minimumFractionDigits: numOfDecimals});
    };
}]);

angular.module('baseClient').filter('transactionConf', ['$sce', function ($sce) {
    return function (value) {
        if (!value) {
            value = 0;
        }
        if (value === 0) {

            return '<span class="label label-default">' + value + '</span>';

        } else if (value > 0 && value < 10) {

            return '<span class="label label-danger">' + value + '</span>';

        } else if (value >= 10 && value < 100) {

            return '<span class="label label-warning">' + value + '</span>';

        } else if (value >= 100 && value < 720) {

            return '<span class="label label-success">' + value + '</span>';

        } else if (value >= 720) {

            return '<span class="label label-success"> +720</span>';

        } else {

            return '<span class="label label-primary">' + value + '</span>';

        }
    };
}]);

angular.module('baseClient').filter('transactionType', ['$sce', function ($sce) {
    return function (type, subType) {

        switch (type) {
            case 0:
                return '<i class="fa fa-usd" aria-hidden="true"></i>';
            case 1:
                return '<i class="fa fa-envelope" aria-hidden="true"></i>';
            case 2:
                return '<span class="glyphicon glyphicon-signal" aria-hidden="true"></span>';
            case 4:
                return '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>';
            case 5:
                return ' <i class="fa fa-random" aria-hidden="true"></i> ';
            case 7:
                return '<i class="fa fa-users" aria-hidden="true"></i>';



            // needs completion


        }
    };

}]);

angular.module('baseClient').filter('transactionIconSubType', ['$sce', function ($sce) {
    return function (type, subType) {

        switch (type) {
            case 0:
                switch (subType) {
                    case 0:
                        return '<i class="fa fa-usd" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Ordinary Payment"></i>';
                    default:
                        return subType;
                }
                break;
            case 1:
                switch (subType) {
                    case 0:
                        return '<i class="fa fa-envelope-o" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Encrypted Message"></i>';
                    case 1:
                        return '<i class="fa fa-share-alt" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Alias Assigment"></i>';
                    case 2:
                        return '<i class="fa fa-signal" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Poll Creation"></i>';
                    case 3:
                        return '<i class="fa fa-signal" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Vote Casting"></i>';
                    case 4:
                        return '<i class="fa fa-credit-card" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Hub Announcement"></i>';
                    case 5:
                        return '<i class="fa fa-credit-card" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Account Info"></i>';
                    case 6:
                        return '<i class="fa fa-share-alt" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Alias Sell"></i>';
                    case 7:
                        return '<i class="fa fa-share-alt" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Alias Buy"></i>';
                    case 8:
                        return '<i class="fa fa-share-alt" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Alias Delete"></i>';
                    case 9:
                        return '<i class="fa fa-signal" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Phasing Vote Casting"></i>';
                    case 10:
                        return '<i class="fa fa-credit-card" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Account Property"></i>';
                    case 11:
                        return '<i class="fa fa-credit-card" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Account Property delete"></i>';
                    default:
                        return subType;
                }
                break;
            case 2:
                switch (subType) {
                    case 0:
                        return '<i class="fa fa-bar-chart" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Asset Issuance"></i>';
                    case 1:
                        return '<i class="fa fa-bar-chart" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Asset Transfer"></i>';
                    case 2:
                        return '<i class="fa fa-bar-chart" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Ask Order Placement"></i>';
                    case 3:
                        return '<i class="fa fa-bar-chart" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Bid Order Placement"></i>';
                    case 4:
                        return '<i class="fa fa-bar-chart" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Ask Order Cancellation"></i>';
                    case 5:
                        return '<i class="fa fa-bar-chart" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Bid Order Cancellation"></i>';
                    case 6:
                        return '<i class="fa fa-bar-chart" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Dividend Payment"></i>';
                    case 7:
                        return '<i class="fa fa-bar-chart" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Shares Delete"></i>';
                    case 8:
                        return '<i class="fa fa-bar-chart" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Asset Delete"></i>';
                    default:
                        return subType;
                }
                break;
            case 4:
                switch (subType) {
                    case 0:
                        return '<i class="fa fa-credit-card" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Effective Balance Lease"></i>';
                    case 1:
                        return '<i class="fa fa-credit-card" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Account Control"></i>';
                    default:
                        return subType;
                }
                break;
            case 5:
                switch (subType) {
                    case 0:
                        return '<i class="fa fa-random" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Currency Issuance"></i>';
                    case 1:
                        return '<i class="fa fa-random" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Reserve Increase"></i>';
                    case 2:
                        return '<i class="fa fa-random" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Resverve Claim"></i>';
                    case 3:
                        return '<i class="fa fa-random" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Currency Transfer"></i>';
                    case 4:
                        return '<i class="fa fa-random" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Publish Exchange Offer"></i>';
                    case 5:
                        return '<i class="fa fa-random" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Exchange Buy"></i>';
                    case 6:
                        return '<i class="fa fa-random" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Exchange Sell"></i>';
                    case 7:
                        return '<i class="fa fa-random" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Currency Minting"></i>';
                    case 8:
                        return '<i class="fa fa-random" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Currency Deletion"></i>';
                    default:
                        return subType;
                }
                break;

            case 7:
                switch (subType) {
                    case 0:
                        return '<i class="fa fa-user-secret" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Shuffling Creation"></i>';
                    case 1:
                        return '<i class="fa fa-user-secret" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Shuffling Register"></i>';
                    case 2:
                        return '<i class="fa fa-user-secret" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Shuffling Processing"></i>';
                    case 3:
                        return '<i class="fa fa-user-secret" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Shuffling Recipients"></i>';
                    case 4:
                        return '<i class="fa fa-user-secret" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Shuffling Verification"></i>';
                    case 5:
                        return '<i class="fa fa-user-secret" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Shuffling Cancel"></i>';
                    default:
                        return subType;
                }
                break;

            case 21:
                switch (subType) {
                    case 0:
                        return '<i class="fa fa-handshake-o" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Escrow Creation"></i>';
                    case 1:
                        return '<i class="fa fa-handshake-o" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Escrow Sign"></i>';
                    case 2:
                        return '<i class="fa fa-handshake-o" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Escrow Results"></i>';
                    case 3:
                        return '<i class="fa fa-hourglass" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Subscription Creation"></i>';
                    case 4:
                        return '<i class="fa fa-hourglass-o" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Subscription Cancel"></i>';
                    case 5:
                        return '<i class="fa fa-hourglass-half" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Subscription Payment"></i>';
                    default:
                        return subType;
                }
                break;


            case 22:
                switch (subType) {
                    case 0:
                        return '<i class="fa fa-cogs" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="AT Creation"></i>';
                    case 1:
                        return '<i class="fa fa-cogs" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="AT Payment"></i>';
                    default:
                        return subType;
                }
                break;


            default:
                return subType;
        }
    };
}]);

angular.module('baseClient').filter('transactionTextSubType', ['$sce', function ($sce) {
    return function (type, subType) {

        switch (type) {
            case 0:
                switch (subType) {
                    case 0:
                        return 'Ordinary Payment';
                    default:
                        return subType;
                }
                break;
            case 1:
                switch (subType) {
                    case 0:
                        return 'Arbitary Message';
                    case 1:
                        return 'Alias Assignment';
                    case 2:
                        return 'Poll Creation';
                    case 3:
                        return 'Vote Casting';
                    case 4:
                        return 'Hub Announcement';
                    case 5:
                        return 'Account Info';
                    case 6:
                        return 'Alias Sell';
                    case 7:
                        return 'Alias Buy';
                    case 8:
                        return 'Alias Delete';
                    case 9:
                        return 'Phasing Vote Casting';
                    case 10:
                        return 'Account Property';
                    case 11:
                        return 'Account Property delete';
                    default:
                        return subType;
                }
                break;
            case 2:
                switch (subType) {
                    case 0:
                        return 'Asset Issuance';
                    case 1:
                        return 'Asset Transfer';
                    case 2:
                        return 'Ask Order Placement';
                    case 3:
                        return 'Bid Order Placement';
                    case 4:
                        return 'Ask Order Cancellation';
                    case 5:
                        return 'Bid Order Cancellation';
                    case 6:
                        return 'Dividend Payment';
                    case 7:
                        return 'Asset Delete';
                    default:
                        return subType;
                }
                break;

            case 4:
                switch (subType) {
                    case 0:
                        return 'Effective Balance Lease';
                    case 1:
                        return 'Phasing Only';
                    default:
                        return subType;
                }
                break;
            case 5:
                switch (subType) {
                    case 0:
                        return 'Currency Issuance';
                    case 1:
                        return 'Reserve Increase';
                    case 2:
                        return 'Resverve Claim';
                    case 3:
                        return 'Currency Transfer';
                    case 4:
                        return 'Publish Exchange Offer';
                    case 5:
                        return 'Exchange Buy';
                    case 6:
                        return 'Exchange Sell';
                    case 7:
                        return 'Currency Minting';
                    case 8:
                        return 'Currency Deletion';
                    default:
                        return subType;
                }
                break;

            case 7:
                switch (subType) {
                    case 0:
                        return 'Shuffling Creation';
                    case 1:
                        return 'Shuffling Registration';
                    case 2:
                        return 'Shuffling Processing';
                    case 3:
                        return 'Shuffling Recipients';
                    case 4:
                        return 'Shuffling Verification';
                    case 5:
                        return 'Shuffling Cancel';
                    default:
                        return subType;
                }
                break;

            case 21:
                switch (subType) {
                    case 0:
                        return 'Escrow Creation';
                    case 1:
                        return 'Escrow Sign';
                    case 2:
                        return 'Escrow Results';
                    case 3:
                        return 'Subscription Creation';
                    case 4:
                        return 'Subscription Cancel';
                    case 5:
                        return 'Subscription Payment';
                    default:
                        return subType;
                }
                break;

            case 22:
                switch (subType) {
                    case 0:
                        return 'AT Creation';
                    case 1:
                        return 'AT Payment';
                    default:
                        return subType;
                }
                break;

            default:
                return subType;
        }
    };
}]);

angular.module('baseClient').filter('blockTransactions', ['$sce', function ($sce) {
    return function (value) {
        if (value === 0) {
            return '<span class="label label-default">' + value + '</span>';
        } else if (value > 0 && value < 100) {
            return '<span class="label label-success">' + value + '</span>';
        } else if (value >= 100 && value < 200) {
            return '<span class="label label-warning">' + value + '</span>';
        } else if (value >= 200) {
            return '<span class="label label-danger">' + value + '</span>';
        }
    };
}]);

angular.module('baseClient').filter('isEmpty', ['$sce', function ($sce) {
    return function (val) {
        if (val === undefined || val === '') {
            return 'No Data Available';
        } else {
            return val;
        }
    };
}]);

angular.module('baseClient').filter('notSet', ['$sce', function ($sce) {
    return function (val) {
        if (val === undefined || val === '') {
            return 'Not set';
        } else {
            return val;
        }
    };
}]);

angular.module('baseClient').filter('noOutbound', ['$sce', function ($sce) {
    return function (val) {
        if (val === undefined || val === '') {
            return 'No public key available, no outbound transaction made.';
        } else {
            return val;
        }
    };
}]);

angular.module('baseClient').filter('searchTerm', ['$sce', function ($sce) {
    return function (val) {
        if (val) {
            return '<a href="" ng-controller="SearchCtrl" ng-click="searchValue(\'' + val +
                '\')">' + val + '</a>';
        } else {
            return '';
        }

    };
}]);

angular.module('baseClient').directive('compile', ['$compile', function ($compile) {
    return function (scope, element, attrs) {
        scope.$watch(
            function (scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function (value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}]);

angular.module('baseClient').directive('dynamic', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function (html) {
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
}]);

angular.module('baseClient').filter('currencyModel', ['$sce', function ($sce) {
    return function (val) {
        switch (val) {
            case 1:
                return 'Exchangeable';
            case 8:
                return 'Claimable';
            case 16:
                return 'Mintable';
            case 2:
                return 'Controllable';
            case 4:
                return 'Reservable';
            case 32:
                return 'Non Shuffleable';
            default:
                return val;
        }
    };
}]);

angular.module('baseClient').filter('range', function () {
    return function (input, total) {
        total = parseInt(total);

        for (var i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    };
});

angular.module('baseClient').filter('JSONStringify', ['$sce', function ($sce) {
    return function (data) {

        return JSON.stringify(data);

    };
}]);

angular.module('baseClient').filter('isEnabled', ['$sce', function ($sce) {
    return function (val) {
        switch (val) {
            case true:
                return '</small> <i class="fa fa-check" aria-hidden="true"></i></small>';
            case false:
                return '</small> <i class="fa fa-times" aria-hidden="true"></i></small>';
            default:
                return '</small> <i class="fa fa-times" aria-hidden="true"></i> </small>';
        }
    };
}]);

angular.module('baseClient').filter('isMessage', ['$sce', function ($sce) {
    return function (type, subType) {

        if (type === 1 && subType === 0) {
            return '</small> <i class="fa fa-check" aria-hidden="true"></i> </small>';
        } else {
            return '</small> <i class="fa fa-times" aria-hidden="true"></i> </small>';
        }

    };
}]);

angular.module('baseClient').filter('isMultisig', ['$sce', function ($sce) {
    return function (type, subType) {

        if (type === 1 && subType === 0) {
            return '</small> <i class="fa fa-check" aria-hidden="true"></i> </small>';
        } else {
            return '</small> <i class="fa fa-times" aria-hidden="true"></i> </small>';
        }

    };
}]);

angular.module('baseClient').filter('hasMessage', ['$sce', function ($sce) {
    return function (row, account) {
        if (row.attachment.encryptedMessage) {
            if (account === row.senderRS) {
                return ' <i class="fa fa-upload" aria-hidden="true" style="color: black;"></i> ';
            } else if (account === row.recipientRS) {
                return '<i class="fa fa-download" aria-hidden="true" style="color:black;"></i>';
            } else {
                return '</small> <i class="fa fa-check" aria-hidden="true"></i> </small>';
            }
        } else {
            return '</small> <i class="fa fa-times" aria-hidden="true"></i> </small>';
        }

    };
}]);

angular.module('baseClient').filter('hasMessageDirection', ['$sce', function ($sce) {
    return function (row, account) {
        if (account === row.senderRS) {
            return ' <i class="fa fa-upload" aria-hidden="true" style="color:back;"></i> ';
        } else {
            return '<i class="fa fa-download" aria-hidden="true" style="color:back;"></i>';
        }
    };
}]);

angular.module('baseClient').filter('controlModel', ['$sce', function ($sce) {
    return function (val) {

        val = parseInt(val);

        switch (val) {
            case 0:
                return 'Account';
            case 1:
                return 'Balance';
            case 2:
                return 'Asset';
            case 3:
                return 'Currency';
            default:
                return val;
        }
    };
}]);

angular.module('baseClient').filter('votingModel', ['$sce', function ($sce) {
    return function (val) {

        val = parseInt(val);

        switch (val) {
            case 0:
                return 'Account';
            case 1:
                return 'Balance';
            case 2:
                return 'Asset';
            case 3:
                return 'Currency';
            default:
                return val;
        }
    };
}]);

angular.module('baseClient').filter('shufflingStage', ['$sce', function ($sce) {
    return function (val) {

        val = parseInt(val);

        switch (val) {
            case 0:
                return 'Registration';
            case 1:
                return 'Processing';
            case 2:
                return 'Verification';
            case 3:
                return 'Blame';
            case 4:
                return 'Cancelled';
            case 5:
                return 'Done';
            default:
                return val;
        }
    };
}]);

angular.module('baseClient').filter('holdingType', ['$sce', function ($sce) {
    return function (val) {

        val = parseInt(val);

        switch (val) {
            case 0:
                return 'XIN';
            case 1:
                return 'Asset';
            case 2:
                return 'Currency';
            default:
                return val;
        }
    };
}]);

angular.module('baseClient').filter('votingModelLabel', ['$sce', function ($sce) {
    return function (val) {

        val = parseInt(val);

        switch (val) {
            case 0:
                return '<i class="fa fa-user-o" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Account"></i>'; // Account
            case 1:
                return '<i class="fa fa-credit-card" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Balance"></i>'; // 'Balance';
            case 2:
                return '<i class="fa fa-bar-chart" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Asset"></i>'; // 'Asset';
            case 3:
                return '<i class="fa fa-random" aria-hidden="true" popover-placement="top" popover-trigger="\'mouseenter\'" uib-popover="Currency"></i>'; //'Currency';
            default:
                return val;
        }
    };
}]);

angular.module('baseClient').filter('buysell', ['$sce', function ($sce) {
    return function (val) {
        switch (val) {
            case 'buy':
                return '<span class="label label-success">B</span>';
            case 'sell':
                return '<span class="label label-danger">S</span>';
            default:
                return '<span class="label label-default">U</span>';
        }
    };
}]);

angular.module('baseClient').filter('txIsValid', ['$sce', function ($sce) {
    return function (val) {
        switch (val) {
            case true:
                return '</small> <i class="fa fa-check" aria-hidden="true" style="color:green"></i></small>';
            case false:
                return '</small> <i class="fa fa-times" aria-hidden="true" style="color:red"></i></small>';
            default:
                return '</small> <i class="fa fa-times" aria-hidden="true" style="color:red"></i> </small>';
        }
    };
}]);

angular.module('baseClient').filter('isService', ['$sce', function ($sce) {
    return function (val) {
        if (val === undefined || val === '') {
            return 'Service';
        } else {
            return val;
        }
    };
}]);

angular.module('baseClient').filter('isSync', ['$sce', function ($sce) {
    return function (val) {
        switch (val) {
            case true:
                return 'NO';
            case false:
                return 'Yes';
            default:
                return 'NO';
        }
    };
}]);

angular.module('baseClient').filter('replaceQuotes', ['$sce', function ($sce) {
    return function (val) {
        return val.replace(/("|')/g, "");
    };
}]);

angular.module('baseClient').filter('txDirection', ['$sce', function ($sce) {
    return function (account, row) {
        if (account === row.senderRS) {
            return ' <i class="fa fa-chevron-circle-up" aria-hidden="true" style="color:red;"></i> ';
        } else {
            return '<i class="fa fa-chevron-circle-down" aria-hidden="true" style="color:green;"></i>';
        }
    };
}]);

angular.module('baseClient').filter('pollDays', ['$sce', function ($sce) {
    return function (value) {
        if (!value) {
            value = 0;
        }
        if (value <= 0) {

            return '<span class="label label-default" style="width:50px;">' + value + '</span>';

        } else if (value > 0 && value < 3) {

            return '<span class="label label-danger" style="width:50%;">' + value + '</span>';

        } else if (value >= 3 && value < 7) {

            return '<span class="label label-warning" style="width:50px;">' + value + '</span>';

        } else if (value >= 7) {

            return '<span class="label label-success" style="width:50px;">' + value + '</span>';

        } else {

            return '<span class="label label-primary" style="width:50px;">' + value + '</span>';

        }
    };
}]);

angular.module('baseClient').filter('upDown', ['$sce', function ($sce) {
    return function (value) {
        if (!value) {
            value = 0;
        }
        if (value === 0) {
            return '<span class="label label-default" >' + value + '</span>';
        } else if (value > 0) {
            return '<span class="label label-success" >' + value + '</span>';
        } else if (value < 0) {
            return '<span class="label label-danger"  >' + value + '</span>';
        } else {
            return '<span class="label label-primary" >' + value + '</span>';
        }
    };
}]);


angular.module('baseClient').filter('newsType', ['$sce', function ($sce) {
    return function (value) {

        if (!value) {
            value = 0;
        }

        value = parseInt(value);

        if (value === 0) {
            return '<span class="label label-info"> News </span>';
        } else if (value === 1) {
            return '<span class="label label-warning"> Announcement </span>';
        } else if (value === 2) {
            return '<span class="label label-danger"> Voting Result </span>';
        } else {

            return '<span class="label label-default"> News </span>';

        }
    };
}]);

// Priority  - 0 = low  / 5 = medium / 10 = high
// Type      - 0 = news / 1 = announcement / 2 = Voting Result
// section   - 0 = Info / 1 = Feature / 2 = Update / 3 = Security / 4 = Voting / 5 = Improvement / 6 = Alert

angular.module('baseClient').filter('newsSection', ['$sce', function ($sce) {
    return function (value) {

        if (!value) {
            value = 0;
        }
        value = parseInt(value);

        if (value === 0) {
            return '<span class="label label-info"> Info </span>';
        } else if (value === 1) {
            return '<span class="label label-success"> Feature </span>';
        } else if (value === 2) {
            return '<span class="label label-success"> Update </span>';
        } else if (value === 3) {
            return '<span class="label label-warning"> Security </span>';
        } else if (value === 4) {
            return '<span class="label label-warning"> Voting </span>';
        } else if (value === 5) {
            return '<span class="label label-info"> Improvement </span>';
        } else if (value === 6) {
            return '<span class="label label-danger"> Alert </span>';
        } else {
            return '<span class="label label-info"> Info </span>';
        }
    };
}]);

angular.module('baseClient').filter('newsPriority', ['$sce', function ($sce) {
    return function (value) {

        if (!value) {
            value = 0;
        }
        value = parseInt(value);

        if (value === 0) {
            return '<span class="label label-default"> Low </span>';
        } else if (value === 5) {
            return '<span class="label label-warning"> medium </span>';
        } else if (value === 10) {
            return '<span class="label label-danger"> High </span>';
        } else {
            return '<span class="label label-default"> Low </span>';
        }
    };
}]);

angular.module('baseClient').filter('isOnline', ['$sce', function ($sce) {
    return function (val) {
        switch (val) {
            case true:
                return '<small> <span class="glyphicon glyphicon-ok" style="color:green"></span> </small>';
            case false:
                return '<small> <span class="glyphicon glyphicon-remove" style="color:red"></span> </small>';
            default:
                return '<small> <span class="glyphicon glyphicon-remove" style="color:black"></span> </small>';
        }
    };
}]);

angular.module('baseClient').filter('ledgerHolding', ['$sce', function ($sce) {
    return function (data) {
        if (data === 'UNCONFIRMED_XIN_BALANCE') {
            return ' Unconfirmed Balance ';
        } else if (data === 'XIN_BALANCE') {
            return ' Confirmed Balance ';
        } else if (data === 'UNCONFIRMED_ASSET_BALANCE') {
          return ' Unconfirmed Asssets ';
        } else if (data === 'ASSET_BALANCE') {
          return ' Asset Balance ';
        } else if (data === 'UNCONFIRMED_CURRENCY_BALANCE') {
          return ' Unconfirmed Currencies ';
        } else if (data === 'CURRENCY_BALANCE') {
          return ' Currency Balance ';
        } else {
            return 'Unknown Holding';
        }
    };
}]);

angular.module('baseClient').filter('ledgerTXTypes', ['$sce', function ($sce) {
    return function (data) {
        if (data === 'BLOCK_GENERATED') {
            return ' Block Generated';
        } else if (data === 'REJECT_PHASED_TRANSACTION') {
            return 'Rejected Phased Transaction';
        } else if (data === 'TRANSACTION_FEE') {
          return 'Transaction Fee';
        } else if (data === 'ORDINARY_PAYMENT') {
          return 'Ordinary Payment';
        } else if (data === 'ACCOUNT_INFO') {
          return 'Account Info';
        } else if (data === 'ALIAS_ASSIGNMENT') {
          return 'Alias Assignment';
        } else if (data === 'ALIAS_BUY') {
          return 'Alias Buy';
        } else if (data === 'ALIAS_DELETE') {
          return 'Alias Delete';
        } else if (data === 'ALIAS_SELL') {
          return 'Alias Sell';
        } else if (data === 'ARBITRARY_MESSAGE') {
          return 'Message';
        } else if (data === 'HUB_ANNOUNCEMENT') {
          return 'Hub Announcement';
        } else if (data === 'PHASING_VOTE_CASTING') {
          return 'Phased Vote Casting';
        } else if (data === 'POLL_CREATION') {
          return 'Poll Creation';
        } else if (data === 'VOTE_CASTING') {
          return 'Vote Casting';
        } else if (data === 'ACCOUNT_PROPERTY') {
          return 'Account Property';
        } else if (data === 'ACCOUNT_PROPERTY_DELETE') {
          return 'Account Property Delete';
        } else if (data === 'ASSET_ASK_ORDER_CANCELLATION') {
          return 'Ask Order Cancellation';
        } else if (data === 'ASSET_ASK_ORDER_PLACEMENT') {
          return 'Ask Order Placement';
        } else if (data === 'ASSET_BID_ORDER_CANCELLATION') {
          return 'Bit Order Cancellation';
        } else if (data === 'ASSET_BID_ORDER_PLACEMENT') {
          return 'Bit Order Placement';
        } else if (data === 'ASSET_DIVIDEND_PAYMENT') {
          return 'Dividend Payment';
        } else if (data === 'ASSET_ISSUANCE') {
          return 'Asset Issuance';
        } else if (data === 'ASSET_TRADE') {
          return 'Asset Trade';
        } else if (data === 'ASSET_TRANSFER') {
          return 'Asset Transfer';
        } else if (data === 'ASSET_DELETE') {
          return 'Asset Delete';
        } else if (data === 'ACCOUNT_CONTROL_EFFECTIVE_BALANCE_LEASING') {
          return 'Effective Balance Leasing';
        } else if (data === 'ACCOUNT_CONTROL_PHASING_ONLY') {
          return 'Account Control';
        } else if (data === 'CURRENCY_DELETION') {
          return 'Currency Deletion';
        } else if (data === 'CURRENCY_DISTRIBUTION') {
          return 'Currency Distribution';
        } else if (data === 'CURRENCY_EXCHANGE') {
          return 'Currency Exchange';
        } else if (data === 'CURRENCY_EXCHANGE_BUY') {
          return 'Currency Buy';
        } else if (data === 'CURRENCY_EXCHANGE_SELL') {
          return 'Currency Sell';
        } else if (data === 'CURRENCY_ISSUANCE') {
          return 'Currency Issuance';
        } else if (data === 'CURRENCY_MINTING') {
          return 'Currency Minting';
        } else if (data === 'CURRENCY_OFFER_EXPIRED') {
          return 'Currency Offer Expired';
        } else if (data === 'CURRENCY_OFFER_REPLACED') {
          return 'Currency Offer Replaced';
        } else if (data === 'CURRENCY_PUBLISH_EXCHANGE_OFFER') {
          return 'Currency Offer';
        } else if (data === 'CURRENCY_RESERVE_CLAIM') {
          return 'Currency Reserve Claim';
        } else if (data === 'CURRENCY_RESERVE_INCREASE') {
          return 'Currency Reserve Increase';
        } else if (data === 'CURRENCY_TRANSFER') {
          return 'Currency Transfer';
        } else if (data === 'CURRENCY_UNDO_CROWDFUNDING') {
          return 'Currency Undo Crowdfunding';
        } else if (data === 'SHUFFLING_REGISTRATION') {
          return 'Shuffling Registration';
        } else if (data === 'SHUFFLING_PROCESSING') {
          return 'Shuffling Processing';
        } else if (data === 'SHUFFLING_CANCELLATION') {
          return 'Shuffling Cancellation';
        } else if (data === 'SHUFFLING_DISTRIBUTION') {
          return 'Shuffling Distribution';
        } else if (data === 'SUBSCRIPTION_CANCEL') {
          return 'Subscription Cancellation';
        } else if (data === 'SUBSCRIPTION_PAYMENT') {
          return 'Sunscription Payment';
        } else if (data === 'SUBSCRIPTION_SUBSCRIBE') {
          return 'Subscription Subscribe';
        } else if (data === 'ESCROW_CREATION') {
          return 'Escrow Creation';
        } else if (data === 'ESCROW_SIGN') {
          return 'Escrow Signing';
        } else if (data === 'ESCROW_RESULT') {
            return 'Escrow Result';
        } else if (data === 'AUTOMATED_TRANSACTION_CREATION') {
          return 'AT Creation';
        } else if (data === 'AT_PAYMENT') {
          return 'AT Payment';
        } else {
            return 'Unknown Holding';
        }
    };
}]);

angular.module('baseClient').filter('unsafe', ['$sce', function ($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
}]);
