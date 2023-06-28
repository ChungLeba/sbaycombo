// var customerModel = require('../models/customer.model');
var orderComboModel = require('../../models/orderCombo.model');
var userModel = require('../../models/user.model');

// Get All Customer
let getAllCustomer = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.find({status: 'wait'})
                        .populate('product_id') // populate tại trường nào
                        .populate('customer_id')
                        .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        const countItemWait = await orderComboModel.count({status: 'wait'})
        const countItemProcessing = await orderComboModel.count({status: 'processing'})
        const countItemComplete = await orderComboModel.count({status: 'complete'})
        const countItemCancel = await orderComboModel.count({status: 'cancel'})

        getItems().then(function(FoundItems) {
            res.render('./manager/m-combo-wait', {
                data: FoundItems,
                decoded: req.decoded,
                countWait: countItemWait,
                countProcessing: countItemProcessing,
                countComplete: countItemComplete,
                countCancel: countItemCancel
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// Get 1 orderCombo wait
let oneOrderComboWait = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.findById(req.params.id)
                        .populate('product_id') // populate tại trường nào
                        .populate('customer_id')
                        .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        getItems().then(function(FoundItems) {
            console.log(FoundItems);
            res.render('./manager/m-ordercombo-todo', {
                order: FoundItems,
                decoded: req.decoded
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// Get 1 orderCombo processing
let oneOrderComboProcessing = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.findById(req.params.id)
                        .populate('product_id') // populate tại trường nào
                        .populate('customer_id')
                        .populate('user_id')
                        .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        const users = await userModel.find({userActive: 'true'}).sort({'timeCreate': 'desc'});

        getItems().then(function(FoundItems) {
            console.log(FoundItems);
            res.render('./manager/m-ordercombo-todo-processing', {
                order: FoundItems,
                decoded: req.decoded,
                users: users
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// Get 1 orderCombo complete
let oneOrderComboComplete = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.findById(req.params.id)
                        .populate('product_id') // populate tại trường nào
                        .populate('customer_id')
                        .populate('user_id')
                        .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        const users = await userModel.find({userActive: 'true'}).sort({'timeCreate': 'desc'});

        getItems().then(function(FoundItems) {
            console.log(FoundItems);
            res.render('./manager/m-ordercombo-todo-complete', {
                order: FoundItems,
                decoded: req.decoded,
                users: users
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// Get 1 orderCombo cancel
let oneOrderComboCancel = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.findById(req.params.id)
                        .populate('product_id') // populate tại trường nào
                        .populate('customer_id')
                        .populate('user_id')
                        .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        getItems().then(function(FoundItems) {
            console.log(FoundItems);
            res.render('./manager/m-ordercombo-todo-cancel', {
                order: FoundItems,
                decoded: req.decoded
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllCustomer: getAllCustomer,
    oneOrderComboWait: oneOrderComboWait,
    oneOrderComboProcessing: oneOrderComboProcessing,
    oneOrderComboComplete: oneOrderComboComplete,
    oneOrderComboCancel: oneOrderComboCancel
}