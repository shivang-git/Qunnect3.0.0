import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store,persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
 </Provider>
 
);