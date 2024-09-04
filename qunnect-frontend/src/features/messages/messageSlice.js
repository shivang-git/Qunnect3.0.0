import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { messageAPI } from "./messageAPI";
const initialState={
    Contacts:[],
    isError:false,
    isLoggedIn:false,
    isRegistered:false,
    isSuccess:false,
    isLoading:false,
}

export const messageSlice=createSlice({
    name:"messages",
    initialState,
    reducers:{
        clearSearchResults: (state) => {
            state.Contacts = [];
          },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(searchContact.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(searchContact.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isRegistered=true
            state.isSuccess=true
            state.Contacts=action.payload            
        })
        .addCase(searchContact.rejected,(state)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
        })
       
    }
})




export const searchContact = createAsyncThunk(
    'user/search-contact',
    async (query, { rejectWithValue }) => {
      try {
        const response = await messageAPI.searchContact(query);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


export const { clearSearchResults } = messageSlice.actions;
export default messageSlice.reducer