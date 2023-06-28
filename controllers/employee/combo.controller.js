var comboModel = require('../../models/combo.model');
var orderComboModel = require('../../models/orderCombo.model.js');

// Get all combo
let getAllCombo = async(req, res) => {
    try {
        async function getItems() {
            const Items = await comboModel.find({active: true});
            return Items;
        }

        const countItemWait = await orderComboModel.count({status: 'wait'})
        const countItemProcessing = await orderComboModel.count({status: 'processing', user_id: req.decoded.userID})
        const countItemComplete = await orderComboModel.count({status: 'complete', user_id: req.decoded.userID})
        const countItemCancel = await orderComboModel.count({status: 'cancel', user_id: req.decoded.userID})
        const comboActive = await comboModel.find({
            active: true })


        getItems().then(function(FoundItems){
            //console.log(FoundItems);
            res.render('./employee/e-dashboard', {
                data: FoundItems,
                decoded: req.decoded,
                countWait: countItemWait,
                countProcessing: countItemProcessing,
                countComplete: countItemComplete,
                countCancel: countItemCancel,
                comboActive:comboActive
            })
        });
    } catch (error) {
        console.log(error);
    }
};
// Read to view product
let readToViewCombo = async (req, res) => {
    try {
        comboModel.findById(req.params.id)
            .then(FoundItem => {
                res.render('./employee/e-read-combo', {
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
module.exports = {
    getAllCombo: getAllCombo,
    readToViewCombo: readToViewCombo,
};