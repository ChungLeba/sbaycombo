var express = require('express');
var router = express.Router();
const customerController = require('../../controllers/api/customer.controller');

/* POST API create customer. */
router.post('/create', customerController.createCustomer);

module.exports = router;
