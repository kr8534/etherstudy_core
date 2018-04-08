const router = require('express').Router(),
    timeManager = require('../lib/timeManager'),
    bitcoinManager = require('../lib/bitcoinManager'),
    cookieManager = require('../lib/cookieManager');

// 메인페이지
router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/main', (req, res) => {
    const bitcoin = {};

    const account = cookieManager.getUserLoginInfo(req);

    bitcoinManager.bitcoinClient.getAddressesByAccount(account).then((addrs) => {
        console.log('addrs', addrs);
        bitcoinManager.bitcoinClient.getBalance(account).then((balance) => {
            console.log('balance', balance);
            bitcoinManager.bitcoinClient.listTransactions(account).then((txs) => {
                console.log('');
                bitcoin.addrs = addrs;
                bitcoin.balance = balance;

                for (var i in txs) {
                    txs[i].time = timeManager.ago(new Date() - txs[i].time);
                }
                bitcoin.txs = txs;
                res.render('main.html', bitcoin);
            });
        });
    });
});


router.get('/send', (req, res) => {
    const bitcoin = {};
    const account = cookieManager.getUserLoginInfo(req);

    bitcoinManager.bitcoinClient.getAddressesByAccount(account).then((addrs) => {
        console.log('addrs', addrs);
        bitcoinManager.bitcoinClient.getBalance(account).then((balance) => {
            console.log('balance', balance);
            bitcoin.addrs = addrs;
            bitcoin.balance = balance;
            bitcoin.account = account;

            res.render('send.html', bitcoin);
        });
    });
});

module.exports = router;