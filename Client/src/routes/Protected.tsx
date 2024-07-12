// import React, { ReactNode } from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, useLocation } from 'react-router-dom';
// import {RootState} from '../store/store'

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const isAuthenticated = useSelector((state: RootState) => state.user.userToken);
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;



import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
  element: React.ComponentType;
}

const userProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
}) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.owner.ownerToken);

  useEffect(() => {
    if (!token) {
      navigate('/owner-login');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <Component />;
};

export default userProtectedRoute;