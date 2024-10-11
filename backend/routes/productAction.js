const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:id"), productController.getProductById;
//router.get("/purchase",authentication, authorisation("user"), productController.purchaseProduct);

module.exports = router;
