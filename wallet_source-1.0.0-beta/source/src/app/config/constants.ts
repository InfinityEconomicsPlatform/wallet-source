export class AppConstants {

    public static defaultLanguage = 'en';

    public static languageConfig = {
        DEFAULT: 'en',
        SESSION_SELECTED_LANGUAGE_KEY: 'selected_language'
    };
    public static optionsConfig = {
        'tableOptions': 'options'
    };
    public static baseConfig = {
        'SESSION_STORAGE_NAMESPACE': 'com.client',
        'FALLBACK_HOST_URL': 'http://208.95.1.177:23457',
        'AUTO_PAGE_REFRESH_INTERVAL': 60000,
        'TOKEN_QUANTS': 100000000,
        'TX_DEADLINE': 60,
        'apiEndPoint': 'api',
        'SESSION_CURRENT_BLOCK': 'current_block',
        'SESSION_APP_OPTIONS': 'app_options',
        'SESSION_PEER_ENDPOINTS': 'peerEndpoints',
        'SESSION_MAX_RETRIES': '2',
        'SESSION_CURRENT_TRY': '0',
        'EPOCH': 1484046000,
    };
    public static DEFAULT_OPTIONS = {
        'DEADLINE': '60',
        'REFRESH_INTERVAL_MILLI_SECONDS': '60000',
        'TX_HEIGHT': 7 * 1440,
        'USER_NODE_URL': 'http://localhost:23457',
        'USE_LOCAL_NODE': 0,
        'AUTO_UPDATE': 1,
        'CONNECTION_MODE': 'TESTNET', //'HTTPS', // 'DEVTESTNET' TESTNET', // AUTO
        'VERSION': '1.0.0' + 'Beta',
        'RANDOMIZE_NODES': 1,
        'TESTNET': 1,
        'TESTNET_URL': 'http://185.35.138.140:9876',
        'DEVTESTNET_URL': 'http://185.35.138.140:9000',
        'LOCALTESTNET_URL': 'http://localhost:9876',
        'FOUNDATION_URL': 'http://46.244.20.41:23457',
        'HTTPS_URL': 'https://ssl.infinity-economics.org',
        'LOCAL_HOST_URL': 'http://localhost:23457',
        'EXTENSIONS': 1
    };
    public static addressBookConfig = {
        'tableAddressBook': 'addressBook'
    };
    public static assetsConfig = {
        'assetsEndPoint': 'api'
    };
    public static peerConfig = {
        'apiUrl': 'http://185.103.75.217:8888',
        'peerEndPoint': 'api/nodes',
        'SESSION_PEER_URL_KEY': 'peerKey'
    };

    public static localhostConfig = {
        'apiUrl': 'http://localhost:23457',
        'endPoint': 'api',
        'SESSION_PEER_URL_KEY': 'peerKey'
    };

    public static accountConfig = {
        'accountEndPoint': 'api'
    };

    public static crowdfundingConfig = {
        'crowdfundingEndPoint': 'api'
    };
    public static options = {
        'TX_HEIGHT': ''
    };
    public static peerEndpoints = [
        'http://185.35.137.7:8888/api/nodes',
        'http://185.35.139.102:8888/api/nodes',
        'http://185.35.139.103:8888/api/nodes',
        'http://185.35.139.104:8888/api/nodes',
        'http://185.35.139.105:8888/api/nodes',
        'http://46.244.20.41:8888/api/nodes',
        'http://185.35.139.101:8888/api/nodes',
        'http://208.95.1.177:8888/api/nodes',
        'http://199.127.137.169:8888/api/nodes',
        'http://185.103.75.217:8888/api/nodes'
    ];

    public static peerEndpointsMap = {
        DEFAULT: ['http://185.35.137.7:8888/api/nodes',
            'http://185.35.139.102:8888/api/nodes',
            'http://185.35.139.103:8888/api/nodes',
            'http://185.35.139.104:8888/api/nodes',
            'http://185.35.139.105:8888/api/nodes',
            'http://46.244.20.41:8888/api/nodes',
            'http://185.35.139.101:8888/api/nodes',
            'http://208.95.1.177:8888/api/nodes',
            'http://199.127.137.169:8888/api/nodes',
            'http://185.103.75.217:8888/api/nodes'],
        DEVTESTNET: [
            'http://185.35.138.132:9999/api/nodes',
        ],
        TESTNET: [
            'http://185.35.138.140:8888/api/v1/nodes',
        ]

    };

    public static nodeEndpoints = [
        'http://185.103.75.217:23457/',
        'http://185.35.137.7:23457/',
        'http://185.35.139.102:23457/',
        'http://185.35.139.103:23457/',
        'http://185.35.139.104:23457/',
        'http://185.35.139.105:23457/',
        'http://46.244.20.41:23457/',
        'http://185.35.139.101:23457/',
        'http://208.95.1.177:23457/',
        'http://199.127.137.169:23457/'
    ];

    public static chainEndpoints = [
        'http://185.103.75.217:23457/',
        'http://185.35.137.7:23457/',
        'http://185.35.139.102:23457/',
        'http://185.35.139.103:23457/',
        'http://185.35.139.104:23457/',
        'http://185.35.139.105:23457/',
        'http://46.244.20.41:23457/',
        'http://185.35.139.101:23457/',
        'http://208.95.1.177:23457/',
        'http://199.127.137.169:23457/'
    ];

    public static loginConfig = {
        SESSION_ACCOUNT_DETAILS_KEY: 'account_details',
        SESSION_ACCOUNT_PRIVATE_KEY: 'account_private_key'
    };

    public static controlConfig = {
        SESSION_ACCOUNT_CONTROL_HASCONTROL_KEY: 'account_control_hascontrol',
        SESSION_ACCOUNT_CONTROL_JSONCONTROL_KEY: 'account_control_jsoncontrol'
    };

    public static dashboardConfig = {
        apiEndPoint: 'api'
    };

    public static fiatConfig = {
        btcEndpoint: 'http://185.35.139.104/',
        xinEndpoint: 'http://185.35.139.104/'
    };

    public static marketDataConfig = {
        baseUrl: 'https://min-api.cryptocompare.com',
        endpoint: 'data'
    };

    public static exchangesConfig = {
        BLOCKR_URL_END_POINT: 'https://blockexplorer.com/api/',
        BLOCKR_ADDRESS_END_POINT: 'addr',
    };

    public static currenciesConfig = {
        currenciesEndPoint: 'api'
    };

    public static escrowConfig = {
        escrowEndPoint: 'api'
    };

    public static subscriptionConfig = {
        subscriptionEndPoint: 'api'
    };
    public static aliasesConfig = {
        aliasesEndPoint: 'api'
    };

    public static shufflingsConfig = {
        shufflingEndPoint: 'api',
    };
    public static ATConfig = {
        ATEndPoint: 'api',
        ATCompilerURL: 'http://142.93.63.219:10080', //'http://185.61.149.71:10080'
    };
    public static messagesConfig = {
        messagesEndPoint: 'api'
    };
    public static searchConfig = {
        'searchEndPoint': 'api',
        'searchAccountString': 'XIN',
        'searchPeerUrl': 'http://185.103.75.217:8888/api/nodes',
        'searchPeerEndPoint': 'api/nodes',
    };
    public static pollConfig = {
        pollEndPoint: 'api'
    };
    public static getNoConnectionMessage = 'network-error';

    public static macapViewerConfig = {
        'macapUrl': 'http://185.103.75.217:8892',
        'macapEndPoint': 'api/v1/get'
    };

    public static newsViewerConfig = {
        'newsUrl': 'http://199.127.137.169:8889',
        'newsEndPoint': 'api/v1/news'
    };

    public static chainViewerConfig = {
        'apiUrl': 'http://199.127.137.169:23457',
        'peerUrl': 'http://199.127.137.169:8888',
        'peerEndPoint': 'api/nodes',
        'endPoint': 'api'
    };

    public static marketPlaceConfig = {
        'apiUrl': 'http://142.93.129.208:23457',
        'endPoint': 'api'
    }
}
