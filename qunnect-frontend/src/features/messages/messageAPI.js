import axios from 'axios';
import { base_url } from '../../utils/axiosConfig'; // Assuming config is already correctly set up for base_url
import sendAccessToken from '../../utils/sendAccessToken';

// API call to search for a contact based on query
const searchContact = async (query) => {
  try {
    sendAccessToken(); // Ensures that the access token is included in the request headers
    const response = await axios.get(`${base_url}user/search-contact?query=${query}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while searching for contact";
    return Promise.reject(errorMessage);
  }
};

// API call to create a conversation between two users
const createConversation = async (ConvoData) => {
  try {
    sendAccessToken(); // Ensures that the access token is included in the request headers
    console.log(ConvoData);
    
    const response = await axios.post(`${base_url}chats/create-conversation`, ConvoData);
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while creating the conversation";
    return Promise.reject(errorMessage);
  }
};

// Fetch all conversations for the logged-in user
const getConversations = async () => {
  try {
    sendAccessToken();
    const response = await axios.get(`${base_url}chats/get-conversation`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while fetching conversations";
    return Promise.reject(errorMessage);
  }
};


//not done
// Fetch all messages for a specific conversation
const getConversationMessages = async (convoid) => {  
  try {
    sendAccessToken();
    const response = await axios.get(`${base_url}chats/${convoid}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while fetching messages";
    return Promise.reject(errorMessage);
  }
};

// Exporting all API functions
export const messageAPI = {
  searchContact,
  createConversation,
  getConversations,
  getConversationMessages
};


