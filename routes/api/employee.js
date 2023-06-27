var express = require('express');
var router = express.Router();
const orderComboController = require('../../controllers/api/orderCombo.controller');

/* POST API update status combo */
router.post('/updateStatus/:id', orderComboController.updateSatusOrderCombo);

module.exports = router;
