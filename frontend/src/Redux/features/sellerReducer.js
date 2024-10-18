import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
console.log("sellerReducer.js");
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
    async ( _,{rejectedWithValue}) => {
        try{
            const response = await fetch("http://localhost:4000/seller/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.ok) {
                const seller = await response.json();
                return seller;
            }
        }catch{
            return rejectedWithValue("Failed to fetch seller profile");
        }
    }
)

export const addProduct = createAsyncThunk(
    "seller/addProduct",
    async (product) => {
        console.log("addProduct", product);
        const response = await fetch("http://localhost:4000/seller/createProduct", {
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

export const updateProduct = createAsyncThunk(
    "seller/updateProduct",
    async (product) => {
        console.log("updateProduct", product);
        const response = await fetch("http://localhost:4000/seller/updateProduct", {
            method: "PUT",
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

export const deleteProduct = createAsyncThunk("seller/deleteProduct", async (data) => {
    console.log("deleteProduct", data);
    const response = await fetch(`http://localhost:4000/seller/deleteProduct`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({data}),
    });
    if (response.ok) {
        const seller = await response.json();
        return seller;
    }
});


const sellerSlice = createSlice({
    name: "seller",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(loadSellerProfile.fulfilled, (state, action) => {
            console.log(action.payload);
            state.seller = action.payload;
        });
        builder.addCase(loadSellerProfile.rejected, (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message;
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            
            state.seller = action.payload.seller;
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            state.error = action.error.message;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.seller = action.payload;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.error = action.error.message;
        });
    }
});

export const { } = sellerSlice.actions;
export default sellerSlice.reducer;