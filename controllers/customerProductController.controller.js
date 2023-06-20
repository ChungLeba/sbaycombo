// var customerModel = require('../models/customer.model');
var customerProductModel = require('../models/customerProduct.model');

// Get All Customer
let getAllCustomer = async(req, res) => {
    try {
        async function getItems() {
            const Items = await customerProductModel.find({})
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

module.exports = {
    'getAllCustomer': getAllCustomer
}