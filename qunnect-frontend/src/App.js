import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import Layout from "./components/Layout";
import Message from "./pages/Message";
import { useSelector } from "react-redux";
import sendAccessToken from './utils/sendAccessToken';
import PrivateRoute from "./utils/PrivateRoute";
import FindFriends from "./pages/FindFriends";
import Explore from './components/Explore';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PrivateRoute element={Home} />} />
            <Route path="profile/:slug" element={<PrivateRoute element={Profile} />} />
            <Route path="messages" element={<PrivateRoute element={Message} />} />
            <Route path="find-friends" element={<PrivateRoute element={FindFriends} />}/>
            <Route path="explore" element={<PrivateRoute element={Explore} />}/>
          </Route>
      
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="forget-password" element={<ForgetPassword />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
