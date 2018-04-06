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