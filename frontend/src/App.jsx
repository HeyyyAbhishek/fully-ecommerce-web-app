import Header from "./Components/Header.jsx";
import Home from "./Pages/Index.jsx";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Route } from "react-router-dom";
import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
import Product from "./Pages/Products.jsx";
import Cart from "./Pages/Cart.jsx";
import Payment from "./Pages/payment.jsx";
import Profile from "./Pages/Profile.jsx";



function App() {
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
      </Routes>
    </>
  );
}

export default App;
