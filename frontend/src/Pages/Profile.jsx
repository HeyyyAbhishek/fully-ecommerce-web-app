import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetails } from "../Redux/features/userReducer";
import { NavLink } from "react-router-dom";

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
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-xl space-y-8 transform hover:scale-90 transition-transform duration-500">
      <h2 className="text-4xl font-extrabold text-purple-900 mb-8 text-center border-b-4 border-purple-300 pb-4">
        Your Account
      </h2>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b-4 border-indigo-300 pb-6 mb-6">
        <div className="mb-6 lg:mb-0">
          <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
            Profile Information
          </h3>
          <p className="text-gray-700">
            <strong>Username:</strong> {username}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-gray-700">
            <strong>Contact Number:</strong> {contact_number}
          </p>
          <p className="text-gray-700">
            <strong>Joined:</strong> {new Date(createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <strong>Last Updated:</strong>{" "}
            {new Date(updatedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-4">
          {isAdmin && (
            <span className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300 text-sm">
              Admin
            </span>
          )}
          {isSeller && (
            <>
              <span className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 text-sm">
                Seller
              </span>
              <button className="bg-yellow-400 text-black py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors duration-300 text-sm">
                <NavLink to="/seller">Go To Dashboard</NavLink>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="border-b-4 border-purple-300 pb-6 mb-6">
        <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
          Order History
        </h3>
        {orderHistory.length > 0 ? (
          <ul className="space-y-4">
            {orderHistory.map((order, index) => (
              
              <li
                key={index}
                className="border-2 border-purple-200 p-4 rounded-lg bg-white shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
              >
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
                  <strong>For Order ID : {order.items[0].orderId} </strong>
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong>
                  {new Date(order.items[0].date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No order history available.</p>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
          Purchase History
        </h3>
        {purchaseHistory && purchaseHistory.length > 0 ? (
          <ul className="space-y-4">
            {purchaseHistory.map((order, index) =>
              order.map((item, itemIndex) => (
               
                <li
                  key={itemIndex}
                  className="border-2 flex border-indigo-200 p-4 rounded-lg bg-white shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <div>
                    <p className="text-gray-700">
                      <strong>Name:</strong> {item.productName}
                    </p>
                    <p className="text-gray-700">
                      <strong>Price:</strong> ${item.price}
                    </p>
                    <p className="text-gray-700">
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p className="text-gray-700">
                      <strong>For Order ID: {item.orderId}</strong>
                    </p>
                  </div>
                  <div className="h-full w-full">
                    <img
                      className="w-fit h-full object-cover m-auto rounded-md"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
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
