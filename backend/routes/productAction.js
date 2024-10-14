const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");
const  authentication= require("../service/security/authentication");
const  authorisation  = require("../service/security/authorisation");

router.get("/", productController.getAllProducts);
router.get("/:id"), productController.getProductById;
router.post("/purchase",authentication,authorisation("user"), productController.purchaseProduct);

module.exports = router;
