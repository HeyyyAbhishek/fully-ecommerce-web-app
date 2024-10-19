import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
console.log("loginReducers.js");

// Initial state
const initialState = {
  isAuthenticated: false,
  login: false,
  error: "",
  loading: false,
  user: {
    _id: "",
    username: "",
    email: "",
  },
};

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue,getState }) => {
    try {
      console.log("Under login function:", data);
      console.log("Under login function:", getState());
      
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

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

export const verifyLogin = createAsyncThunk(
  "auth/verifyLogin",async (_,{ rejectWithValue}) => {
    try {
      const response = await fetch("http://localhost:4000/auth/verifyLogin",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",}
      );
      
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
)

export const logout  = createAsyncThunk(
  "auth/logout",async (_,{ rejectWithValue}) => {
    try {
      const response = await fetch("http://localhost:4000/auth/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",}
      );
      
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
)


// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getInfoFromCookie: (state) => {
      const userCookie = Cookies.get("userFrontend");

      if (userCookie) {
        try {
          const userData = JSON.parse(userCookie);
          console.log("parsed user data:", userData);
          state.isAuthenticated = userData.isAuthenticated || false;
          state.login = userData.login || false;
          state.user = userData.user || {};
        } catch (error) {
          console.error("Failed to parse user cookie:", error);
          state.isAuthenticated = false;
          state.login = false;
          state.user = {};
        }
      } else {
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
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("cookies ",action.payload)
        state.loading = false;
        state.login = true;
        state.isAuthenticated = true;
        const {_id,username,email,isSeller,account_type,} = action.payload.user
        state.user = {
          _id: _id,
          username,
          email,
        };
        
        const userCookie = {
          isAuthenticated: true,
          login: true,
          user:{
            _id: _id,
            username: username,
            email: email,
            isSeller: isSeller,
            account_type: account_type,
            
          },
        };
        Cookies.set("userFrontend",JSON.stringify(userCookie))
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || "Login failed";
      })
      .addCase(logout.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.login = false;
        state.isAuthenticated = false;
        state.user = {};
        Cookies.remove("userFrontend");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || "Logout failed";
      })
      .addCase(verifyLogin.pending, (state) => {
        state.error = "";
        state.loading = true; // Set loading to true when pending
    })
    .addCase(verifyLogin.fulfilled, (state, action) => {
        console.log("Verify login action payload:", action.payload);
        state.isAuthenticated = action.payload.isAuthenticated;
        state.login = true;
        state.user = {
            _id: action.payload.user.id,
            username: action.payload.user.username,
            email: action.payload.user.email,
            isSeller: action.payload.user.isSeller,
            account_type: action.payload.user.account_type,
        }; 
        state.loading = false; // Set loading to false when fulfilled
    })
    .addCase(verifyLogin.rejected, (state, action) => {
        console.log("Verify login rejected action payload:", action.payload);
        state.loading = false; // Set loading to false on rejection
        state.error = action.payload?.message || action.payload || "Verify login failed"; // Update error state
    })
    // Handle payment action
  },
});

// Export actions and reducer
export const { getInfoFromCookie } = authSlice.actions;
export default authSlice.reducer;
