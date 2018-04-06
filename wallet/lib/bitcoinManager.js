const bitcoin = require('bitcoin-core');

exports.bitcoinClient = new bitcoin({
  host: '147.46.240.242',
  port: 18443,
  username: 'bitcoinrpc',
  password: 'Abcd1234'
}); 