import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { logoutUser } from '../redux/actions/authActions';

const Header = () => {
    // const dispatch = useDispatch();
    // const auth = useSelector(state => state.auth);
    // const cart = useSelector(state => state.cart);

    // const handleLogout = () => {
    //     dispatch(logoutUser());
    // };

    return (
        <header className="bg-gray-800 p-4 flex justify-around">
            <div className="logo text-white text-2xl">
            <Link to="/">E-Commerce</Link>
            </div>
            <nav>
            <ul className="flex space-x-4">
                <li>
                <Link to="/products" className="text-white hover:text-gray-400">Products</Link>
                </li>
                <li>
                <Link to="/cart" className="text-white hover:text-gray-400">Cart ({})</Link>
                </li>
                <li>
                <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
                </li>
            </ul>
            </nav>
        </header>
    );
};

export default Header;