// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getCookie } from "../helpers/getCookie";

// interface ProtectedRouteProps {
//   element: React.ComponentType;
//   cookieName: string;
//   redirectTo: string;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   element: Component,
//   cookieName,
//   redirectTo,
// }) => {
//   const navigate = useNavigate();
//   const token = getCookie(cookieName);
// console.log(token)
//   useEffect(() => {
//     if (!token) {
//       navigate(redirectTo);
//     }
//   }, [token, navigate, redirectTo]);

//   if (!token) {
//     return null;
//   }

//   return <Component />;
// };
// export default ProtectedRoute;



import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../helpers/getCookie";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
  element: React.ComponentType;
  cookieName?: string;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  cookieName,
  redirectTo,
}) => {

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const token = cookieName ? getCookie(cookieName) : isAuthenticated;
  useEffect(() => {
    if (!token) {
      navigate(redirectTo);
    }
  }, [token, navigate, redirectTo]);

  if (!token) {
    return null;
  }

  return <Component />;
};

export default ProtectedRoute;
