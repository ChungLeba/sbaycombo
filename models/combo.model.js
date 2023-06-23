const mongoose = require('mongoose');
require('dotenv').config();

try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DBSTRING);
} catch (error) {
    handleError(error);
}
// Schema
const comboSchema = new mongoose.Schema({
    name: String,
    location: String,
    code: String,
    timeCombo: String,
    priceType: Number, //1: co dinh, 2:gia tu, 3:gia lien he
    price: Number,
    priceChild: { type: Number, default: 0},
    description: String,
    active:{ type: Boolean, default: false},
    images: [],
    timeCreate: {
        type: Date,
        default: Date.now
    },
    timeUpdate: {
        type: Date,
        default: Date.now
    }
},
{collection: 'combo'}
)
// Model
const comboModel = mongoose.model('comboModel', comboSchema);

module.exports = comboModel;