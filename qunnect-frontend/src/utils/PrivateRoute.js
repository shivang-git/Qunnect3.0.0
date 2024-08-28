// PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
