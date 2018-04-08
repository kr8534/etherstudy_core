const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const app = express();
const passport = require('passport');

app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.json());
app.use(cookieParser('!@#%%@#@'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/lib/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/lib/jquery.min.js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js')));

app.use('/', require('./routes/index'));
app.use('/kakao', require('./routes/kakao'));
app.use('/facebook', require('./routes/facebook'));


const bitcoin = require('bitcoin-core');

const bitcoinClient = new bitcoin({
    host: '147.46.240.242',
    port: 9735,
    username: 'bitcoinrpc',
    password: 'Abcd1234'
});

const lightningNetwork = new bitcoin({
    host: '147.46.240.242',
    port: 8080
});

// bitcoinClient.getNewAddress("kr").then((responses)  => {console.log(responses)});
// bitcoinClient.getAddressesByAccount("123").then((responses)  => {console.log(responses)});
// bitcoinClient.getBalance("123").then((responses)  => {console.log(responses)});
// bitcoinClient.listTransactions("kr").then((responses)  => {console.log(responses)});


// console.log(lightningNetwork);
// lightningNetwork.listPeers("1").then((responses)  => {console.log(responses)});



// console.log(bitcoinClient);


var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};


// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000);
httpsServer.listen(8443);


module.exports = app;





// client.getNewAddress("jj").then((responses)  => console.log(responses));
// client.getBalance("2NEpWDdDbzsE3NkWu6YqhKnAFgfnL87wsVR").then((responses)  => console.log(responses));
// client.getDifficulty(function(err, difficulty) {
//   if (err) {
//     return console.error(err);
//   }

//   console.log('Difficulty: ' + difficulty);
// });


// client.command({ method: 'getnewaddress', parameters: [] }).then((responses) => console.log(responses));