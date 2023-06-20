const { mongoose } = require('mongoose');
require('dotenv').config();

try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DBSTRING);
} catch (error) {
    handleError(error);
}
// Schema
const customerSchema = new mongoose.Schema({
    name: String,
    numberAudult: Number,
    numberChildren: Number,
    email: String,
    departureDay: Date,
    arrivalDate: Date,
    phone: Number,
    departurePlace: String,
    otherRequirements: String
},
{collection: 'customer'}
)
// Model
const customerModel = mongoose.model('customerModel', customerSchema);

module.exports = customerModel;