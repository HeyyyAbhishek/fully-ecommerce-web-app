// src/Pages/Seller.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink ,Routes,Route} from "react-router-dom";

const SellerDashboard = () => {
    const dispatch = useDispatch();
    // const { products, orders, profile } = useSelector((state) => state.seller);

    let isSeller = useSelector((state) => state.user.user.isSeller);
    if (!isSeller) {
        return <p>You are not a seller.</p>;
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Products</h2>
                    <p className="mb-4">Manage your products, add new ones, and update existing listings.</p>
                     <NavLink to="manageproduct" className="bg-blue-500 text-white px-4 py-2 rounded"><button className="bg-blue-500 text-white px-4 py-2 rounded">Manage Products</button></NavLink>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Profile</h2>
                    <p className="mb-4">Manage Your Profile</p>
                     <NavLink to="/profile" className="bg-blue-500 text-white px-4 py-2 rounded"><button className="bg-blue-500 text-white px-4 py-2 rounded">Profile</button></NavLink>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
