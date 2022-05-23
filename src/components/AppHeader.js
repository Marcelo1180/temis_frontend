import React, { useEffect, useContext, useState } from "react";
import { Button, Modal, Avatar, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UltrakarneLogo from "../resources/logo_ultrakarne.svg";
import { FRONT_REDIRECT_UNAUTHORIZED, URL_AUTH_USER } from "../constants";
import { apiPrivate } from "../core/apiCall";
import { Link, useNavigate } from "react-router-dom";

const AppHeader = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    apiPrivate
      .get(URL_AUTH_USER)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) navigate(FRONT_REDIRECT_UNAUTHORIZED);
      });
  }, []);
  const menu = (
    <Menu
      items={[
        {
          label: <Link to="/login">Mis ventas</Link>,
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: <Link to="/login">Cerrar Sesion</Link>,
          key: "1",
        },
      ]}
    />
  );

  return (
    <div className="appheader">
      <div>
        <img
          src={UltrakarneLogo}
          alt="Ultrakarne Logo"
          style={{ height: "25px" }}
        />
      </div>
      <div>
        <Dropdown overlay={menu} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar className="appheader-avatar" icon={<UserOutlined />} />
          </a>
        </Dropdown>
        <div>Hola, {user.first_name}</div>
      </div>
    </div>
  );
};

export default AppHeader;
