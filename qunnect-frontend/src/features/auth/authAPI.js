import axios from 'axios';
import { base_url,config } from '../../utils/axiosConfig';
import { loginUser, registerUser } from './authSlice';
import { removeAccessToken, storeAccessToken } from '../../utils/token';
import sendAccessToken from '../../utils/sendAccessToken';


const register=async(userData,dispatch)=>{
    try {
        const response=await axios.post(`${base_url}auth/register`,userData);
        const { accessToken } = response.data;
        storeAccessToken(accessToken);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Registration failed';
        dispatch(registerUser.rejectedWithValue(errorMessage));
    }
}


const login=async(userData,dispatch)=>{
    try {
        const response = await axios.post(`${base_url}auth/login`, userData);
        const { accessToken } = response.data;
        storeAccessToken(accessToken);
        return response.data;

      } catch (error) {
        const errorMessage = error.response?.data?.message || 'login failed';
        dispatch(loginUser.rejectedWithValue(errorMessage));
      }
}

const logout=async()=>{
    try {
        const response = await axios.post(`${base_url}auth/logout`);
        removeAccessToken();
        return response.data;

      } catch (error) {
        const errorMessage = error.response?.data?.message || 'login failed';
      }
}

const isFriend=async(friendId)=>{
  try {
      sendAccessToken();
      const response =await axios.patch(`${base_url}user/friend/${friendId}`); 

      return response.data;

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'follow users failed';
      return errorMessage;
    }
}

export const authAPI={
    register,
    login,logout,isFriend
}