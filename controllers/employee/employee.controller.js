var orderComboModel = require('../../models/orderCombo.model.js');

// GEt All combo wait
let getAllComboWait = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.find({status: 'wait'})
                        .populate('product_id') // populate tại trường nào
                        .populate('customer_id')
                        .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        getItems().then(function(FoundItems) {
            res.render('./employee/e-combo-wait', {data: FoundItems});
        });
    } catch (error) {
        console.log(error);
    }
}

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
            res.render('./employee/e-combo-processing', {data: FoundItems});
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
            res.render('./employee/e-combo-complete', {data: FoundItems});
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
            res.render('./employee/e-combo-cancel', {data: FoundItems});
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllComboWait: getAllComboWait,
    getAllComboProcessing: getAllComboProcessing,
    getAllComboComplete: getAllComboComplete,
    getAllComboCancel: getAllComboCancel
};