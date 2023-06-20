var express = require('express');
var router = express.Router();
const comboController = require('../../controllers/api/combo.controller');

/* GET API products listing. */
router.get('/', comboController.getAllCombo);
/* GET API limit 3 product */
router.get('/limit', comboController.getLimitCombo);
/* GET API show product */
router.get('/show-combo/:id', comboController.showCombo);

module.exports = router;
