import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://ip-address:3000/'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products'
        }),
        getProduct: builder.query({
            query: (id) => `products/${id}`
        }),
    }),
});

export const { useGetProductsQuery, useGetProductQuery } = apiSlice;