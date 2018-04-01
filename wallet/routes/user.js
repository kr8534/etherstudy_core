var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.post('/', userController.addUser);

module.exports = router;
