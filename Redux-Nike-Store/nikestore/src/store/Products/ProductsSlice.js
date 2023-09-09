import { createSlice } from '@reduxjs/toolkit'
import products from '../../data/products';

const initialState = {
  products: products,
  selectedProduct: null,
}

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const productId = action.payload
      state.selectedProduct = state.products.find((product) => product._id === productId)
    }
  }
});

export const { setSelectedProduct } = ProductsSlice.actions

export default ProductsSlice.reducer