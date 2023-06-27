var userModel = require('../../models/user.model.js');
var orderComboModel = require('../../models/orderCombo.model.js');
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
            employees: findAll,
            decoded: req.decoded
        })

    } catch (error) {
        console.log(error);
    }
};

// Get All combo processing
let getAllComboProcessing = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.find({status: 'processing'})
            .populate('product_id') // populate tại trường nào
            .populate('customer_id')
            .populate('user_id')
            .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        getItems().then(function(FoundItems) {
            // res.send({data: FoundItems});
            res.render('./manager/m-combo-processing', {
                data: FoundItems,
                decoded: req.decoded
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// Get All combo complete
let getAllComboComplete = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.find({status: 'complete'})
            .populate('product_id') // populate tại trường nào
            .populate('customer_id')
            .populate('user_id')
            .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        getItems().then(function(FoundItems) {
            res.render('./manager/m-combo-complete', {
                data: FoundItems,
                decoded: req.decoded
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// Get All combo cancel
let getAllComboCancel = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.find({status: 'cancel'})
            .populate('product_id') // populate tại trường nào
            .populate('customer_id')
            .populate('user_id')
            .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        getItems().then(function(FoundItems) {
            res.render('./manager/m-combo-cancel', {
                data: FoundItems,
                decoded: req.decoded
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    findAllEmployee: findAllEmployee,
    getAllComboProcessing: getAllComboProcessing,
    getAllComboComplete: getAllComboComplete,
    getAllComboCancel: getAllComboCancel
};