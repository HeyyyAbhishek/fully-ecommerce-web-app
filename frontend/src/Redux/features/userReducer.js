import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
console.log("Under userReducer.js");
const initialState = {
    user: {},
    error: "",
}

export const getDetails = createAsyncThunk("user/getDetails",
    async ({ rejectWithValue }) => {
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
    
)

export const payment = createAsyncThunk(
    "user/payment",
    async (data, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const user = state.auth.user;
        
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
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            console.log("User under setUser:", action.payload.user)
            state.user = action.payload.user;
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getDetails.pending, (state) => {
          state.error = "";
          state.paymentLoading = true;
        })
        .addCase(getDetails.fulfilled, (state, action) => {
          state.paymentLoading = false;
          state.paymentHistory.push(action.payload);
        })
        .addCase(getDetails.rejected, (state, action) => {
          state.paymentLoading = false;
          state.error = action.payload?.message || action.payload || "Payment failed";
        });
    }
});

export const { setUser, setError, setLoading } = userSlice.actions;
export default userSlice.reducer;