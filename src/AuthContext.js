import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { helpHttp } from "./helpers/helpHttp";
import { LOGIN_NOTIFICATION_DETAILS } from "./constants/textMessages";
import showNotification from "./components/ShowNotification";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const handleLogin = async (username, password) => {
    const options = {
      body: { username, password },
      headers: { "content-type": "application/json" },
    };

    helpHttp()
      .post("http://127.0.0.1:8000/account/v1/login/", options)
      .then((res) => {
        if (!res.err) {
          localStorage.setItem("temis_token", res.key);
          const options = {
            headers: {
              Authorization: `Token ${res.key}`,
              "content-type": "application/json",
            },
          };
          return helpHttp().get(
            "http://127.0.0.1:8000/account/v1/user/",
            options
          );
        } else {
          showNotification("error", LOGIN_NOTIFICATION_DETAILS.error);
        }
      })
      .then((res) => {
        if (!res.err) {
          localStorage.setItem("temis_user", JSON.stringify(res));
          showNotification("success", LOGIN_NOTIFICATION_DETAILS.success);
          navigate("/");
        } else {
          showNotification("error", LOGIN_NOTIFICATION_DETAILS.error);
        }
      });
  };
  const handleLogout = () => {
    console.log("out")
  };
  const data = {
    token: localStorage.getItem("temis_token"),
    user: JSON.parse(localStorage.getItem("temis_user")),
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
