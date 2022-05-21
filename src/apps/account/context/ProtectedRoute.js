import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {LOGIN__REDIRECT_UNAUTHORIZED} from "../../../constants";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to={LOGIN__REDIRECT_UNAUTHORIZED} replace />;
  }

  return children;
};
export default ProtectedRoute;
