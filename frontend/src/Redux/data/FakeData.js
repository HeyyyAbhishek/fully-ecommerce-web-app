import { createSlice } from "@reduxjs/toolkit";

let  initialState = [];

let response = await fetch("https://fakestoreapi.com/products");
let data = await response.json();
initialState.push(...data);


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
