const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'vansang1532000@gmail.com',
        pass: 'qtpvaimzxtcsrkip'
    }
});

module.exports = {
    transporter: transporter
}