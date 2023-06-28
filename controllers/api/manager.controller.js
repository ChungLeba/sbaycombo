var orderComboModel = require('../../models/orderCombo.model');

let updateUserIdCombo = async(req, res) => {
    try {
        await orderComboModel.findByIdAndUpdate(
            req.params.id,
            {
                user_id: req.body.user_id,
            },
            { new: true })
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    updateUserIdCombo: updateUserIdCombo
}