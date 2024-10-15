import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetails } from '../Redux/features/userReducer';
// Import your actions here
// import { fetchOrders } from '../redux/actions/orderActions';
// import { fetchPurchases } from '../redux/actions/purchaseActions';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isAdmin = user.account_type
    const username = user.username
    const email = user.email
    const orders = user.orderHistory
    console.log("User:", orders);
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
    <>
    <div>Worl</div>
    </>
    );
};

export default Profile;
