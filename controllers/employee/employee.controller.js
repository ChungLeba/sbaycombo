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

        const countItemWait = await orderComboModel.count({status: 'wait'})
        const countItemProcessing = await orderComboModel.count({status: 'processing', user_id: req.decoded.userID})
        const countItemComplete = await orderComboModel.count({status: 'complete', user_id: req.decoded.userID})
        const countItemCancel = await orderComboModel.count({status: 'cancel', user_id: req.decoded.userID})

        getItems().then(function(FoundItems) {
            res.render('./employee/e-combo-wait', {
                data: FoundItems,
                decoded: req.decoded,
                countWait: countItemWait,
                countProcessing: countItemProcessing,
                countComplete: countItemComplete,
                countCancel: countItemCancel,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// Get All combo processing
let getAllComboProcessing = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.find({status: 'processing', user_id: req.decoded.userID})
            .populate('product_id') // populate tại trường nào
            .populate('customer_id')
            .populate('user_id')
            .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        const countItemWait = await orderComboModel.count({status: 'wait'})
        const countItemProcessing = await orderComboModel.count({status: 'processing', user_id: req.decoded.userID})
        const countItemComplete = await orderComboModel.count({status: 'complete', user_id: req.decoded.userID})
        const countItemCancel = await orderComboModel.count({status: 'cancel', user_id: req.decoded.userID})

        getItems().then(function(FoundItems) {
            res.render('./employee/e-combo-processing', {
                data: FoundItems,
                decoded: req.decoded,
                countWait: countItemWait,
                countProcessing: countItemProcessing,
                countComplete: countItemComplete,
                countCancel: countItemCancel,
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
            const Items = await orderComboModel.find({status: 'complete', user_id: req.decoded.userID})
            .populate('product_id') // populate tại trường nào
            .populate('customer_id')
            .populate('user_id')
            .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        const countItemWait = await orderComboModel.count({status: 'wait'})
        const countItemProcessing = await orderComboModel.count({status: 'processing', user_id: req.decoded.userID})
        const countItemComplete = await orderComboModel.count({status: 'complete', user_id: req.decoded.userID})
        const countItemCancel = await orderComboModel.count({status: 'cancel', user_id: req.decoded.userID})

        getItems().then(function(FoundItems) {
            res.render('./employee/e-combo-complete', {
                data: FoundItems,
                decoded: req.decoded,
                countWait: countItemWait,
                countProcessing: countItemProcessing,
                countComplete: countItemComplete,
                countCancel: countItemCancel,
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
            const Items = await orderComboModel.find({status: 'cancel', user_id: req.decoded.userID})
            .populate('product_id') // populate tại trường nào
            .populate('customer_id')
            .populate('user_id')
            .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        const countItemWait = await orderComboModel.count({status: 'wait'})
        const countItemProcessing = await orderComboModel.count({status: 'processing', user_id: req.decoded.userID})
        const countItemComplete = await orderComboModel.count({status: 'complete', user_id: req.decoded.userID})
        const countItemCancel = await orderComboModel.count({status: 'cancel', user_id: req.decoded.userID})

        getItems().then(function(FoundItems) {
            res.render('./employee/e-combo-cancel', {
                data: FoundItems,
                decoded: req.decoded,
                countWait: countItemWait,
                countProcessing: countItemProcessing,
                countComplete: countItemComplete,
                countCancel: countItemCancel,
            });
        });
    } catch (error) {
        res.status(500).json({error: error});
    }
}

module.exports = {
    getAllComboWait: getAllComboWait,
    getAllComboProcessing: getAllComboProcessing,
    getAllComboComplete: getAllComboComplete,
    getAllComboCancel: getAllComboCancel
};