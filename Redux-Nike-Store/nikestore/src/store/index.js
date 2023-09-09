import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./Products/ProductsSlice";
import CartSlice from "./Cart/CartSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        products: ProductsSlice,
        cart: CartSlice,
        api: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})