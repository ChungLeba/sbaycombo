var express = require('express');
var router = express.Router();
var user_Model = require('../models/user.model')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET home page. */
router.get('/test', function(req, res, next) {
  res.render('test');
});
router.get('/dang-ky', function(req, res, next) {
  res.render('sign_in');
});
router.get('/quen-mat-khau', function(req, res, next) {
  res.render('recovery_pass');
});
router.get('/thong-bao-tai-khoan', function(req, res, next) {
  res.render('employee_noiti');
});
router.get('/thay-doi-thong-tin', function(req, res, next) {
  res.render('profile-edit');
});
router.get('/logout', function(req, res, next) {
  res.redirect('/')
});
/* GET home tong quan. */
router.get('/tong-quan', function(req, res, next) {
  /* user_Model.create({
    userEmail: 'chungleba.sbay@gmail.com',
    userName: "String",
    userPhone: "String",
    userHash: "String",
    userLevel: 1,
    userActive: true,
    timeCreate: Date.now(),
    timeUpdate: Date.now(),
    timelastlogin: Date.now(),
})
.then(data=>{
  console.log(data);
  res.render('tong-quan');
})
.catch(err=>{
  console.log(err);
}) */
  
});

module.exports = router;
