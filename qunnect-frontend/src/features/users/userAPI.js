import axios from 'axios';
import { base_url,config } from '../../utils/axiosConfig';

import sendAccessToken from '../../utils/sendAccessToken';


const getUsers=async()=>{
    try {
        sendAccessToken();

        const response =await axios.get(`${base_url}user/get-users`);  
  
        return response.data;

      } catch (error) {
        const errorMessage = error.response?.data?.message;
        return errorMessage;
      }
}

const getprofileUsers=async(slug)=>{
  try {
      sendAccessToken();
      const response =await axios.get(`${base_url}user/profile/${slug}`);  
        
      return response.data;

    } catch (error) {
      const errorMessage = error.response?.data?.message;
      return errorMessage;
    }
}




const getFriends=async()=>{
  try {
      sendAccessToken();
      const response =await axios.get(`${base_url}user/get-friends`);   
      return response.data;

    } catch (error) {
      const errorMessage = error.response?.data?.message;
      return errorMessage;
    }
}





export const userAPI={
    getUsers,getFriends,getprofileUsers
}