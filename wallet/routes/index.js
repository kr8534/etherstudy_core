var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

/* GET home page. */
router.get('/bitcoin', function(req, res, next) {
  res.render('bitcoin.html');
});

module.exports = router;
