import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../Redux/features/loginReducers";
import "./Header.css";
import {clearUserState} from "../Redux/features/userReducer"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSeller = useSelector((state) => state.auth.user.isSeller);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const account_type = useSelector((state) => state.user.user.account_type);

  const out = async () => {
     await dispatch(logout());
      await dispatch(clearUserState());
      navigate("/signin")
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsHeaderHidden(true);
      } else {
        setIsHeaderHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`bg-gray-800 p-4 flex items-center sticky-header ${
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
          <li className="bg-orange-500 p-3 rounded-xl" style={{ fontSize: "1rem" }}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-black hover:text-gray-400"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="bg-orange-500 p-3 rounded-xl" style={{ fontSize: "1rem" }}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-black hover:text-gray-400"
              }
            >
              Cart ({cart.cart.length})
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li
                className="bg-red-500 cursor-pointer text-white p-3 rounded-xl"
                style={{ fontSize: "1rem" }}
                onClick={out}
              >
                Logout
              </li>
              <li className="bg-green-500 p-3 rounded-xl" style={{ fontSize: "1rem" }}>
                {account_type === "admin" ? (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-black hover:text-white"
                    }
                  >
                    Admin Dashboard
                  </NavLink>
                ) : isSeller ? (
                  <NavLink
                    to="/seller"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-black hover:text-white"
                    }
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-black hover:text-white"
                    }
                  >
                    Profile
                  </NavLink>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="bg-orange-500 p-3 rounded-xl" style={{ fontSize: "1rem" }}>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-black hover:text-gray-400"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
              <li className="bg-orange-500 p-3 rounded-xl" style={{ fontSize: "1rem" }}>
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
