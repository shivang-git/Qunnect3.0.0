import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "./authAPI";
const initialState = {
  user: {},
  isError: false,
  isLoggedIn: false,
  isRegistered: false,
  isSuccess: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isRegistered = true;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = false;
        state.isSuccess = true;
        state.isRegistered = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      
      .addCase(isFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isFriend.fulfilled,(state, action) => {
        state.isLoading=false
        state.isError=false
        state.isRegistered=true
        state.isSuccess=true  
        const {friendId}=action.payload;
        const user=state.user.user
        if(user.friends.includes(friendId)){
          user.friends=user.friends.filter((id) => id !== friendId);
        }else{
          user.friends.push(friendId)
        }
        
    })
      .addCase(isFriend.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authAPI.register(userData, thunkAPI.dispatch);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authAPI.login(userData, thunkAPI.dispatch);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await authAPI.logout(thunkAPI);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const isFriend = createAsyncThunk(
  "auth/friend",
  async (friendId, thunkAPI) => {
    try {
      const response = await authAPI.isFriend(friendId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export default authSlice.reducer;
