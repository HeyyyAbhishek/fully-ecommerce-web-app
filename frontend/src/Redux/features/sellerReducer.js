import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    seller: {
        id: 0,
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        isSeller: false,
        listedProducts: [],
        orderHistory: [],
    },
    error: "",
}

export const loadSellerProfile = createAsyncThunk(
    "seller/loadSellerProfile",
    async () => {
        const response = await fetch("/api/seller/profile",
            {
                method: "GET",
                credentials: "include",
                headers: "application/json",
                
            }
        );
        if (response.ok) {
            const seller = await response.json();
            return seller;
        }
    }
)

export const addProduct = createAsyncThunk(
    "seller/addProduct",
    async (product) => {
        const response = await fetch("/api/seller/addProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
            credentials: "include",
        });
        if (response.ok) {
            const seller = await response.json();
            return seller;
        }
    }
)

const sellerSlice = createSlice({
    name: "seller",
    initialState: initialState,
    reducers:{},
    extraReducers:{
        [loadSellerProfile.fulfilled]: (state, action) => {
            state.seller = action.payload;
        },
        [loadSellerProfile.rejected]: (state, action) => {
            state.error = action.error.message;
        },
        [updateSellerProfile.fulfilled]: (state, action) => {
            state.seller = action.payload;
        },
        [updateSellerProfile.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});