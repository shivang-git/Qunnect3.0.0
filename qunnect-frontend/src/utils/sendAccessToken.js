import axios from 'axios';
import { getAccessToken } from './token';
export default function sendAccessToken() {
    axios.interceptors.request.use(
        (config) => {
            const accessToken = getAccessToken(); // Replace with your access token retrieval function
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            config.headers.Accept = 'application/json';
            return config;
        },
        (error) => Promise.reject(error)
    );
}