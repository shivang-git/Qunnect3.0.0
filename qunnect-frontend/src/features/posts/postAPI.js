import axios from 'axios';
import { base_url,config } from '../../utils/axiosConfig';
import sendAccessToken from '../../utils/sendAccessToken'; 


const createPost=async(postData)=>{
    sendAccessToken();
    const response=await axios.post(`${base_url}posts/create-post`,postData);
    
    return response.data;
}

const getPosts=async()=>{
    sendAccessToken();
    const response =await axios.get(`${base_url}posts/get-posts`);
    return response.data;
}

const likePost=async(postId)=>{
    sendAccessToken();
    const response =await axios.patch(`${base_url}posts/${postId}/like`);
    return response.data;
}

const commentPost=async(postId,postData)=>{
    sendAccessToken();
    const response =await axios.post(`${base_url}posts/${postId}/comment`,postData);
    
     
    return response.data;
}

const getcommentPost=async(postId,lastCommentId )=>{
    sendAccessToken();
    const response =await axios.get(`${base_url}posts/${postId}/get-comments?lastCommentId=${lastCommentId}`);
    
    return response.data;
}

export const postAPI={
    createPost,getPosts,likePost,commentPost,getcommentPost
}