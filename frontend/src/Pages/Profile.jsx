import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getDetails } from "../Redux/features/userReducer";
import {NavLink} from "react-router-dom";

// Import your actions here
// import { fetchOrders } from '../redux/actions/orderActions';
// import { fetchPurchases } from '../redux/actions/purchaseActions';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const {
        isAdmin,
        isSeller,
        orderHistory,
        email,
        createdAt,
        username,
        contact_number,
        updatedAt,
    } = user;
    const purchaseHistory = orderHistory.map((order) => {
        return order.items;
    });
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    console.log(purchaseHistory);

    if (!isAuthenticated) {
        return <p>Please log in to view your profile.</p>;
    }
    // if(isSeller){
    //     return (
    //     <>
    //         <NavLink to="/seller">Seller Dashboard</NavLink>
    //         <p>You're a Seller</p>
    //     </>)
    // }

    return (
<div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg space-y-8">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Account</h2>

  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b pb-6 mb-6">
    <div className="mb-6 lg:mb-0">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">Profile Information</h3>
      <p className="text-gray-600">
        <strong>Username:</strong> {username}
      </p>
      <p className="text-gray-600">
        <strong>Email:</strong> {email}
      </p>
      <p className="text-gray-600">
        <strong>Contact Number:</strong> {contact_number}
      </p>
      <p className="text-gray-600">
        <strong>Joined:</strong> {new Date(createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-600">
        <strong>Last Updated:</strong> {new Date(updatedAt).toLocaleDateString()}
      </p>
    </div>

    <div className="flex gap-4">
      {isAdmin && (
        <span className="bg-green-500 text-white py-2 px-4 rounded-md text-sm">
          Admin
        </span>
      )}
      {isSeller && (
        <><span className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm">
          Seller
        </span>
        <button className="bg-green-500 text-black py-2 px-4 rounded-md text-sm">
            <NavLink to="/seller">Go To Dashboard</NavLink>
        </button></>
      )}
    </div>
  </div>

  <div className="border-b pb-6 mb-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h3>
    {orderHistory.length > 0 ? (
      <ul className="space-y-4">
        {orderHistory.map((order, index) => (
          <li key={index} className="border p-4 rounded-lg bg-gray-50">
            <p className="text-gray-700">
              <strong>Username:</strong> {order.username}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {order.email}
            </p>
            <p className="text-gray-700">
              <strong>Total:</strong> ${order.total}
            </p>
            <p className="text-gray-700">
              <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-600">No order history available.</p>
    )}
  </div>

  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Purchase History</h3>
    {purchaseHistory && purchaseHistory.length > 0 ? (
      <ul className="space-y-4">
        {purchaseHistory.map((order, index) =>
          order.map((item, itemIndex) => (
            <li key={itemIndex} className="border p-4 rounded-lg bg-gray-50">
              <p className="text-gray-700">
                <strong>Name:</strong> {item.productName}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> ${item.price}
              </p>
              <p className="text-gray-700">
                <strong>Quantity:</strong> {item.quantity}
              </p>
            </li>
          ))
        )}
      </ul>
    ) : (
      <p className="text-gray-600">No purchase history available.</p>
    )}
  </div>
</div>

      
    );
};

export default Profile;
