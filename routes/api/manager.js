var express = require('express');
var router = express.Router();
const comboController = require('../../controllers/api/combo.controller');
const orderComboController = require('../../controllers/api/orderCombo.controller');

/* GET API products listing. */
router.get('/', comboController.getActiveCombo);
/* GET API limit 3 product */
router.get('/limit', comboController.getLimitCombo);
/* GET API limit 1 product */
router.get('/limit1', comboController.getLimit1Combo);
/* GET API limit 4 product */
router.get('/limit4', comboController.getLimit4Combo);
/* GET API show combo */
router.get('/show-combo/:id', comboController.showCombo);
/* GET API show remaining combo */
router.get('/remaining-combo/:id', comboController.remainingCombo);
/* POST API update status combo */
router.post('/updateStatus/:id', orderComboController.updateSatusOrderCombo);

module.exports = router;
