var express = require('express');
var router = express.Router();
const comboController = require('../../controllers/api/combo.controller');

<<<<<<< HEAD
/* GET API combos listing. */
router.get('/', comboController.getAllCombo);
/* GET API limit 3 combo */
=======
/* GET API products listing. */
router.get('/', comboController.getActiveCombo);
/* GET API limit 3 product */
>>>>>>> 292d72279ab23ab3085020755a5c6e7a2f635b15
router.get('/limit', comboController.getLimitCombo);
/* GET API show combo */
router.get('/show-combo/:id', comboController.showCombo);
/* GET API show remaining combo */
router.get('/remaining-combo/:id', comboController.remainingCombo);

module.exports = router;
