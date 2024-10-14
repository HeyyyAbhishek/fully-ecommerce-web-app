import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetails } from '../Redux/features/userReducer';
// Import your actions here
// import { fetchOrders } from '../redux/actions/orderActions';
// import { fetchPurchases } from '../redux/actions/purchaseActions';

const Profile = () => {
    const dispatch = useDispatch();
    dispatch(getDetails());
    
    const user =""//useSelector((state) => state.auth.user);
    const orders =""//useSelector((state) => state.orders.list);
    const purchases =""//useSelector((state) => state.purchases.list);
    const ordersLoading =""//useSelector((state) => state.orders.loading);
    const purchasesLoading =""//useSelector((state) => state.purchases.loading);
    const ordersError =""//useSelector((state) => state.orders.error);
    const purchasesError =""//useSelector((state) => state.purchases.error);

    useEffect(() => {
        // Dispatch actions to fetch orders and purchases
        // dispatch(fetchOrders(user.id));
        // dispatch(fetchPurchases(user.id));
    }, [dispatch, user.id]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                {/* User Information */}
                <h2 className="text-3xl font-bold mb-6">Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-gray-700 font-medium">Name:</label>
                        <p className="text-gray-900">{user.username}</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Email:</label>
                        <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Type:</label>
                        <p className="text-gray-900">{user.is_Admin ? 'Admin' : 'User'}</p>
                    </div>
                </div>

                {/* Order History */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Order History</h3>
                    {ordersLoading ? (
                        <p>Loading orders...</p>
                    ) : ordersError ? (
                        <p className="text-red-500">Error loading orders: {ordersError}</p>
                    ) : orders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Order ID</th>
                                        <th className="py-2 px-4 border-b">Date</th>
                                        <th className="py-2 px-4 border-b">Total</th>
                                        <th className="py-2 px-4 border-b">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="text-center">
                                            <td className="py-2 px-4 border-b">{order.id}</td>
                                            <td className="py-2 px-4 border-b">{new Date(order.date).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
                                            <td className="py-2 px-4 border-b">{order.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Purchase History */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Purchase History</h3>
                    {purchasesLoading ? (
                        <p>Loading purchases...</p>
                    ) : purchasesError ? (
                        <p className="text-red-500">Error loading purchases: {purchasesError}</p>
                    ) : purchases.length === 0 ? (
                        <p>No purchases found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Purchase ID</th>
                                        <th className="py-2 px-4 border-b">Date</th>
                                        <th className="py-2 px-4 border-b">Product</th>
                                        <th className="py-2 px-4 border-b">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.map((purchase) => (
                                        <tr key={purchase.id} className="text-center">
                                            <td className="py-2 px-4 border-b">{purchase.id}</td>
                                            <td className="py-2 px-4 border-b">{new Date(purchase.date).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 border-b">{purchase.productName}</td>
                                            <td className="py-2 px-4 border-b">${purchase.amount.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
