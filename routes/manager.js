var express = require('express');
var router = express.Router();
const multer = require('multer');
const comboController = require('../controllers/combo.controller');
const orderComboController = require('../controllers/orderCombo.controller');
const managerController = require('../controllers/manager.controller');

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

/* GET 1 orderCombo */
router.get('/orderCombo/:id', orderComboController.oneOrderCombo);

/* GET Quản lý combo. */
router.get('/quan-ly-combo', comboController.getAllCombo);

/* GET users listing. */
router.get('/quan-ly-nhan-vien', managerController.findAllEmployee);
/* GET users listing. */
router.get('/add-combo', function(req, res, next) {
  res.render('./manager/m-add-combo')
});
/* GET combos listing. */
router.get('/', comboController.getActiveCombo);
/* POST add new combo */
router.post('/new-add-combo', upload.array('images', 20), comboController.createCombo);
/* GET edit combo */
router.get('/edit-combo/:id', comboController.readToUpdateCombo);
/* POST update combo */
router.post('/update-combo/:id', upload.array('images', 20), comboController.updateCombo);
/* DELETE detele combo */
router.post('/delete-combo/:id', comboController.deleteCombo);
/* Read 1 combo */
router.get('/combo/:id', comboController.readToViewCombo);
/* Active combo */
router.put('/active-combo', comboController.activeCombo);
/* deactive combo */
router.put('/deactive-combo', comboController.deactiveCombo);

module.exports = router;
