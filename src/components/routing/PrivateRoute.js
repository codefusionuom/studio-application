// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ children }) => {
//   const authState = useSelector((state) => state.auth);
//   const { admin } = authState;

//   if (!admin) {
//     return <Navigate to='/login' />;
//   }

//   return children;
// };

// export default PrivateRoute;

import React, { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requiredPrivilege }) => {
  const authState = useSelector((state) => state.auth);
  const { admin } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(admin.privileges);
    // console.log(requiredPrivilege);
    if (!admin) {
      navigate('/login');
    } else if (!admin.privileges.includes(requiredPrivilege)) {
      navigate(-1);
    }
  }, [admin, requiredPrivilege, navigate]);

  if (!admin || !admin.privileges.includes(requiredPrivilege)) {
    return null; // Render nothing while redirecting
  }

  return children;
};

export default PrivateRoute;
