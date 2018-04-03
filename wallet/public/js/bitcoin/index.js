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


function makeTestnetAccount() {
	var testnet = bitcoin.networks.testnet;
	var keyPair = bitcoin.ECPair.makeRandom({
		network: testnet
	});
	var wif = keyPair.toWIF();
	var address = keyPair.getAddress();

	const account = {
		privateKey: keyPair.toWIF(),
		address: keyPair.getAddress()
	}
}

function sendTransaction() {
	var alice1 = bitcoin.ECPair.makeRandom({
		network: regtest
	})
	var alice2 = bitcoin.ECPair.makeRandom({
		network: regtest
	})
	var aliceChange = bitcoin.ECPair.makeRandom({
		network: regtest,
		rng: rng
	})

	// give Alice 2 unspent outputs
	regtestUtils.faucet(alice1.getAddress(), 5e4, function (err, unspent0) {
		if (err) return done(err)

		regtestUtils.faucet(alice2.getAddress(), 7e4, function (err, unspent1) {
			if (err) return done(err)

			var txb = new bitcoin.TransactionBuilder(regtest)
			txb.addInput(unspent0.txId, unspent0.vout) // alice1 unspent
			txb.addInput(unspent1.txId, unspent1.vout) // alice2 unspent
			txb.addOutput('mwCwTceJvYV27KXBc3NJZys6CjsgsoeHmf', 8e4) // the actual "spend"
			txb.addOutput(aliceChange.getAddress(), 1e4) // Alice's change
			// (in)(4e4 + 2e4) - (out)(1e4 + 3e4) = (fee)2e4 = 20000, this is the miner fee

			// Alice signs each input with the respective private keys
			txb.sign(0, alice1)
			txb.sign(1, alice2)

			// build and broadcast our RegTest network
			regtestUtils.broadcast(txb.build().toHex(), done)
		})
	})
}
module.exports = {
	makeaccount
}