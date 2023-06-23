// var customerModel = require('../models/customer.model');
var orderComboModel = require('../models/orderCombo.model');

// Get All Customer
let getAllCustomer = async(req, res) => {
    try {
        async function getItems() {
            const Items = await orderComboModel.find({})
            .populate('product_id') // populate tại trường nào
            .populate('customer_id')
            .sort({'timeCreate': 'desc'}); // sắp xếp theo thứ tự mới nhất -> cũ nhất
            return Items;
        }

        getItems().then(function(FoundItems) {
            // res.send({data: FoundItems});
            res.render('./manager/m-combo-wait', {data: FoundItems});
        });
    } catch (error) {
        console.log(error);
    }
}

// Get 1 orderCombo
let oneOrderCombo = async(req, res) => {
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
            res.render('./manager/m-ordercombo-todo', {order: FoundItems});
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    'getAllCustomer': getAllCustomer,
    oneOrderCombo:oneOrderCombo
}