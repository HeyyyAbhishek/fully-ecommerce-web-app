import {Routes} from 'react';
import { useDispatch } from 'react-redux';
import {NavLink} from "react-router-dom";


const ManageProduct = () => {
    // const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Add Product</h2>
                    <p className="mb-4">Add a new product to your store.</p>
                    <NavLink to="/seller/manageproduct/addproduct" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</NavLink>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Update Product</h2>
                    <p className="mb-4">Update an existing product in your store.</p>
                    <NavLink to="/seller/manageproduct/updateproduct" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</NavLink>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Delete Product</h2>
                    <p className="mb-4">Delete a product from your store.</p>
                    <NavLink to="/seller/manageproduct/deleteproduct" className="bg-blue-500 text-white px-4 py-2 rounded">Delete Product</NavLink>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;