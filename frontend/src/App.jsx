import Header from "./Components/Header.jsx";
import Home from "./Pages/Index.jsx";
import { Routes } from "react-router-dom";
import "./App.css";
import { Route } from "react-router-dom";
import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
import Product from "./Pages/Products.jsx";
import Cart from "./Pages/Cart.jsx";
import Payment from "./Pages/payment.jsx";
import Profile from "./Pages/Profile.jsx";
import Seller from "./Pages/Seller.jsx";
import ManageProduct from "./Pages/seller/manageProduct.jsx";
import AddProduct from "./Pages/seller/addProduct.jsx";


import Admin from "./Pages/admin/admin.jsx";
import ListUser from "./Pages/admin/listUser.jsx";

import { fetchProductData } from './Redux/data/FakeData';
import { verifyLogin } from './Redux/features/loginReducers';
import { getDetails } from './Redux/features/userReducer';
import { loadSellerProfile } from './Redux/features/sellerReducer';


import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location

  useEffect(() => {
      const fetchData = async () => {
          console.log("Fetching data on route change:", location.pathname);
          await dispatch(fetchProductData());
          const res = await dispatch(verifyLogin()).unwrap();
          await dispatch(getDetails()).unwrap();
          if (res.user.isSeller) {
              dispatch(loadSellerProfile());
          }
      };
      fetchData();
  }, [location.pathname, dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/checkout" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/seller/manageproduct" element={<ManageProduct />} />
        <Route path="/seller/addproduct" element={<AddProduct />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/listuser" element={<ListUser />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
