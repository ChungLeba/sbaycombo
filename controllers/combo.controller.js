var comboModel = require('../models/combo.model');

// Get all product
let getAllCombo = async(req, res) => {
    try {
        async function getItems() {
            const Items = await comboModel.find({});
            return Items;
          }

        getItems().then(function(FoundItems){
            res.render('./manager/m-dashboard', {data: FoundItems})
        });
    } catch (error) {
        console.log(error);
    }
};

// Create new product
let createCombo = async(req, res) => {
    try {
        var imageUploads = [];
        for (var i = 0; i < req.files.length; i++) {
            imageUploads.push(req.files[i].filename)
        }
            
        comboModel.create({
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

// Read product
let readCombo = async(req, res) => {
    try {
        comboModel.findById(req.params.id)
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
let updateCombo = async (req, res) => {
    try {
        var imageUploads = [];
        for (var i = 0; i < req.files.length; i++) {
            imageUploads.push(req.files[i].filename)
        }
        if (imageUploads.length == 0) {
            await comboModel.findById(req.params.id)
                                        .then(FoundItem => {
                                            imageUploads = FoundItem.images;
                                        })
                                        .catch(err => {
                                            console.log("error edit product");
                                        });
        }
        await comboModel.findByIdAndUpdate(
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
let deleteCombo = async (req, res) => {
    try {
        await comboModel.findByIdAndDelete(req.params.id);
        res.redirect("/manager");
    } catch (error) {
        console.log("error", error);
        res.status(500).send("There was a problem deleting the product.");
    }
}

module.exports = {
    getAllCombo: getAllCombo,
    createCombo: createCombo,
    readCombo: readCombo,
    updateCombo: updateCombo,
    deleteCombo: deleteCombo
};