const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authorisation = require('../service/security/authorisation');
const authentication = require('../service/security/authentication');

router.get("/products",authentication, authorisation("user"), productController.getAllProducts);
router.get("/products/:id",authentication, authorisation("user"), productController.getProductById);
router.get("/purchase",authentication, authorisation("user"), productController.purchaseProduct);

module.exports = router;
