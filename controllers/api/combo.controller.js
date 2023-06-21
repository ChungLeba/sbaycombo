var comboModel = require('../../models/combo.model');

// Get all combo
let getActiveCombo = async(req, res) => {
    try {
        async function getItems() {
            const Items = await comboModel.find({});
            return Items;
          }

        getItems().then(function(FoundItems){
            res.send({data: FoundItems});
        });
    } catch (error) {
        console.log(error);
    }
};

// Get 3 combo
let getLimitCombo = async(req, res) => {
    try {
        async function getItems() {
            const Items = await comboModel.find({}).limit(3);
            return Items;
          }

        getItems().then(function(FoundItems){
            res.send({data: FoundItems});
        });
    } catch (error) {
        console.log(error);
    }
};

// Show combo
let showCombo = async(req, res) => {
    try {
        comboModel.findById(req.params.id)
        .then(FoundItem => {
            res.send({data: FoundItem});
        })
        .catch(err => {
            console.log("error show combo");
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getActiveCombo: getActiveCombo,
    getLimitCombo: getLimitCombo,
    showCombo: showCombo
};