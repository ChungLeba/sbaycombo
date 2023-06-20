var express = require('express');
var router = express.Router();
const multer = require('multer');
const comboController = require('../controllers/combo.controller');
const orderComboController = require('../controllers/orderCombo.controller');

// upload image multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

/* GET users listing. */
router.get('/quan-ly-combo-cho-xu-ly', orderComboController.getAllCustomer);
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
/* GET combos listing. */
router.get('/', comboController.getAllCombo);
/* POST add new combo */
router.post('/new-add-combo', upload.array('images', 20), comboController.saveProduct);
/* GET edit combo */
router.get('/edit-combo/:id', comboController.editProduct);
/* POST update combo */
router.post('/update-combo/:id', upload.array('images', 20), comboController.updateProduct);
/* DELETE detele combo */
router.post('/delete-combo/:id', comboController.deleteProduct);
module.exports = router;
