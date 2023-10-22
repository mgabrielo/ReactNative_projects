import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: {},
    token: null,
    error: null,
    loading: false,
    user_id: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = null
            state.token = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.token = state.currentUser.token
            state.user_id = state.currentUser.user_id
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
            state.token = null
        },
        registerStart: (state) => {
            state.loading = true
        },
        registerSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        registerFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
            state.token = null
        },
        signOutUserStart: (state) => {
            state.loading = true
        },
        signOutUserSuccess: (state) => {
            state.loading = false
            state.error = null
            state.token = null
            state.currentUser = {}
        },
        signOutUserFailure: (state, action) => {
            state.currentUser = {}
            state.currentUser.token = null
            state.loading = false
            state.error = action.payload
            state.token = null
        },
    }
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure
} = userSlice.actions

export default userSlice.reducer