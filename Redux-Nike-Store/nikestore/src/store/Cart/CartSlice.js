import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    deliveryFee: 25,
    freeDeliveryFee: 220,
    // subTotal:0
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const newProduct = action.payload.product;
            const existingProduct = state.items.find((item) => item.product.id === newProduct.id)
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                state.items.push({ product: newProduct, quantity: 1 })
            }
        },
        changeQuantity: (state, action) => {
            const { productId, amount } = action.payload
            const cartItem = state.items.find((item) => item.product.id === productId)
            if (cartItem) {
                cartItem.quantity += amount;
            }

            if (cartItem.quantity <= 0) {
                state.items = state.items.filter((item) => item !== cartItem)
            }
        },

    }
});

export const selectSubTotal = (state) => state.cart.items.reduce((sum, currentCartItem) => sum + currentCartItem.product.price * currentCartItem.quantity, 0)
export const cartSelector = (state) => state.cart;
export const selectDeliveryPrice = createSelector(
    cartSelector, selectSubTotal, (cart, subTotal) => subTotal > cart.freeDeliveryFee ? 0 : cart.deliveryFee
)
export const selectTotal = createSelector(
    selectSubTotal, selectDeliveryPrice, (subTotal, deliveryFee) => subTotal + deliveryFee
)
export const { addCartItem, changeQuantity } = CartSlice.actions

export default CartSlice.reducer