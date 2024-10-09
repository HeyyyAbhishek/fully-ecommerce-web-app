import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let  initialState = [];

// let response = await fetch("https://fakestoreapi.com/products");
// let data = await response.json();
// initialState.push(...data);


const fetchProductData = createAsyncThunk(
  "productData/fetchProductData",
  async () => {
    let response = await fetch("https://fakestoreapi.com/products");
    try{
      let data = await response.json();
      return data;
    } catch(err){
      return  rejectedWithValue(err);
    }
  }
)

const productDataSlice = createSlice({
  name: "productData",
  initialState: initialState,
  reducers: {
    getProductData(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: {
    [fetchProductData.fulfilled]: (state, action) => {
      state.push(...action.payload);
    },
    [fetchProductData.rejected]: (state, action) => {
      console.log("Rejected");
    },
  },
});

export const { getProductData } = productDataSlice.actions;
export default fetchProductData.reducers;

/*
const productDataSlice = createSlice({
  name: "productData",
  initialState: initialState,
  reducers: {
    getProductData(state, action) {
      state.push(action.payload);
    },
  },
});

export const { getProductData } = productDataSlice.actions;
export default productDataSlice.reducer;
*/