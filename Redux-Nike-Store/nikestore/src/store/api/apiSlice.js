import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://api-address:3000/'

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
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: 'orders',
                method: 'POST',
                body: newOrder
            })
        }),
        getOrder: builder.query({
            query: (ref) => `orders/${ref}`
        })
    }),
});

export const { useGetProductsQuery, useGetProductQuery, useCreateOrderMutation, useGetOrderQuery } = apiSlice;