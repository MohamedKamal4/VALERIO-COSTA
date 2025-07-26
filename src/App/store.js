import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice/cartSlice";
import favoriteSlice from "../features/favoriteSlice";

export const handleBtnAdd = configureStore({
    reducer: {
        cart: cartSlice,
        favorite: favoriteSlice
    }
})