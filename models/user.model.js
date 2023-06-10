const mongoose = require('mongoose');
require('dotenv').config()

try {
    mongoose.set("strictQuery", false);

mongoose.connect(process.env.DBSTRING);

} catch (error) {
    handleError(error);
}
// Schema
const userSchema = new mongoose.Schema({
    userEmail: String,
    userName: String,
    userPhone: String,
    userHash: String,
    userLevel: Number,
    userActive: Boolean,
    timeCreate: Date,
    timeUpdate: Date,
    timelastlogin: Date,
},
{collection:'user'}
)
// Model
const userModel = mongoose.model('userModel',userSchema)


module.exports = userModel