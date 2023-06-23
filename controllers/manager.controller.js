var userModel = require('../models/user.model.js');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');


// Read employee
let findAllEmployee = async (req, res) => {
    try {
        const findAll = await userModel.find({
            userLevel: 3
        })
        console.log(findAll.length);
        res.render('./manager/m-employee',{
            employees: findAll
        })

    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    findAllEmployee: findAllEmployee,
};