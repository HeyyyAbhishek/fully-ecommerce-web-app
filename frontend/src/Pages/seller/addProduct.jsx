import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../Redux/features/sellerReducer';

const AddProduct = () => {
    const [productName, setProductName] = useState('Ana de armas');
    const [productPrice, setProductPrice] = useState('564');
    const [productDescription, setProductDescription] = useState('asdfsadfs');
    const [category, setCategory] = useState('Sexy');
    const [Img, setImg] = useState('https://i2.wp.com/images-cdn.9gag.com/photo/amgvKr4_700b.jpg');
    const [Id, setId] = useState('');
    const dispatch = useDispatch();

    const handleAddProduct = () => {
        const product = {
            id: Id,
            title: productName,
            price: productPrice,
            description: productDescription,
            category: category,
            image: Img,
            
        };
        dispatch(addProduct(product));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Id</label>
                    <input
                        type="text"
                        placeholder='Please try higher number if got error'
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={Id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Price</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Description</label>
                    <textarea
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={Img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                </div>
                <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    onClick={handleAddProduct}
                >
                    Add Product
                </button>
            </div>
        </div>
    );
};

export default AddProduct;