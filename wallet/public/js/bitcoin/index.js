let bitcoin = require('bitcoinjs-lib');
let qrcode = require('../qrcode/index');

function makeaccount() {
	var keyPair = bitcoin.ECPair.makeRandom();

	const account = {
		privateKey: keyPair.toWIF(),
		address: keyPair.getAddress()
	}


	
	qrcode.makeQRCode("#qrcode", account.address);


	return account
}


module.exports = {
	makeaccount
}