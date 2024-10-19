const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
// const { productModel } = require('../models/'); // Adjust the path accordingly

const getAllProducts = async (req, res) => {
  try {
    let products = await productModel.find();
    return res.status(200).json({
      ok: true,
      message: "Products retrieved successfully",
      payload: products,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Internal Server Error",
      payload: null,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    let { id } = req.params;
    let product = await productModel.findById(id);
    if (!product) {
      return res.status(400).json({
        ok: false,
        message: "Product not found",
        payload: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Internal Server Error",
      payload: null,
    });
  }
};

const purchaseProduct = async (req, res) => {
    console.log(req.body);
    try {
      const { user, items } = req.body;
      const { username, email } = user;
  
      // Retrieve user from database
      const userRecord = await userModel.findOne({ email });
      if (!userRecord) {
        return res.status(404).json({
          auth:true,
          ok: false,
          message: "User not found",
          payload: null,
        });
      }
  console.log("user is ok ")
      
      const orderHistoryEntries = [];
      let total = 0;
  
      for (const item of items) {
        let id = item.id
        const product = await productModel.findOne({id});
        const orderId = Math.floor(Math.random() * 1000000);
        console.log("item",item)
        if (!product) {
          return res.status(400).json({
            auth:true,
            ok: false,
            message: `Product with ID ${item.id} not found`,
            payload: null,
          });
        }
        if (product.quantity < item.quantity) {
          return res.status(400).json({
            auth:true,
            ok: false,
            message: `Insufficient quantity for product ${product.name}`,
            payload: null,
          });
        }
  
        
        product.quantity -= item.quantity;
        await product.save();
  
        
        const itemTotal = item.quantity * product.price;
        total += itemTotal;
  
        
        orderHistoryEntries.push({
          productId: product._id,
          productName: product.title,
          quantity: item.quantity,
          price: product.price,
          total: itemTotal,
          date: new Date(),
          orderId,
        });
      }
      
  
      userRecord.orderHistory.push({
        username,
        email,
        total,
        items: orderHistoryEntries,
      });
      await userRecord.save();
  
      // Send success response
      return res.status(200).json({
        auth:true,
        ok: true,
        message: "Products purchased successfully and user history updated",
        payload: null,
      });
  
    } catch (error) {
      console.error("Error in purchaseProduct:", error);
      return res.status(500).json({
        ok: false,
        message: "Internal Server Error",
        payload: null,
      });
    }
  };
  
  

module.exports = {
  getAllProducts,
  getProductById,
  purchaseProduct,
};
