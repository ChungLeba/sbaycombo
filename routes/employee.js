var express = require('express');
var router = express.Router();


/* GET employee dashboard. */
router.get('/', function(req, res, next) {
  res.render('./employee/e-dashboard')
});
/* GET users listing. */
router.get('/quan-ly-combo', function(req, res, next) {
  res.render('./employee/e-combo-wait')
});
/* GET users listing. */
router.get('/quan-ly-combo-dang-xu-ly', function(req, res, next) {
  res.render('./employee/e-combo-processing')
});
/* GET users listing. */
router.get('/quan-ly-combo-hoan-thanh', function(req, res, next) {
  res.render('./employee/e-combo-complete')
});
/* GET users listing. */
router.get('/quan-ly-combo-huy', function(req, res, next) {
  res.render('./employee/e-combo-cancel')
});
module.exports = router;
