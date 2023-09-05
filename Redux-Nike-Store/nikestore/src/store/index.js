import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./Products/ProductsSlice";
import CartSlice from "./Cart/CartSlice";

export const store = configureStore({
    reducer: {
        products: ProductsSlice,
        cart: CartSlice
    }
})