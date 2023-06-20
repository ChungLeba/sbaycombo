var product_Model = require('../../models/product.model');

// Get all product
let getAllProduct = async(req, res) => {
    try {
        async function getItems() {
            const Items = await product_Model.find({});
            return Items;
          }

        getItems().then(function(FoundItems){
            res.send({data: FoundItems});
        });
    } catch (error) {
        console.log(error);
    }
};

// Get 3 product
let getLimitProduct = async(req, res) => {
    try {
        async function getItems() {
            const Items = await product_Model.find({}).limit(3);
            return Items;
          }

        getItems().then(function(FoundItems){
            res.send({data: FoundItems});
        });
    } catch (error) {
        console.log(error);
    }
};

// Show product
let showProduct = async(req, res) => {
    try {
        product_Model.findById(req.params.id)
        .then(FoundItem => {
            res.send({data: FoundItem});
        })
        .catch(err => {
            console.log("error show product");
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllProduct: getAllProduct,
    getLimitProduct: getLimitProduct,
    showProduct: showProduct
};