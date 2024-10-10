import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cartReducers.js"
import productReducer from "../data/FakeData.js"
import { login } from '../features/loginReducers.js'


export default configureStore({
  reducer: {
    cart:cartReducer,
    productData:productReducer,
    login:login,
  },
})