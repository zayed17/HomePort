import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface PublicRouteProps {
  element: React.ComponentType; 
  redirectTo?: string;          
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element: Component, redirectTo = "/dashboard" }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Component />;
};

export default PublicRoute;
