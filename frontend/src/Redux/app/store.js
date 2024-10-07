import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cartReducers.js"
import productDataSlice from "../data/FakeData.js"


export default configureStore({
  reducer: {
    cart:cartReducer,
    productData:productDataSlice,
  },
})