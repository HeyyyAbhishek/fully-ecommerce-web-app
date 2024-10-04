import { createSlice } from "@reduxjs/toolkit";

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
            state.cart.push(action.payload);
            state.totalItems = state.cart.length;
            state.total += action.payload.price;
        },
        removeFromCart(state, action) {
            const index = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );
            state.totalItems = state.cart.length;
            state.total -= state.cart[index].price;
            state.cart.splice(index, 1);
        },
    },
});


export const  {addToCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;