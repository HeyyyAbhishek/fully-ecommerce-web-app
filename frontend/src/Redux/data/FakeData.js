// In productReducers.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
console.log("productReducers.js");
let initialState = {
  products: [],
  loading: false,
  error: "",
}


export const fetchProductData = createAsyncThunk(
  "productData/fetchProductData",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch("http://localhost:4000/products");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productData = createSlice({
  name: "productData",
  initialState:initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.products = action.payload.payload;

      })
      .addCase(fetchProductData.rejected, (state, action) => {
        console.log("Rejected");
      });
  },
});

export default productData.reducer;
