var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model.js');
var jwt = require('jsonwebtoken');
const employeeController = require('../controllers/employee/employee.controller.js');
const orderComboController = require('../controllers/employee/orderCombo.controller.js');

// Authorization url employee
const checkLoginEmployee = (req, res, next) => {
  if (req.cookies.SbayComboToken) {
    var decoded = jwt.verify(req.cookies.SbayComboToken, process.env.CookiesSecretKey);
    console.log(decoded.userLevel);
    if (decoded.userID && decoded.userLevel == 3) {
      req.decoded = decoded;
      next();
    } else {
      res.redirect('/');
    }
  } else {
    console.log("user does not have permission");
  }
}

/* GET employee dashboard. */
router.get('/', checkLoginEmployee, function (req, res, next) {
  res.render('./employee/e-dashboard')
});
/* GET users listing. */
router.get('/quan-ly-combo', checkLoginEmployee, employeeController.getAllComboWait);
/* GET users listing. */
router.get('/quan-ly-combo-dang-xu-ly', checkLoginEmployee, employeeController.getAllComboProcessing);
/* GET users listing. */
router.get('/quan-ly-combo-hoan-thanh', checkLoginEmployee, employeeController.getAllComboComplete);
/* GET users listing. */
router.get('/quan-ly-combo-huy', checkLoginEmployee, employeeController.getAllComboCancel);

/* GET 1 orderCombo wait */
router.get('/orderCombo-wait/:id', checkLoginEmployee, orderComboController.oneOrderComboWait);
/* GET 1 orderCombo processing */
router.get('/orderCombo-processing/:id', checkLoginEmployee, orderComboController.oneOrderComboProcessing);
/* GET 1 orderCombo complete */
router.get('/orderCombo-complete/:id', checkLoginEmployee, orderComboController.oneOrderComboComplete);
/* GET 1 orderCombo cancel */
router.get('/orderCombo-cancel/:id', checkLoginEmployee, orderComboController.oneOrderComboCancel);

// router.get('/quan-ly-combo-dang-cho', function (req, res, next) {
//   res.render('./employee/e-ordercombo-todo')
// });
module.exports = router;
