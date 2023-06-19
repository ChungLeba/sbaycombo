var customer_Model = require('../../models/customer.model');
var customerProduct_Model = require('../../models/customerProduct.model');

// Save new customer
let saveCustomer = async(req, res) => {
    try {
        customer_Model.create({
            name: req.body.name,
            numberAudult: req.body.numberAudult,
            numberChildren: req.body.numberChildren,
            email: req.body.email,
            departureDay: req.body.departureDay,
            arrivalDate: req.body.arrivalDate,
            phone: req.body.phone,
            departurePlace: req.body.departurePlace,
            otherRequirements: req.body.otherRequirements
        })
        .then(data => {
            res.send(data);
            customerProduct_Model.create({
                customer: data._id,
                product: req.body.productId,
                status: 1
            })
        })
        .catch(err => {
            console.log("error");
        })
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    saveCustomer: saveCustomer
}