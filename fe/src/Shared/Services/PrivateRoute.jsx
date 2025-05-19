// components/PrivateRoute.js
import React, { use, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get('access_token');
  if(!token) {
    return <Navigate to="/login" replace />;

    
  }
  return children;
};

export default PrivateRoute;
