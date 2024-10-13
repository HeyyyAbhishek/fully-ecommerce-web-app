import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
// import { logoutUser } from '../redux/actions/authActions';
import { useState, useEffect } from "react";
import { logout } from "../Redux/features/loginReducers";
import "./Header.css";
const Header = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're scrolling down or up
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsHeaderHidden(true); // Hide on scroll down, after 100px
      } else {
        setIsHeaderHidden(false); // Show on scroll up
      }
      setLastScrollY(window.scrollY); // Update lastScrollY to current position
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <header
      className={` bg-gray-800 p-4 flex items-center sticky-header ${
        isHeaderHidden ? "header-hidden" : ""
      }`}
    >
      <div className="logo min-h-12 flex items-center text-white text-2xl basis-2/5 justify-center">
        <Link className="font-extrabold" to="/">
          hek_
        </Link>
      </div>
      <nav style={{ flexBasis: "60%" }} className="flex justify-center">
        <ul className="flex space-x-4 justify-center">
          <li
            style={{ fontSize: "1rem" }}
            className="bg-orange-500 p-3 rounded-xl"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-black hover:text-gray-400"
              }
            >
              Home
            </NavLink>
          </li>
          <li
            style={{ fontSize: "1rem" }}
            className="bg-orange-500 p-3 rounded-xl"
          >
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-black hover:text-gray-400"
              }
            >
              Cart ({cart.cart.length})
            </NavLink>
          </li>
          {isAuthenticated ? (<>
            <li
              style={{ fontSize: "1rem" }}
              onClick={() => {
                dispatch(logout());
              }}
              className="bg-red-500 cursor-pointer text-white  p-3 rounded-xl"
            >
              Logout
            </li>
            <li
            style={{ fontSize: "1rem" }}
                className="bg-green-500 p-3 rounded-xl"
              >
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-black hover:text-white"
                  }
                >
                  Profile
                </NavLink>
            </li></>
          ) : (
            <>
              {" "}
              <li
                style={{ fontSize: "1rem" }}
                className="bg-orange-500 p-3 rounded-xl"
              >
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-black hover:text-gray-400"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
              <li
                style={{ fontSize: "1rem" }}
                className="bg-orange-500 p-3 rounded-xl"
              >
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-black hover:text-gray-400"
                  }
                >
                  Sign In
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
