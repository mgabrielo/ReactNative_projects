import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    newJobPost: [],
    jobPostLoading: false,
    errorjobPost: null
}

const newJobPostSlice = createSlice({
    name: 'newJobPost',
    initialState,
    reducers: {
        newJobPostListStart: (state) => {
            state.jobPostLoading = true
            state.errorjobPost = null
        },
        newJobPostListSuccess: (state, action) => {
            state.newJobPost = action.payload
            state.jobPostLoading = false
        },
        newJobPostListFailure: (state, action) => {
            state.jobPostLoading = false
            state.errorjobPost = action.payload
        },
        newJobPostAddStart: (state) => {
            state.jobPostLoading = true
            state.errorjobPost = null
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
            state.jobPostLoading = false
            state.errorjobPost = null
        },
        newJobPostAddFailure: (state, action) => {
            state.jobPostLoading = false
            state.errorjobPost = action.payload
        },
        newJobPostDetailStart: (state) => {
            state.jobPostLoading = true
            state.errorjobPost = null
        },
        newJobPostDetailSuccess: (state, action) => {
            state.jobPostLoading = false
            state.errorjobPost = null
        },
        newJobPostDetailFailure: (state, action) => {
            state.jobPostLoading = false
            state.errorjobPost = action.payload
        },
        newJobPostUpdateStart: (state) => {
            state.jobPostLoading = true
            state.errorjobPost = null
        },
        newJobPostUpdateSuccess: (state, action) => {
            const jobPostItem = action.payload
            const existingItem = state.newJobPost.find((item) => item.id === jobPostItem.id);
            if (existingItem) {
                const index = state.newJobPost.findIndex((item) => item.id === jobPostItem.id);
                if (index !== -1) {
                    state.newJobPost[index] = { ...state.newJobPost[index], ...jobPostItem };
                }
            }
            state.jobPostLoading = false
            state.errorjobPost = null
        },
        newJobPostUpdateFailure: (state, action) => {
            state.jobPostLoading = false
            state.errorjobPost = action.payload
        },
        newJobPostDeleteStart: (state) => {
            state.jobPostLoading = true
            state.errorjobPost = null
        },
        newJobPostDeleteSuccess: (state, action) => {
            const id = action.payload;
            const existingItem = state.newJobPost.find(item => item.id === id)

            if (existingItem) {
                state.newJobPost = state.newJobPost.filter(item => item.id !== id)
            }

            state.jobPostLoading = false
            state.errorjobPost = null
        },
        newJobPostDeleteFailure: (state, action) => {
            state.jobPostLoading = false
            state.errorjobPost = action.payload
        },
    }
});

export const {
    newJobPostUpdateStart,
    newJobPostUpdateSuccess,
    newJobPostUpdateFailure,
    newJobPostAddStart,
    newJobPostAddSuccess,
    newJobPostAddFailure,
    newJobPostListStart,
    newJobPostListSuccess,
    newJobPostListFailure,
    newJobPostDetailStart,
    newJobPostDetailSuccess,
    newJobPostDetailFailure,
    newJobPostDeleteStart,
    newJobPostDeleteSuccess,
    newJobPostDeleteFailure
} = newJobPostSlice.actions

export default newJobPostSlice.reducer