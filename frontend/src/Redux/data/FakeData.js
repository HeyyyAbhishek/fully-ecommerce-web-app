// In productReducers.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = [];

export const fetchProductData = createAsyncThunk(
  "productData/fetchProductData",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch("https://fakestoreapi.com/products");
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
        return action.payload;

      })
      .addCase(fetchProductData.rejected, (state, action) => {
        console.log("Rejected");
      });
  },
});

export default productData.reducer;
