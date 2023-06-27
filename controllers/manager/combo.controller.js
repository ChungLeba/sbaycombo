var comboModel = require('../../models/combo.model');
var orderComboModel = require('../../models/orderCombo.model');

var logActionEmployeeModel = require('../../models/logActionEmployee.model');
// Get active combo
let getActiveCombo = async (req, res) => {
    //console.log('abc:'+ req.decoded.userID);

    try {
        var today = new Date();
        var last30day = new Date(new Date().setDate(today.getDate() - 30));

        const comboActive = await comboModel.find({
            active: true })

       
        
        const dataLogs = await logActionEmployeeModel.find({}).sort({'timeCreate': 'desc'}).limit(5);
        
        
        
        const comboActivity = await orderComboModel.find({
            timeCreate: {
                $gte:last30day
            }
        })
            .sort({
                timeUpdate: 'desc'
            })
            .populate('user_id')
        /*  */
        console.log(comboActivity[0]);

        res.render('./manager/m-dashboard', {
            data: comboActive,
            decoded: req.decoded,
            dataLogs: dataLogs,
            comboActivity: comboActivity,

        })

    } catch (error) {
        console.log(error);
    }
};

// Get all combo
let getAllCombo = async (req, res) => {
    try {
        async function getItems() {
            const Items = await comboModel.find({

            });
            return Items;
        }
        getItems().then(function (FoundItems) {
            //console.log(FoundItems);
            res.render('./manager/m-allCombos.ejs', {
                data: FoundItems,
                decoded: req.decoded
            })
        });
    } catch (error) {
        console.log(error);
    }
};

// Create new product
let createCombo = async (req, res) => {
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
            priceChild: req.body.priceChild,
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

// Read to view product
let readToViewCombo = async (req, res) => {
    try {
        comboModel.findById(req.params.id)
            .then(FoundItem => {
                res.render('./manager/m-read-combo', {
                    data: FoundItem,
                    decoded: req.decoded
                });
            })
            .catch(err => {
                console.log("error");
            });
    } catch (error) {
        console.log(error);
    }
}
// Read to update product
let readToUpdateCombo = async (req, res) => {
    try {
        comboModel.findById(req.params.id)
            .then(FoundItem => {
                console.log("Edit product", FoundItem);
                res.render('./manager/m-update-combo', {
                    data: FoundItem,
                    decoded: req.decoded
                });
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
            { new: true })
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
/* Active */
let activeCombo = async (req, res) => {
    try {

        await comboModel.findByIdAndUpdate(
            req.body.id,
            {
                active: true
            },
            { new: true })
            .then(product => {
                res.json({ noiti: 'active' })
            })
            .catch(err => {
                res.status(500).send(err);
            })
    } catch (error) {
        console.log(error);
    }
}
/* Deactive */
let deactiveCombo = async (req, res) => {
    try {

        await comboModel.findByIdAndUpdate(
            req.body.id,
            {
                active: false
            },
            { new: true })
            .then(product => {
                res.json({ noiti: 'deactive' })
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
        res.json({ noiti: 'deleted' });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("There was a problem deleting the product.");
    }
}

module.exports = {
    getActiveCombo: getActiveCombo,
    getAllCombo: getAllCombo,
    createCombo: createCombo,
    readToViewCombo: readToViewCombo,
    readToUpdateCombo: readToUpdateCombo,
    updateCombo: updateCombo,
    activeCombo: activeCombo,
    deactiveCombo: deactiveCombo,
    deleteCombo: deleteCombo
};