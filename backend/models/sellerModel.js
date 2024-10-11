const mongoose = require('mongoose');
const userModel = require('./userModel');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    listedProducts: {
        type: [Number],
        default: [],
    },
    orderHistory: {
        type: [Number],
        default: [],
    },
    sellerSpecificField: {
        type: String,
        default: '',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
});

const seller = mongoose.model('seller', sellerSchema);

module.exports = seller;
