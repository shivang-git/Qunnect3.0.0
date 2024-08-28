import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import userReducer from '../features/users/userSlice.js'
import postReducer from '../features/posts/postSlice.js'
import authReducer from '../features/auth/authSlice.js'


const rootReducer=combineReducers({
  users:userReducer,
  posts:postReducer,
  auth:authReducer
})

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


const persistor = persistStore(store);

export { store, persistor };