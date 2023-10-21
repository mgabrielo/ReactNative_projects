import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: {},
    token: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.token = state.currentUser.token
            // state.token = null
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        signOutUserStart: (state) => {
            state.loading = true
        },
        signOutUserSuccess: (state, action) => {
            state.currentUser = null
            state.token = null
            state.loading = false
            state.error = null
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
    }
});

export const { signInStart, signInSuccess, signInFailure, signOutUserSuccess } = userSlice.actions

export default userSlice.reducer