var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./manager/m-dashboard')
});
/* GET users listing. */
router.get('/quan-ly-combo', function(req, res, next) {
  res.render('./manager/m-combo-wait')
});
/* GET users listing. */
router.get('/quan-ly-combo-dang-xu-ly', function(req, res, next) {
  res.render('./manager/m-combo-processing')
});
/* GET users listing. */
router.get('/quan-ly-combo-hoan-thanh', function(req, res, next) {
  res.render('./manager/m-combo-complete')
});
/* GET users listing. */
router.get('/quan-ly-combo-huy', function(req, res, next) {
  res.render('./manager/m-combo-cancel')
});
/* GET users listing. */
router.get('/quan-ly-nhan-vien', function(req, res, next) {
  res.render('./manager/m-employee')
});
/* GET users listing. */
router.get('/add-combo', function(req, res, next) {
  res.render('./manager/m-add-combo')
});
module.exports = router;
