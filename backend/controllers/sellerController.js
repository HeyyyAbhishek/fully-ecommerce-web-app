const productModel = require("../models/productModel");
const sellerModel = require("../models/sellerModel");

const createProduct = async (req, res) => {
    try{
        const product = req.body;
        console.log(product);
        const sellerId = product.seller
        
        // Check if a product with the same ID exists
        const {id,username,email,isSeller} = req.signedCookies.user;
        console.log("User:",id,username,email,isSeller);
        const existingProductCount = await productModel.countDocuments({ id: product.id });
        if (existingProductCount > 0) {
            return res.status(400).json({
                ok: false,
                message: "Product with this ID already exists",
                payload: null,
            });
        }

        if (!isSeller) {
            return res.status(403).json({
                ok: false,
                message: "Only sellers can add products",
                payload: null,
            });
        }

  

        // Create the product
        const newProduct = await productModel.create(product);

        if (!newProduct) {
            return res.status(400).json({
                ok: false,
                message: "Failed to create product",
                payload: null,
            });
        }
        const seller = await sellerModel.findById(sellerId);
        if(!seller){
            return res.status(400).json({
                ok: false,
                message: "Seller not found",
                payload: null,
            });
        }
        await sellerModel.findByIdAndUpdate(sellerId,{ $push: { listedProducts: newProduct._id } });
        
        return res.status(201).json({
            ok: true,
            message: "Product added successfully",
            payload: newProduct,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            payload: null,
        });
    }
};


const updateProduct = async (req, res) => {
    try{
        let { id } = req.params;
        let product = await productModel.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(400).json({
                ok: false,
                message: "Product not found",
                payload: null,
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Product updated successfully",
            payload: product,
        });
    }catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            payload: null,
        });
    }
}
const deleteProduct = async (req, res) => {
    try {
      const sellerId = req.body.data.seller;  // Correctly using `sellerId`
      const productId = req.body.data.product; // Correctly using `productId`
  
      console.log("Seller:", sellerId);
      console.log("Product:", productId);
  
      let product = await productModel.findById(productId);
  
      if (!product) {
        return res.status(400).json({
          ok: false,
          message: "Product not found",
          payload: null,
        });
      }
  
      // Find the seller by sellerId
      const seller = await sellerModel.findById(sellerId);
  
      if (!seller) {
        return res.status(400).json({
          ok: false,
          message: "Seller not found",
          payload: null,
        });
      }
  
      // Check if the seller matches the product's seller field
      if (product.seller.toString() !== sellerId) {
        return res.status(403).json({
          ok: false,
          message: "Unauthorized action: Seller does not own this product",
          payload: null,
        });
      }
  
      
      if (seller.listedProducts.includes(productId)) {
        await sellerModel.findByIdAndUpdate(sellerId, {
          $pull: { listedProducts: productId }, 
        });
      }
  
      // Delete the product from productModel
      await productModel.findByIdAndDelete(productId);
  
      return res.status(200).json({
        ok: true,
        message: "Product deleted successfully",
        payload: product,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        message: "Internal Server Error",
        payload: null,
      });
    }
  };
  
  

const sellerProfile = async (req, res) => {
    try {
      const seller = req.signedCookies.user;
      const {email,username,id,token,account_type} = seller;
      if (!seller) {
        return res.status(400).json({ message: "Invalid Request" });
      }
      const getseller = await sellerModel.findOne({user:id}).select("-password -salt -__v -user");
      return res.status(200).json({ seller: getseller , ok: true ,isAuthenticated:true,message:"seller is authenticated"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    sellerProfile
}