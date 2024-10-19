const mongoose = require('mongoose');
const userModel = require('./userModel');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    listedProducts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'product' }],
        default: [],
    },
    orderHistory: {
        type: [Schema.Types.Mixed],
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
