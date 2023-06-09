var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home tong quan. */
router.get('/tong-quan', function(req, res, next) {
  res.render('tong-quan');
});
module.exports = router;
