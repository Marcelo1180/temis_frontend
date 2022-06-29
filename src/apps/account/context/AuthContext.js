import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_NOTIFICATION_DETAILS } from "../constants/textMessages";
import showNotification from "../../../components/ShowNotification";
import { FRONT_AFTER_LOGIN, URL_LOGIN } from "../../../constants";
import { apiPublic } from "../../../core/apiCall";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const handleLogin = async (username, password) => {
    localStorage.removeItem("temis_token");
    localStorage.removeItem("temis_user");
    apiPublic
      .post(URL_LOGIN, { username, password })
      .then((res) => {
        localStorage.setItem("temis_token", res.data.key);
        showNotification("success", LOGIN_NOTIFICATION_DETAILS.success);
        navigate(FRONT_AFTER_LOGIN);
      })
      .catch((err) => {
        showNotification("error", LOGIN_NOTIFICATION_DETAILS.error);
      });
  };
  const handleLogout = () => {
    console.log("out");
  };
  const data = {
    token: localStorage.getItem("temis_token"),
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
