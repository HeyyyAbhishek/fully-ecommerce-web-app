const express = require('express');
const router = express.Router();
const authentication = require('../service/security/authentication');
const authorisation = require('../service/security/authorisation');

const sellerController = require('../controllers/sellerController');

router.get("/profile",authentication,authorisation("seller"),sellerController.sellerProfile);
router.post("/createProduct",sellerController.createProduct);
router.put("/updateProduct",authentication,authorisation("seller"),sellerController.updateProduct);
router.delete("/deleteProduct",authentication,authorisation("seller"),sellerController.deleteProduct);
// router.get("/viewProduct",authentication,authorisation("seller"),sellerController.viewProduct);
 
module.exports = router;