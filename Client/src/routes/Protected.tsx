import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
  element: React.ComponentType;
  redirectTo: string ;         
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, redirectTo  }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
