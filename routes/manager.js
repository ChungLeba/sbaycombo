var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

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
/* POST COMBO. */
router.post('/add-combo', upload.array('photos', 12), function(req, res, next) {
  console.log(req.body);
  console.log(req.files);
});
module.exports = router;
