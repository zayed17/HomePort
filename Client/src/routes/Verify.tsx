import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../helpers/getCookie";

interface VerifyRouteProps {
  element: React.ComponentType;
  cookieName: string;
  redirectTo: string;
}

const VerifyRoute: React.FC<VerifyRouteProps> = ({
  element: Component,
  cookieName,
  redirectTo,
}) => {
  const navigate = useNavigate();
  const token = getCookie(cookieName);

  useEffect(() => {
    if (token) {
      navigate(redirectTo);
    }
  }, [token, navigate, redirectTo]);

  if (token) {
    return null;
  }

  return <Component />;
};

export default VerifyRoute;