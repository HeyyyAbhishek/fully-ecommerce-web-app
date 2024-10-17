import { createSlice } from "@reduxjs/toolkit";
console.log("cartReducers.js");

const initialState = {
    cart: [],
    total: 0,
    totalItems: this,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state, action) {
            const index = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state.cart[index].quantity += action.payload.quantity;
            } else {
                state.cart.push(action.payload);
            }
            state.totalItems = state.cart.reduce(
                (acc, item) => acc + item.quantity,
                0
            );
            state.total = state.cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
        },
        removeFromCart(state, action) {
            const index = state.cart.findIndex(
                (item) => item.id === action.payload
            );
            state.totalItems = state.cart.length;
            state.total -= state.cart[index].price;
            state.cart.splice(index, 1);
        },
        updateQuantity(state, action) {
            console.log("updateQuantity called",action);
            const index = state.cart.findIndex(
            (item) => item.id === action.payload.id
            );
            if (index !== -1) {
            state.cart[index].quantity = action.payload.quantity;
            state.total = state.cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            state.totalItems = state.cart.reduce(
                (acc, item) => acc + item.quantity,
                0
            );
            
            }
        },
        clearCart(state){
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
        }
    }});

export const  {addToCart, removeFromCart,updateQuantity,clearCart} = cartSlice.actions;

export default cartSlice.reducer;