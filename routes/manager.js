var express = require('express');
var router = express.Router();
const multer = require('multer');
const comboController = require('../controllers/manager/combo.controller');
const orderComboController = require('../controllers/manager/orderCombo.controller');
const managerController = require('../controllers/manager/manager.controller');
const userController = require('../controllers/user.controller');
const jwt = require('jsonwebtoken');

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

// Authorization url manager
const checkLoginManager = (req, res, next) => {
  if (req.cookies.SbayComboEtoken) {
    var decoded = jwt.verify(req.cookies.SbayComboEtoken, process.env.CookiesSecretKey);
    console.log(decoded.userLevel);
    if (decoded.userID && decoded.userLevel == 1) {
      req.decoded = decoded;
      next();
    } else {
      res.redirect('/');
    }
  } else {
    console.log("user does not have permission");
  }
}

/* GET users listing. */
router.get('/quan-ly-combo-cho-xu-ly', checkLoginManager, orderComboController.getAllCustomer);
/* GET users listing. */
router.get('/quan-ly-combo-dang-xu-ly', checkLoginManager, managerController.getAllComboProcessing);
/* GET users listing. */
router.get('/quan-ly-combo-hoan-thanh', checkLoginManager, managerController.getAllComboComplete);
/* GET users listing. */
router.get('/quan-ly-combo-huy', checkLoginManager, managerController.getAllComboCancel);

/* GET Quản lý combo. */
router.get('/quan-ly-combo', checkLoginManager, comboController.getAllCombo);

/* GET users listing. */
router.get('/quan-ly-nhan-vien', checkLoginManager, managerController.findAllEmployee);
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
