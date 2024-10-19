const mongoose = require('mongoose');
const userModel = require('../../models/userModel');
const productModel = require('../../models/productModel');
const sellerModel = require('../../models/sellerModel');

const connectDB = async () => {
    const opt ={
        dbName: 'ecommerce'
    }
    try {
        await mongoose.connect('mongodb://localhost:27017', opt);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = {
    connectDB,
    models: {
        User: userModel,
        Product: productModel,
        Seller: sellerModel,
    },
};