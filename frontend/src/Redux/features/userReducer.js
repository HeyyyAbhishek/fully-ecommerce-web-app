import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
console.log("Under userReducer.js");

const initialState = {
    user: {},
    error: "",
    loading: false,
};

export const verifyLogin = createAsyncThunk("user/verifyLogin",
    async (_, { rejectWithValue }) => { // Removed destructuring for the first argument
        try {
            const response = await fetch("http://localhost:4000/auth/verifyLogin", {
                method: "GET",
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
            console.log("User response:", res);
            return res;
        } catch (err) {
            console.error("User error:", err);
            return rejectWithValue(err.message || "User failed");
        }
    }
);

export const getDetails = createAsyncThunk("user/getDetails",
    async (_, { rejectWithValue }) => { 
        try {
            const response = await fetch("http://localhost:4000/auth/getDetails", {
                method: "GET",
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
            console.log("User response:", res);
            return res;
        } catch (err) {
            console.error("User error:", err);
            return rejectWithValue(err.message || "User failed");
        }
    }
);

export const payment = createAsyncThunk(
    "user/payment",
    async (data, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const user = state.user.user; // Assuming user data is stored in user slice
        
        console.log("Data under createAsyncThunk (payment):", data);
        
        const response = await fetch("http://localhost:4000/products/purchase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, ...data }),
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData);
        }

        const res = await response.json();
        console.log("Payment response:", res);
        return res;
      } catch (err) {
        console.error("Payment error:", err);
        return rejectWithValue(err.message || "Payment failed");
      }
    }
  );

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            console.log("User under setUser:", action.payload);
            state.user = action.payload; // Assuming payload is the user object
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyLogin.pending, (state) => {
                state.error = "";
                state.loading = true; // Set loading to true when pending
            })
            .addCase(verifyLogin.fulfilled, (state, action) => {
                console.log("Verify login action payload:", action.payload);
                state.user = action.payload; // Assuming the payload is the user data
                state.loading = false; // Set loading to false when fulfilled
            })
            .addCase(verifyLogin.rejected, (state, action) => {
                console.log("Verify login rejected action payload:", action.payload);
                state.loading = false; // Set loading to false on rejection
                state.error = action.payload?.message || action.payload || "Verify login failed"; // Update error state
            })
            .addCase(getDetails.pending, (state) => {
                state.error = "";
                state.loading = true;
            })
            .addCase(getDetails.fulfilled, (state, action) => {
                state.user =action.payload.user; 
                state.ok = action.payload.ok;
                state.isAuthenticated = action.payload.isAuthenticated;
                state.message = action.payload.message;
                state.error = "";
                state.loading = false; 
            })
            .addCase(getDetails.rejected, (state, action) => {
                console.log("Get details rejected action payload:", action.payload);
                state.loading = false; // Reset loading state on rejection
                state.error = action.payload?.message || action.payload || "Get details failed"; // Update error state
            });
    }
});

export const { setUser,} = userSlice.actions;
export default userSlice.reducer;
