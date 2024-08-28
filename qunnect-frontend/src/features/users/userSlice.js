import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "./userAPI";
const initialState={
    users:[],
    friends:[],
    isError:false,
    isLoggedIn:false,
    isRegistered:false,
    isSuccess:false,
    isLoading:false,
}

export const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUsers.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isRegistered=true
            state.isSuccess=true  
            state.users=action.payload            
        })
        .addCase(getUsers.rejected,(state)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
        })
        .addCase(getFriends.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getFriends.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isRegistered=true
            state.isSuccess=true  
            state.friends=action.payload            
        })
        .addCase(getFriends.rejected,(state)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
        })
       
    }
})




export const getUsers=createAsyncThunk("user/get-users",async(thunkAPI)=>{
    try {
        const response=await userAPI.getUsers();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getFriends=createAsyncThunk("user/get-friends",async(thunkAPI)=>{
    try {
        const response=await userAPI.getFriends();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export default userSlice.reducer