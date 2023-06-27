var orderComboModel = require('../../models/orderCombo.model');

// Get All Customer
// let getAllCustomer = async(req, res) => {
//     try {
//         async function getItems() {
//             const Items = await orderComboModel.find({status: 'wait'})
//                         .populate('product_id') // populate tại trường nào
//                         .populate('customer_id')
//                         .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
//             return Items;
//         }

//         getItems().then(function(FoundItems) {
//             res.render('./employee/e-combo-wait', {data: FoundItems});
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

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
            res.render('./employee/e-ordercombo-todo', {
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
                        .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        getItems().then(function(FoundItems) {
            // console.log(FoundItems);
            res.render('./employee/e-ordercombo-todo-processing', {
                order: FoundItems,
                decoded: req.decoded
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
                        .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        getItems().then(function(FoundItems) {
            // console.log(FoundItems);
            res.render('./employee/e-ordercombo-todo-complete', {
                order: FoundItems,
                decoded: req.decoded
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
                        .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        getItems().then(function(FoundItems) {
            // console.log(FoundItems);
            res.render('./employee/e-ordercombo-todo-cancel', {
                order: FoundItems,
                decoded: req.decoded
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    // getAllCustomer: getAllCustomer,
    oneOrderComboWait: oneOrderComboWait,
    oneOrderComboProcessing: oneOrderComboProcessing,
    oneOrderComboComplete: oneOrderComboComplete,
    oneOrderComboCancel: oneOrderComboCancel
}