const productModel = require("../models/productModel");
const sellerModel = require("../models/sellerModel");

const createProduct = async (req, res) => {
    console.log("request made under createProduct")
    try {
        let product = req.body;
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


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct
}