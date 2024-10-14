// src/redux/loginSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initial state
const initialState = {
  isAuthenticated: false,
  login: false,
  user: {},
  error: "",
  paymentHistory: [],
  orderHistory: [],
};

// Async thunk for login
export const login = createAsyncThunk(
  "loginSlice/login",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Under login function:", data);
      
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      // Check if response is OK before parsing JSON
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const res = await response.json();
      console.log("Login response:", res);
      return res; // Assuming res contains user data
    } catch (err) {
      console.error("Login error:", err);
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// Async thunk for payment
export const payment = createAsyncThunk(
  "loginSlice/payment",
  async (data, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      // Adjust the slice key based on how you've combined your reducers
      const user = state.auth.user; // Ensure 'loginSlice' is the correct key
      
      console.log("Data under createAsyncThunk (payment):", data);
      
      const response = await fetch("http://localhost:4000/products/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, ...data }), // Spread 'data' if it's an object
        credentials: "include",
      });

      // Check if response is OK before parsing JSON
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const res = await response.json();
      console.log("Payment response:", res);
      return res; // Assuming res contains payment history or confirmation
    } catch (err) {
      console.error("Payment error:", err);
      return rejectWithValue(err.message || "Payment failed");
    }
  }
);

// Create the slice
const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.login = false;
      state.user = {};
      state.paymentHistory = [];
      state.orderHistory = [];
      state.error = "";
      Cookies.remove("userFrontend");
    },
    getInfoFromCookie: (state) => {
      // Attempt to retrieve the 'userFrontend' cookie
      const userCookie = Cookies.get("userFrontend");

      if (userCookie) {
        try {
          const userData = JSON.parse(userCookie);
          
          state.isAuthenticated = userData.isAuthenticated || false;
          state.login = userData.login || false;
          state.user = userData.user || {};
          // Optionally, restore other state properties if needed
        } catch (error) {
          console.error("Failed to parse user cookie:", error);
          // Reset state if parsing fails
          state.isAuthenticated = false;
          state.login = false;
          state.user = {};
        }
      } else {
        // Handle case when cookie does not exist
        state.isAuthenticated = false;
        state.login = false;
        state.user = {};
      }
    },
  },
  extraReducers: (builder) => {
    // Handle login actions
    builder
      .addCase(login.pending, (state) => {
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login = true;
        state.isAuthenticated = true;
        console.log("action",action)
        state.user = action.payload || {}; // Adjust based on your response structure
        // Store only relevant parts in the cookie
        Cookies.set("userFrontend", JSON.stringify({
          isAuthenticated: state.isAuthenticated,
          login: state.login,
          user: state.user,
        }));
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload.message || action.payload || "Login failed";
      });

    // Handle payment actions
    builder
      .addCase(payment.pending, (state) => {
        // Optionally, set a loading state for payments
        // e.g., state.paymentStatus = 'loading';
        state.error = "";
      })
      .addCase(payment.fulfilled, (state, action) => {
        // Assuming action.payload contains the new payment history item
        // Adjust based on your response structure
        state.paymentHistory.push(action.payload);
      })
      .addCase(payment.rejected, (state, action) => {
        state.error = action.payload.message || action.payload || "Payment failed";
      });
  },
});

// Export actions and reducer
export const { logout, getInfoFromCookie } = loginSlice.actions;
export default loginSlice.reducer;
