const productModel = require("../models/productModel");
const sellerModel = require("../models/sellerModel");

const createProduct = async (req, res) => {
    console.log("request made under createProduct",req.body)
    try {
        let product = req.body;
        const existingProductCount = await productModel.countDocuments({ id: product.id });
        console.log("existingProductCount",existingProductCount)
        if (existingProductCount > 0) {
            return res.status(400).json({
            ok: false,
            message: "Product with this ID already exists",
            payload: null,
            });
        }
        let newProduct = await productModel.create(product);
        return res.status(201).json({
            ok: true,
            message: "Product added successfully",
            payload: newProduct,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            payload: null,
        });
    }
}

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
const deleteProduct= async(req,res)=>{
    try{
        let { id } = req.params;
        let product = await productModel.findByIdAndDelete(id)
        if (!product) {
            return res.status(400).json({
                ok: false,
                message: "Product not found",
                payload: null,
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Product deleted successfully",
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

const sellerProfile = async (req, res) => {
    try {
      const seller = req.signedCookies.user;
      const {email,username,id,token,account_type} = seller;
      if (!seller) {
        return res.status(400).json({ message: "Invalid Request" });
      }
      const getseller = await seller.findOne({email:email}).select("-password -salt");
      console.log(email,username,id,token,account_type);
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