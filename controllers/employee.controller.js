var userModel = require('../models/user.model.js');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');


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
module.exports = {
    createUser: createUser,
    loginUser: loginUser
};