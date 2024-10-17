const productModel = require("../models/productModel");
const sellerModel = require("../models/sellerModel");

const createProduct = async (req, res) => {
    console.log("createProduct",req.body)
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
    
        let user  = req.signedCookies;
        const {id,username,email,isSeller} = user?.user;
        console.log("product",id)
        product.seller = id;
        let newProduct = await productModel.create(product);
        await sellerModel.findOneAndUpdate({ id }, { $push: { listedProducts: newProduct._id } });
        return res.status(201).json({
            ok: true,
            message: "Product added successfully",
            seller: newProduct,
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
      const getseller = await sellerModel.findOne({user:id}).select("-password -salt -_id -__v -user");
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