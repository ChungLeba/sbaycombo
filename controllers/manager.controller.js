var userModel = require('../models/user.model.js');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');


// Read employee
let findAllEmployee = async (req, res) => {
    try {
        const findAll = await userModel.find({
            userLevel: 3
        })
        console.log(findAll[0]);
        res.render('./manager/m-employee',{
            employees: findAll
        })

    } catch (error) {
        console.log(error);
    }
};
let activeEmployee = async (req, res) => {
    try {
        const active = await userModel.findByIdAndUpdate({
            _id: req.body.userID
        },{
            userActive: true
        })
        console.log(active);
        res.json({
            noiti: 'active ok'
        })

    } catch (error) {
        console.log(error);
    }
};
let deleteEmployee = async (req, res) => {
    try {
        const active = await userModel.findByIdAndDelete({
            _id: req.body.userID
        })
        console.log(active);
        res.json({
            noiti: 'delete user ok'
        })

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    findAllEmployee: findAllEmployee,
    activeEmployee:activeEmployee,
    deleteEmployee:deleteEmployee
};