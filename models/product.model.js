const mongoose = require('mongoose');
require('dotenv').config();

try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DBSTRING);
} catch (error) {
    handleError(error);
}
// Schema
const productSchema = new mongoose.Schema({
    name: String,
    location: String,
    code: String,
    timeCombo: String,
    priceType: Number,
    price: Number,
    description: String,
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
{collection: 'product'}
)
// Model
const productModel = mongoose.model('productModel', productSchema);

module.exports = productModel;