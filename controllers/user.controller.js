var userModel = require('../models/user.model.js');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
const session = require('express-session');

// Create User
let createUser = async (req, res) => {
    try {
        /* Hash */
        // Creating a unique salt for a particular user
        let salt = crypto.randomBytes(16).toString('hex');
        //console.log(salt);
        // Hashing user's salt and password with 1000 iterations,
        let hash = crypto.pbkdf2Sync(req.body.password, salt,
            1000, 64, `sha512`).toString(`hex`);

        //console.log(req.body, salt, hash);
        const findacc = await userModel.findOne({
            userPhone: req.body.userPhone
        })
        console.log(findacc);
        if (findacc != null) {
            res.json({ noiti: 'Found' })
        } else {
            const create = await userModel.create({
                userEmail: req.body.userEmail,
                userName: req.body.userName,
                userPhone: req.body.userPhone,
                userSalt: salt,
                userHash: hash,
                userLevel: 3,
                userActive: false,
                timeCreate: Date.now(),
                timeUpdate: Date.now(),
                timelastlogin: Date.now(),
            })
            if (create._id) {
                res.json({
                    noiti: 'success'
                })
            }
            //console.log(create);
            /*  */
        }



    } catch (error) {
        console.log(error);
    }
};

// Login User
let loginUser = async (req, res) => {
    try {
        const findAcc =
            await
                userModel.findOne({
                    userPhone: req.body.userPhone,

                })
        // console.log('findAcc: ', findAcc);
        if (findAcc == null) {
            res.json({ 'noiti': 'Số điện thoại chưa đăng ký' })
        } else if (findAcc.userLevel) {
            // Hashing calculato,
            const hash = crypto.pbkdf2Sync(req.body.password, findAcc.userSalt,
                1000, 64, `sha512`).toString(`hex`);

            /* Check Hash */
            const checkHash = await userModel.findOne({userHash: hash, userPhone: req.body.userPhone});
            
            console.log(checkHash);
            if (checkHash) {
                console.log('checkHash', checkHash);
                var token = jwt.sign({ 
                    userID: checkHash._id,
                    userName: checkHash.userName,
                    userLevel: checkHash.userLevel }, process.env.CookiesSecretKey);
                res.cookie('SbayComboEtoken', token)
                if(checkHash.userLevel == 3){
                    res.json({ 'noiti': 'Employee login ok' })
                } else if(checkHash.userLevel == 2){
                    res.json({ 'noiti': 'Manager login ok' })
                }
                
                //res.end('Dang nhap thanh cong')
            } else {
                res.json({ 'noiti': 'Sai mat khau' })
            }

        }
    } catch (error) {
        console.log(error);
    }
};

/* Check login */
const checkloginManager = function (req, res, next) {
    if (req.cookies.SbayManagertoken) {
      var decoded = jwt.verify(req.cookies.SbayManagertoken, process.env.CookiesSecretKey);
      console.log(decoded);
      if (decoded.userID && decoded.userLevel) {
        req.decoded = decoded
        next()
      }
    } else {
      res.redirect('/dang-nhap')
    }
}

module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    checkloginManager: checkloginManager
};