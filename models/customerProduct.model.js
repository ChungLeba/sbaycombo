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
    customer_id: [{ type: Schema.Types.ObjectId, ref: 'customerModel' }], //ref tới model
    product_id: [{ type: Schema.Types.ObjectId, ref: 'productModel' }],
    status: Number //1: chờ xử lý, 2: đang xử lý, 3: hoàn thành, 4: huỷ

},
{collection: 'customer_product'}
)
// Model
const customerProductModel = mongoose.model('customerProductModel', customerProductSchema);

module.exports = customerProductModel;