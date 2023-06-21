var express = require('express');
var router = express.Router();
const comboController = require('../../controllers/api/combo.controller');

/* GET API products listing. */
router.get('/', comboController.getActiveCombo);
/* GET API limit 3 product */
router.get('/limit', comboController.getLimitCombo);
/* GET API show combo */
router.get('/show-combo/:id', comboController.showCombo);
/* GET API show remaining combo */
router.get('/remaining-combo/:id', comboController.remainingCombo);

module.exports = router;
