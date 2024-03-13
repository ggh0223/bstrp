import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import moment from "moment";

export const updateProfile = createAsyncThunk('/profile', async () => {
    const response = await axios.get('/api/users?page=2', {})
    return response.data;
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        me: {
            id: 0,
            account: "",
            auth: "",
            cash: "",
            owner_option: [],
            owner: "",
        }
    },
    reducers: {
        setUser: (state, action) => {
            let newUserObj = action.payload
            state.me = newUserObj
        },

    },
    extraReducers: {
        [updateProfile.pending]: state => {
            state.isLoading = true
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.user = action.payload.data
            state.isLoading = false
        },
        [updateProfile.rejected]: state => {
            state.isLoading = false
        },
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer
