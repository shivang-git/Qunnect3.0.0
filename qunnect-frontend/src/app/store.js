import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import postReducer from '../features/products/productSlice'
export const store = configureStore({
  reducer: {
    users:userReducer,
    posts:postReducer
  },
});