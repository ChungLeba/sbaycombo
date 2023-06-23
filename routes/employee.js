var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model.js');
var jwt = require('jsonwebtoken');

/* Check login */
const checkLoginEmployee = function (req, res, next) {
  if (req.cookies.SbayComboEtoken) {
    var decoded = jwt.verify(req.cookies.SbayComboEtoken, process.env.CookiesSecretKey);
    console.log(decoded);
    if (decoded.userID) {
      userModel.findById(decoded.userID)
        .then(data => {
          console.log(data);
          if (data.userActive == true) {
            req.decoded = decoded
            next()
          } else if (data.userActive == false) {
             
            res.redirect('/tai-khoan-doi-duyet')
          }
        })
    }
  } else {
    res.redirect('/dang-nhap')
  }
}

/* GET employee dashboard. */
router.get('/', checkLoginEmployee, function (req, res, next) {
  res.render('./employee/e-dashboard')
});
/* GET users listing. */
router.get('/quan-ly-combo', function (req, res, next) {
  res.render('./employee/e-combo-wait')
});
/* GET users listing. */
router.get('/quan-ly-combo-dang-xu-ly', function (req, res, next) {
  res.render('./employee/e-combo-processing')
});
/* GET users listing. */
router.get('/quan-ly-combo-hoan-thanh', function (req, res, next) {
  res.render('./employee/e-combo-complete')
});
/* GET users listing. */
router.get('/quan-ly-combo-huy', function (req, res, next) {
  res.render('./employee/e-combo-cancel')
});
module.exports = router;
