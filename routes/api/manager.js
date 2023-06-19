var express = require('express');
var router = express.Router();
const productController = require('../../controllers/api/productController.controller');

/* GET API products listing. */
router.get('/', productController.getAllProduct);
/* GET API show product */
router.get('/show-combo/:id', productController.showProduct);

module.exports = router;
