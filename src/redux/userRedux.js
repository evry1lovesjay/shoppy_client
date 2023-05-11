import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser: null,
        isLoading: false,
        error:false
    },
    reducers:{
        loginStart:(state)=>{
            state.isLoading = true
            },
        loginSuccess:(state, action)=>{
            state.isLoading= false
            state.currentUser=action.payload
            },
        loginFailure:(state)=>{
            state.isLoading= false  
            state.error= true
            },
        logOut:(state)=>{
            state.currentUser=null
            },
    }
})

export const {loginStart, loginSuccess, loginFailure, logOut } = userSlice.actions

export default userSlice.reducer