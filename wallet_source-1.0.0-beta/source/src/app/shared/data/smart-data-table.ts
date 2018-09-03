// Smart DataTable
export var messagesSettings = {
  columns: {
    timestamp: {
      title: 'Date',
      filter: true,
    },
    type: {
      title: 'Type',
      filter: false,
    },
    confirmations: {
      title: 'Conf.',
      filter: false,
    },
    senderRS: {
        title: 'Sender',
        filter: false,
    },
    phased: {
        title: 'Phased',
        filter: false,
    },
    prunable: {
        title: 'Prunable',
        filter: false,
    },
      recipientRS: {
      title: 'Recipient',
      filter: false,
    },
    action: {
      title: 'Actions',
      type:'html',
      filter: false,
    },

  },
  editable:false,
  hideSubHeader: true,
  actions: {
    position: 'right',
    add: false,
    edit: false,
    delete: false
  },
  attr: {
    class: "table table-responsive"
  },
  view:{
    viewButtonContent: '<i class="fa fa-eye info font-medium-1 mr-2"></i>'
  },
  reply:{
    replyButtonContent: '<i class="fa fa-reply info font-medium-1 mr-2"></i>'
  },
  delete:{
    deleteButtonContent: '<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  }
};

export var votersSettings = {
    columns: {
      voter: {
        title: 'Voter',
        filter: false,
      },
      details: {
        title: 'Details',
        filter: false,
      }
    },
    editable:false,
    hideSubHeader: true,
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false
    },
    attr: {
      class: "table table-responsive"
    },
}

export var pollsSettings = {
    columns: {
      name: {
        title: 'Name',
        filter: false,
      },
      model: {
        title: 'Model',
        type:'html',
        filter: false,
      },
      options: {
        title: 'Options',
        filter: false,
      },
      finished: {
          title: 'Finished',
          type:'html',
          filter: false,
      },
      height: {
          title: 'Height',
          filter: false,
      },
      days: {
          title: 'Days',
          type:'html',
          filter: false,
      }
    },
    editable:false,
    hideSubHeader: true,
    actions: {
        position: 'right',
        add: false,
        edit: false,
        delete: false,
        custom: [
            {
                name: 'details',
                title: '<i class="fa fa-bars danger font-medium-1 mr-2"></i>',
            },
            {
                name: 'result',
                title: '<i class="fa fa-line-chart success font-medium-1 mr-2"></i>',
            },
            {
                name: 'vote',
                title: '<i class="fa fa-signal warning font-medium-1 mr-2"></i>',
            },
            {
                name: 'voters',
                title: '<i class="fa fa-user info font-medium-1 mr-2"></i>',
            },
        ]
      },
    attr: {
      class: "table table-responsive"
    }
  };

export var pollsResultSettings = {
    columns: {
      options: {
        title: 'Options',
        filter: false,
      },
      percentage: {
        title: 'Model',
        type:'html',
        filter: false,
      }
    },
    editable:false,
    hideSubHeader: true,
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false
    },
    attr: {
      class: "table table-responsive"
    }
  };

export var settings_history_transactions = {
  columns: {
    date: {
      title: 'Date',
      filter: false,
    },
    type: {
      title: 'Type',
      filter: false,
    },
    amount: {
      title: 'Amount',
      filter: false,
    },
    fee: {
      title: 'Fee',
      filter: false,
    },
    conf: {
      title: 'Conf.',
      filter: false,
    },
    sender: {
      title: 'Sender',
      filter: false,
    },
    message: {
      title: 'Msg',
      filter: false
    },
    recipient: {
      title: 'Recipient',
      filter: false,
    },
    details: {
        title: 'Details',
        filter: false,
    },

  },
  editable:false,
  hideSubHeader: true,
  actions: {
    position: 'right',
    add: false,
    edit: false,
    delete: false
  },
  attr: {
    class: "table table-responsive"
  },
  view:{
    viewButtonContent: '<i class="fa fa-eye info font-medium-1 mr-2"></i>'
  },
  reply:{
    replyButtonContent: '<i class="fa fa-reply info font-medium-1 mr-2"></i>'
  },
  delete:{
    deleteButtonContent: '<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  }
};

export var settings_pending_transactions = {
    columns: {
        date: {
            title: 'Date',
            filter: false,
        },
        type: {
            title: 'Type',
            filter: false,
            type: 'html'
        },
        sender: {
            title: 'Sender',
            filter: false,
        },
        recipient: {
            title: 'Recipient',
            filter: false,
        },
        fee: {
            title: 'Fee',
            filter: false,
        },
        amount: {
            title: 'Amount',
            filter: false,
        },
        details: {
            title: 'Details',
            filter: false,
            type: 'html'
        },
    },
    editable:false,
    hideSubHeader: true,
    actions: {
        position: 'right',
        add: false,
        edit: false,
        delete: false
    },
    attr: {
        class: "table table-responsive"
    },
    view:{
        viewButtonContent: '<i class="fa fa-eye info font-medium-1 mr-2"></i>'
    },
    reply:{
        replyButtonContent: '<i class="fa fa-reply info font-medium-1 mr-2"></i>'
    },
    delete:{
        deleteButtonContent: '<i class="fa fa-close danger font-medium-1 mr-2"></i>'
    }
};

export var settings_control = {
    columns: {
        date: {
            title: 'Date',
            filter: false
        },
        type: {
            title: 'Type',
            filter: false
        },
        amount: {
            title: 'Amount',
            filter: false
        },
        conf: {
            title: 'Conf.',
            filter: false
        },
        message: {
            title: 'Message',
            filter: false
        },
        height: {
            title: 'Height',
            filter: false
        },
        sender: {
            title: 'Sender',
            filter: false
        },
        recipient: {
            title: 'Recipient',
            filter: false
        },
        details: {
            title: 'Details',
            filter: false,
        },
        action: {
            title: 'Action',
            filter: false
        },
    },
    editable:false,
    hideSubHeader: true,
    actions: {
        position: 'right',
        add: false,
        edit: false,
        delete: false
    },
    attr: {
        class: "table table-responsive"
    },
    view:{
        viewButtonContent: '<i class="fa fa-eye info font-medium-1 mr-2"></i>'
    },
    reply:{
        replyButtonContent: '<i class="fa fa-reply info font-medium-1 mr-2"></i>'
    },
    delete:{
        deleteButtonContent: '<i class="fa fa-close danger font-medium-1 mr-2"></i>'
    }
};

export var settings_all_assets = {
    columns: {
        name: {
            title: 'Name',
            filter: false
        },
        issuer: {
            title: 'Issuer',
            filter: false
        },
        current_supply: {
            title: 'Current Supply',
            filter: false
        },
        share_holders: {
            title: 'Shareholders',
            filter: false
        },
        trades: {
            title: 'Trades',
            filter: false
        },
        transfers: {
            title: 'Transfers',
            filter: false
        },
    },
    editable:false,
    hideSubHeader: true,
    actions: {
        position: 'right',
        add: false,
        edit: false,
        delete: false,
        custom: [
            {
                name: 'detail',
                title: '<i class="fa fa-list-ul warning font-medium-1 mr-2"></i>',
            },
            {
                name: 'trade_desk',
                title: '<i class="fa fa-bar-chart warning font-medium-1 mr-2"></i>',
            },
            {
                name: 'dividend',
                title: '<i class="fa fa-usd warning font-medium-1 mr-2"></i>',
            },
        ]
    },
    attr: {
        class: "table table-responsive"
    },
    view:{
        viewButtonContent: '<i class="fa fa-eye info font-medium-1 mr-2"></i>'
    },
    reply:{
        replyButtonContent: '<i class="fa fa-reply info font-medium-1 mr-2"></i>'
    },
    delete:{
        deleteButtonContent: '<i class="fa fa-close danger font-medium-1 mr-2"></i>'
    },

};

export var settings_open_orders = {
    columns: {
        order: {
            title: 'Order',
            filter: false
        },
        asset: {
            title: 'Asset',
            filter: false
        },
        price: {
            title: 'Price',
            filter: false
        },
        quantity: {
            title: 'Quantity',
            filter: false
        },
        action: {
            title: 'Action',
            filter: false
        }
    },
    editable:false,
    hideSubHeader: true,
    actions: {
        position: 'right',
        add: false,
        edit: false,
        delete: false,
        custom: [
            {
                name: 'detail',
                title: '<i class="fa fa-list-ul warning font-medium-1 mr-2"></i>',
            },
            {
                name: 'trade_desk',
                title: '<i class="fa fa-bar-chart warning font-medium-1 mr-2"></i>',
            },
            {
                name: 'dividend',
                title: '<i class="fa fa-usd warning font-medium-1 mr-2"></i>',
            },
        ]
    },
    attr: {
        class: "table table-responsive"
    },
    view:{
        viewButtonContent: '<i class="fa fa-eye info font-medium-1 mr-2"></i>'
    },
    reply:{
        replyButtonContent: '<i class="fa fa-reply info font-medium-1 mr-2"></i>'
    },
    delete:{
        deleteButtonContent: '<i class="fa fa-close danger font-medium-1 mr-2"></i>'
    },

};

export var settings_search_account = {
    columns: {
        name: {
            title: 'Name',
            filter: false
        },
        account: {
            title: 'Account',
            filter: false
        }
    },
    editable:false,
    hideSubHeader: true,
    actions: {
        position: 'right',
        add: false,
        edit: false,
        delete: false,
        custom: [
            {
                name: 'view',
                title: '<i class="fa fa-plus warning font-medium-1 mr-2"></i>',
            },
        ]
    },
    attr: {
        class: "table table-responsive"
    },
    view:{
        viewButtonContent: '<i class="fa fa-eye info font-medium-1 mr-2"></i>'
    },
    reply:{
        replyButtonContent: '<i class="fa fa-reply info font-medium-1 mr-2"></i>'
    },
    delete:{
        deleteButtonContent: '<i class="fa fa-close danger font-medium-1 mr-2"></i>'
    },

};

export var settings_bookmark = {
    columns: {
        account: {
            title: 'Account',
            filter: false
        },
        tag: {
            title: 'Tag',
            filter: false
        }
    },
    editable:false,
    hideSubHeader: true,
    actions: {
        position: 'right',
        add: false,
        edit: false,
        delete: true
    },
    mode: 'external',
    attr: {
        class: "table table-responsive"
    },
    view:{
        viewButtonContent: '<i class="fa fa-eye info font-medium-1 mr-2"></i>'
    },
    reply:{
        replyButtonContent: '<i class="fa fa-reply info font-medium-1 mr-2"></i>'
    },
    delete:{
        deleteButtonContent: '<i class="fa fa-close danger font-medium-1 mr-2"></i>'
    },

};

export var data_pending_transactions = [
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  },
  {
      date: '12/1/2018',
      type: 'Dummy Data',
      sender: 'Bret',
      recipient: 'Antonette',
      fee: 12,
      amount: 12000,
      details: 'Send XIN'
  }

];

export var data_history_transactions = [
    {
        date: '12/1/2018',
        type: 'Dummy Data',
        amount: 12000,
        fee: 12,
        conf: 'Dummy Text',
        sender: 'Bret',
        message: 'Antonette',
        recipient: 'Bret',
        details: 'Send XIN'
    },
]

export var data_control = [
    {
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },{
        date: '12/1/2018',
        type: 'Dummy Data',
        amount:"123",
        conf:"conf text",
        message:"message text",
        height:"1234",
        sender: 'Bret',
        recipient: 'Antonette',
        details:"details text",
        action:"check"
    },
];

export var data_search_account = [
    {
        name: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    },{
        name: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    },{
        name: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    },{
        name: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    },{
        name: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    },{
        name: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    }
];

export var data_bookmark = [
    {
        tag: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    },{
        tag: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    },{
        tag: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    },{
        tag: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    },{
        tag: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    },{
        tag: "ronald",
        account: "XIN-RWZ8-LCLS-CXWJ-5M2S2"
    }
];

export var data_all_assets = [
    {
        name: 'VVGCA',
        issuer: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        current_supply: 99999996,
        share_holders: 1,
        trades: 1,
        transfers: 1
    },{
        name: 'VVGCA',
        issuer: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        current_supply: 99999996,
        share_holders: 1,
        trades: 1,
        transfers: 1
    },{
        name: 'VVGCA',
        issuer: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        current_supply: 99999996,
        share_holders: 1,
        trades: 1,
        transfers: 1
    },{
        name: 'VVGCA',
        issuer: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        current_supply: 99999996,
        share_holders: 1,
        trades: 1,
        transfers: 1
    },{
        name: 'VVGCA',
        issuer: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        current_supply: 99999996,
        share_holders: 1,
        trades: 1,
        transfers: 1
    },{
        name: 'VVGCA',
        issuer: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        current_supply: 99999996,
        share_holders: 1,
        trades: 1,
        transfers: 1
    },{
        name: 'VVGCA',
        issuer: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        current_supply: 99999996,
        share_holders: 1,
        trades: 1,
        transfers: 1
    }
]

export var data_open_orders = [
    {
        order: 'VVGCA',
        asset: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        price: 99999996,
        quantity: 1,
    },{
        order: 'VVGCA',
        asset: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        price: 99999996,
        quantity: 1,
    },{
        order: 'VVGCA',
        asset: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        price: 99999996,
        quantity: 1,
    },{
        order: 'VVGCA',
        asset: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        price: 99999996,
        quantity: 1,
    },{
        order: 'VVGCA',
        asset: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        price: 99999996,
        quantity: 1,
    },{
        order: 'VVGCA',
        asset: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        price: 99999996,
        quantity: 1,
    },{
        order: 'VVGCA',
        asset: 'XIN-Z27V-2HR4-PYHK-ADQMH\t',
        price: 99999996,
        quantity: 1,
    }
]

export var messagesData = [
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  },
  {
      details: 'details..',
      date: '12/1/2018',
      type: 'On Chain',
      conf: '-',
      sender: 'XIN-FB6Q-TRSG-SKK3-F2PU3',
      recipient: 'XIN-QRVE-EA6Y-Z2KV-BU9DR',
      send: '-',
      phased: '-',
      amount: 12000,
      prunable: 'Yes',
      action:'<i class="fa fa-eye info font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-reply success font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-close danger font-medium-1 mr-2"></i>'
  }

];

export var votersData = [
    {
        voter:'-',
        details:'-'
    },
    {
        voter:'-',
        details:'-'
    }
];

export var pollsData = [
    {
        name: 'AHMET OGUT',
        model: '<i class="fa fa-user info font-medium-1 mr-2"></i>',
        options: '2',
        finished: '<i class="fa fa-check success font-medium-1 mr-2"></i>',
        height: '20234',
        days: '0.00',
        action:'<i class="fa fa-bars danger font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-line-chart primary font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-signal warning font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-user info font-medium-1 mr-2"></i>'
    },
    {
        name: 'AHMET OGUT',
        model: '<i class="fa fa-user info font-medium-1 mr-2"></i>',
        options: '2',
        finished: '<i class="fa fa-check success font-medium-1 mr-2"></i>',
        height: '20234',
        days: '0.00',
        action:'<i class="fa fa-bars danger font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-line-chart primary font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-signal warning font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-user info font-medium-1 mr-2"></i>'
    },
    {
        name: 'AHMET OGUT',
        model: '<i class="fa fa-user info font-medium-1 mr-2"></i>',
        options: '2',
        finished: '<i class="fa fa-check success font-medium-1 mr-2"></i>',
        height: '20234',
        days: '0.00',
        action:'<i class="fa fa-bars danger font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-line-chart primary font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-signal warning font-medium-1 mr-2"></i>&nbsp;<i class="fa fa-user info font-medium-1 mr-2"></i>'
    },
];

export var pollsResultData = [
    {
        options: 'Up',
        percentage: "66.54%"
    },
    {
        options: 'Down',
        percentage: "33.46%"
    }
];

export var filtersettings = {
  columns: {
    id: {
      title: 'ID',
    },
    name: {
      title: 'Full Name',
      filter: {
        type: 'list',
        config: {
          selectText: 'Select...',
          list: [
            { value: 'Glenna Reichert', title: 'Glenna Reichert' },
            { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
            { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
          ],
        },
      },
    },
    email: {
      title: 'Email',
    },
    passed: {
      title: 'Passed',
      filter: {
        type: 'checkbox',
        config: {
          true: 'Yes',
          false: 'No',
          resetText: 'clear',
        },
      },
    },
  },
  attr: {
    class: "table table-responsive"
  },
  edit:{
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
  },
  delete:{
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
  }
};

export var filerdata = [
  {
    id: 4,
    name: 'Patricia Lebsack',
    email: 'Julianne.OConner@kory.org',
    passed: 'Yes',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    email: 'Lucio_Hettinger@annie.ca',
    passed: 'No',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    email: 'Karley_Dach@jasper.info',
    passed: 'Yes',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    email: 'Telly.Hoeger@billy.biz',
    passed: 'No',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    email: 'Sherwood@rosamond.me',
    passed: 'Yes',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    email: 'Chaim_McDermott@dana.io',
    passed: 'No',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    email: 'Rey.Padberg@karina.biz',
    passed: 'No',
  },
  {
    id: 11,
    name: 'Nicholas DuBuque',
    email: 'Rey.Padberg@rosamond.biz',
    passed: 'Yes',
  },
];

export var alertsettings = {
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
  },
  add: {
    confirmCreate: true,
  },
  edit: {
    confirmSave: true,
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
  },
  columns: {
    id: {
      title: 'ID',
    },
    name: {
      title: 'Full Name',
    },
    username: {
      title: 'User Name',
    },
    email: {
      title: 'Email',
    },
  },
  attr: {
    class: "table table-responsive"
  },
};

export var alertdata = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    notShownField: true,
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    notShownField: true,
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    notShownField: false,
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    notShownField: false,
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    notShownField: false,
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
    notShownField: false,
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
    notShownField: false,
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
    notShownField: true,
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    notShownField: false,
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
    notShownField: false,
  },
  {
    id: 11,
    name: 'Nicholas DuBuque',
    username: 'Nicholas.Stanton',
    email: 'Rey.Padberg@rosamond.biz',
    notShownField: true,
  }
];
