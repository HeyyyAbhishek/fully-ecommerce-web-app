const mongoose = require('mongoose');
const schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
	id:{
		type: Number,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	rating: {
		type: Object,
	},
	seller: {
		type: schema.Types.ObjectId,
		required: true,
	},
}, {
	collection: 'products',
	timestamps: false,
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
