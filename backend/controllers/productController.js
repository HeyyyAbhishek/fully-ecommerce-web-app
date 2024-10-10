const ProductModel = require("../models/productModel");

 const getAllProducts = async (req, res) => {
    try {
        let products = await ProductModel.find({});
        return res.status(200).json({
            ok: true,
            message: "Products fetched successfully",
            payload: products,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            payload: null,
        });
    }
}


 const getProductById = async (req, res) => {
    try {
        let { id } = req.params;
        let product = await ProductModel.findById(id);
        if (!product) {
            return res.status(400).json({
                ok: false,
                message: "Product not found",
                payload: null,
            });
        }
}catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            payload: null,
        });
    }
}

 const addProduct = async (req, res) => {
    try {
        let product = req.body;
        let newProduct = await ProductModel.create(product);
        return res.status(201).json({
            ok: true,
            message: "Product added successfully",
            payload: newProduct,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            payload: null,
        });
    }
}

 const purchaseProduct = async (req, res) => {
    try{
        let { id } = req.query;
        let product = await ProductModel.findById(id);
        if (!product) {
            return res.status(400).json({
                ok: false,
                message: "Product not found",
                payload: null,
            });
        }
        return res.status(200).json({
            ok: true,
            message: "Product purchased successfully",
            payload: product,
        });
    }catch{}
}

 const purchaseCart = async (req,res) => {
    try {
        let { ids } = req.query;
        let products = await ProductModel.find({ _id: { $in: ids } });
        return res.status(200).json({
            ok: true,
            message: "Products purchased successfully",
            payload: products,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            payload: null,
        });
    }

}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    purchaseProduct,
    purchaseCart
}