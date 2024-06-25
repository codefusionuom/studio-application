import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const { admin } = authState;

  if (!admin) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default PrivateRoute;
