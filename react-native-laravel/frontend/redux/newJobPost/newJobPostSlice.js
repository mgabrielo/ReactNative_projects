import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    newJobPost: []
}

const newJobPostSlice = createSlice({
    name: 'newJobPost',
    initialState,
    reducers: {
        newJobPostUpdateSuccess: (state, action) => {
            state.newJobPost = action.payload
        },
        newJobPostAddSuccess: (state, action) => {
            const newItem = action.payload
            const existingItem = state.newJobPost.find((item) => item.id === newItem.id);
            if (!existingItem) {
                state.newJobPost.push({
                    id: newItem.id,
                    title: newItem.title,
                    description: newItem.description,
                    salary: newItem.salary,
                    company: newItem.company,
                    postedAt: newItem.postedAt,
                    user_id: newItem.user_id
                })
            }
        },
        newJobPostDeleteSuccess: (state, action) => {
            const id = action.payload;
            const existingItem = state.newJobPost.find(item => item.id === id)

            if (existingItem) {
                state.newJobPost = state.newJobPost.filter(item => item.id !== id)
            }
        },
    }
});

export const { newJobPostUpdateSuccess, newJobPostAddSuccess, newJobPostDeleteSuccess } = newJobPostSlice.actions

export default newJobPostSlice.reducer