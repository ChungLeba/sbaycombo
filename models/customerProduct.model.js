const { mongoose, Schema } = require('mongoose');
require('dotenv').config();

try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DBSTRING);
} catch (error) {
    handleError(error);
}
// Schema
const customerProductSchema = new mongoose.Schema({
    customer: [{ type: Schema.Types.ObjectId, ref: 'customer' }],
    product: [{ type: Schema.Types.ObjectId, ref: 'product' }]

},
{collection: 'customer_product'}
)
// Model
const customerProductModel = mongoose.model('customerProductModel', customerProductSchema);

module.exports = customerProductModel;