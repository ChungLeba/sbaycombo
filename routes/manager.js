var express = require('express');
var router = express.Router();
const multer = require('multer');
const comboController = require('../controllers/manager/combo.controller');
const orderComboController = require('../controllers/manager/orderCombo.controller');
const managerController = require('../controllers/manager/manager.controller');
const userController = require('../controllers/user.controller');
var jwt = require('jsonwebtoken');

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
  if (req.cookies.SbayComboToken) {
    var decoded = jwt.verify(req.cookies.SbayComboToken, process.env.CookiesSecretKey);
    console.log(decoded.userLevel);
    if (decoded.userID && decoded.userLevel == 2) {
      req.decoded = decoded;
      //console.log(req.decoded);
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

/* PUT users listing. */
router.put('/quan-ly-nhan-vien', checkLoginManager, managerController.activeEmployee);

/* Delete users listing. */
router.delete('/quan-ly-nhan-vien', checkLoginManager, managerController.deleteEmployee);
/* GET users listing. */
router.get('/add-combo', function(req, res, next) {
  res.render('./manager/m-add-combo')
});
/* GET combos listing. */
router.get('/', checkLoginManager, comboController.getActiveCombo);
/* POST add new combo */
router.post('/new-add-combo', checkLoginManager, upload.array('images', 20), comboController.createCombo);
/* GET edit combo */
router.get('/edit-combo/:id', checkLoginManager, comboController.readToUpdateCombo);
/* POST update combo */
router.post('/update-combo/:id', checkLoginManager, upload.array('images', 20), comboController.updateCombo);
/* DELETE detele combo */
router.post('/delete-combo/:id', checkLoginManager, comboController.deleteCombo);
/* Read 1 combo */
router.get('/combo/:id', checkLoginManager, comboController.readToViewCombo);
/* Active combo */
router.put('/active-combo', checkLoginManager, comboController.activeCombo);
/* deactive combo */
router.put('/deactive-combo', checkLoginManager, comboController.deactiveCombo);

module.exports = router;
