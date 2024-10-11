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
      console.log(data);
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
        console.log("Fulfilled");
        console.log(state);
        return action.payload;

      })
      .addCase(fetchProductData.rejected, (state, action) => {
        console.log("Rejected");
        console.error(action.payload); // Log the error message
      });
  },
});

export default productData.reducer;
