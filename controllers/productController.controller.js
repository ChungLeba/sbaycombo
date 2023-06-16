var product_Model = require('../models/product.model');

// Get all product
let getAllProduct = async(req, res) => {
    try {
        async function getItems() {
            const Items = await product_Model.find({});
            return Items;
          }

        getItems().then(function(FoundItems){
            res.render('./manager/m-dashboard', {data: FoundItems})
        });
    } catch (error) {
        console.log(error);
    }
};

// Save new product
let saveProduct = async(req, res) => {
    try {
        var imageUploads = [];
        for (var i = 0; i < req.files.length; i++) {
            imageUploads.push(req.files[i].filename)
        }
            
        product_Model.create({
            name: req.body.name,
            location: req.body.location,
            code: req.body.code,
            timeCombo: req.body.timeCombo,
            priceType: req.body.priceType,
            price: req.body.price,
            description: req.body.description,
            images: imageUploads
        })
        .then(data => {
            res.redirect("add-combo");
        })
        .catch(err => {
            console.log("error");
        })
    } catch (error) {
        console.log(error);
    }
};

// Edit product
let editProduct = async(req, res) => {
    try {
        product_Model.findById(req.params.id)
        .then(FoundItem => {
            console.log("Edit product", FoundItem);
            res.render('./manager/m-update-combo', {data: FoundItem});
        })
        .catch(err => {
            console.log("error edit product");
        });
    } catch (error) {
        console.log(error);
    }
}

// Update product
let updateProduct = async (req, res) => {
    try {
        var imageUploads = [];
        for (var i = 0; i < req.files.length; i++) {
            imageUploads.push(req.files[i].filename)
        }
        if (imageUploads.length == 0) {
            await product_Model.findById(req.params.id)
                                        .then(FoundItem => {
                                            console.log("Edit product", FoundItem.images);
                                            // {data: FoundItem};
                                    
                                            imageUploads = FoundItem.images;
                                        })
                                        .catch(err => {
                                            console.log("error edit product");
                                        });
        }
        await product_Model.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name, 
                location: req.body.location,
                code: req.body.code,
                timeCombo: req.body.timeCombo,
                priceType: req.body.priceType,
                price: req.body.price,
                description: req.body.description,
                images: imageUploads
            },
            {new: true})
            .then(product => {
                res.redirect("/manager");
            })
            .catch(err => {
                res.status(500).send(err);
            })
    } catch (error) {
        console.log(error);
    }
}

// Delete product
let deleteProduct = async (req, res) => {
    try {
        await product_Model.findByIdAndDelete(req.params.id);
        res.redirect("/manager");
    } catch (error) {
        console.log("error", error);
        res.status(500).send("There was a problem deleting the product.");
    }
}

module.exports = {
    getAllProduct: getAllProduct,
    saveProduct: saveProduct,
    editProduct: editProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
};