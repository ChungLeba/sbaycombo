var customerModel = require('../models/customer.model');
// var customerProductModel = require('../models/customerProduct.model');

// Get All Customer
let getAllCustomer = async(req, res) => {
    try {
        async function getItems() {
            const Items = await customerModel.find({}).populate('product').exec();
            return Items;
        }

        getItems().then(function(FoundItems) {
            res.render('./manager/m-combo-wait', {data: FoundItems});
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    'getAllCustomer': getAllCustomer
}