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
    product_id: [{ type: Schema.Types.ObjectId, ref: 'comboModel' }],
    status: { type: String, default: 'wait' }, //wait: chờ xử lý, processing: đang xử lý, complete: hoàn thành, cancel: huỷ
    timeCreate: {
        type: Date,
        default: Date.now()
    },
    timeUpdate: {
        type: Date,
        default: Date.now()
    },
    user_id: [{ type: Schema.Types.ObjectId, ref: 'userModel' }], //ref tới model user
    timeCreateEmployee: {
        type: Date
    },
    timeUpdateEmployee: {
        type: Date
    }
},
{collection: 'orderCombo'}
)
// Model
const customerProductModel = mongoose.model('customerProductModel', customerProductSchema);

module.exports = customerProductModel;