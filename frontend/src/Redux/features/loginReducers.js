import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initial state
const initialState = {
  isAuthenticated: false,
  login: false,
  error: "",
  loading: false,
  user: {
    id: "",
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

export const verifyLogin =createAsyncThunk(
  "auth/verifyLogin",async ({ rejectWithValue}) => {
    try {
      const response = await fetch("http://localhost:4000/auth/verifyLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
)
// Async thunk for payment


// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.login = false;
      state.user = {};
      state.error = "";
      Cookies.remove("userFrontend");
    },
    getInfoFromCookie: (state) => {
      const userCookie = Cookies.get("userFrontend");

      if (userCookie) {
        try {
          const userData = JSON.parse(userCookie);
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
        state.loading = false;
        state.login = true;
        state.isAuthenticated = true;
        const userCookie = {
          isAuthenticated: state.isAuthenticated,
          login: state.login,
          user: {username: state.user.username, email: state.user.email }
        };
        Cookies.set("userFrontend",JSON.stringify(userCookie))
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || "Login failed";
      });

    // Handle payment action
  },
});

// Export actions and reducer
export const { logout, getInfoFromCookie } = authSlice.actions;
export default authSlice.reducer;
