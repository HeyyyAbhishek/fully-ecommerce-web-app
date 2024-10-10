const express = require('express');
const router = express.Router();//change handler to this router
const productController = require('../controllers/productController');
const authorisation = require('../service/security/authorisation');
const authentication = require("../service/security/authentication");


router.get("products/cart/get",authentication,authorisation("user"),(req,res)=>productController.getCart(req,res));
router.get("products/cart/create",authentication,authorisation("user"),(req,res)=>productController.createCart(req,res));