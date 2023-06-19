var express = require('express');
var router = express.Router();
const customerController = require('../../controllers/api/customerController.controller');

/* POST API create customer. */
router.post('/create', customerController.saveCustomer);

module.exports = router;
