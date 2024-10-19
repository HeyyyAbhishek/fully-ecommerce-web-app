const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    contact_number: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    account_type: {
        type: String,
        required: true,
        default: "user",
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isSeller: {
        type: Boolean,
        required: true,
        default: false,
    },
    orderHistory:{
        type: Array,
        default: [],
    },
    purchaseHistory:{
        type: Array,
        default: [],
    },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
