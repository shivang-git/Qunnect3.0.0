import axios from 'axios';
import { base_url,config } from '../../utils/axiosConfig';

import sendAccessToken from '../../utils/sendAccessToken';




const searchContact=async(query)=>{
    try {
        sendAccessToken();

        const response =await axios.get(`${base_url}user/search-contact?query=${query}`);
        return response.data;
  
      } catch (error) {
        const errorMessage = error.response?.data?.message;
        return errorMessage;
      }
  }
  





export const messageAPI={
    searchContact
}