var orderComboModel = require('../../models/orderCombo.model');
// const nodemailer = require('nodemailer');
var configSendMail = require('../../config/sendMail');

// Update status order combo
let updateSatusOrderCombo = async (req, res) => {
    try {
        const checkOrderCombo = await orderComboModel.findById(req.params.id);
        if (!checkOrderCombo.timeCreateEmployee) {
            const OrderComboEmptyDateEmployee = await orderComboModel.findByIdAndUpdate(req.params.id, {
                status: req.body.status,
                user_id: req.body.user_id,
                timeCreateEmployee: Date.now(),
                timeUpdateEmployee: Date.now()
            });
            console.log(OrderComboEmptyDateEmployee);
            res.json({data: OrderComboEmptyDateEmployee});
        } else {
            const OrderComboNotEmptyDateEmployee = await orderComboModel.findByIdAndUpdate(req.params.id, {
                status: req.body.status,
                user_id: req.body.user_id,
                timeUpdateEmployee: Date.now()
            });
            res.json({data: OrderComboNotEmptyDateEmployee});
        }
        const customers = await orderComboModel.findById(req.params.id)
                        .populate('product_id')
                        .populate('customer_id');
        if (req.body.status == 'complete') {
            // setup email data
            let mailOptions = {
                from: '"SBAY VN" <vansang1532000@gmail.com>', // sender address
                to: customers.customer_id[0].email, // receiver's email address
                subject: 'Hello', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Đăng ký combo thành công?</b>' // html body
            };
        
            // send mail with defined transport object
            try {
                let info = await configSendMail.transporter.sendMail(mailOptions);
                res.json('Email sent!');
            } catch (error) {
                res.status(500).json({error: error});
            }
        }
        if (req.body.status == 'cancel') {
            // setup email data
            let mailOptions = {
                from: '"SBAY VN" <vansang1532000@gmail.com>', // sender address
                to: customers.customer_id[0].email, // receiver's email address
                subject: 'Hello', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Huỷ combo thành công?</b>' // html body
            };
        
            // send mail with defined transport object
            try {
                let info = await configSendMail.transporter.sendMail(mailOptions);
                res.json('Email sent!');
            } catch (error) {
                res.status(500).json({error: error});
            }
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
}

module.exports = {
    updateSatusOrderCombo: updateSatusOrderCombo
}