const { mongoose } = require('mongoose');
require('dotenv').config();

try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DBSTRING);
} catch (error) {
    handleError(error);
}
// Schema
const logActionComboSchema = new mongoose.Schema({
    subject: String,
    employeeName: String,
    customerName: String,
    price: Number,
    status: String, // wait: chờ xử lý, processing: đang xử lý, complete: hoàn thành, cancel: huỷ bỏ
    timeCreate: {
        type: Date,
        default: Date.now()
    },
    timeUpdate: {
        type: Date,
        default: Date.now()
    }
},
{collection: 'logActionCombo'}
)
// Model
const logActionComboModel = mongoose.model('logActionComboModel', logActionComboSchema);

module.exports = logActionComboModel;