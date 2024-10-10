// In productReducers.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = [];

export const fetchProductData = createAsyncThunk(
  "productData/fetchProductData",
  async (prod, { rejectWithValue }) => {
    try {
      let response = await fetch("localhost:4001/products",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const productData = createSlice({
  name: "productData",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.fulfilled, (state, action) => {
        console.log("Fulfilled");
        console.log(action.payload);
        state.push(...action.payload); // Spread to add individual items
      })
      .addCase(fetchProductData.rejected, () => {
        console.log("Rejected");
      });
  },
});

export const { getProductData, } = productData.actions;
export default productData.reducer;
