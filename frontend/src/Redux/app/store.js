import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cartReducers.js"
import productReducer from "../data/FakeData.js"
import  loginReducer  from '../features/loginReducers.js'


export default configureStore({
  reducer: {
    cart:cartReducer,
    productData:productReducer,
    auth:loginReducer,
  },
})