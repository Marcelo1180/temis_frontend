import React, { useContext } from "react";
import { Form, Button, Input } from "antd";
// import { helpHttp } from "../helpers/helpHttp";
// import { useNavigate } from "react-router-dom";
// import { LOGIN_NOTIFICATION_DETAILS } from "../constants/textMessages";
// import showNotification from "../components/ShowNotification";
import UltrakarneLogo from "../logo_ultrakarne.svg";
import AuthContext from "../AuthContext";

const Login = () => {
  const [form] = Form.useForm();

  const { onLogin } = useContext(AuthContext);

  const onSubmit = React.useCallback(async () => {
    try {
      const data = await form.validateFields();
      onLogin(data.username, data.password);
      form.resetFields();
    } catch (errorInfo) {
      console.log(errorInfo);
      return;
    }
  }, [form, onLogin]);

  return (
    <div className="login">
      <div className="login-page">
        <div className="logo">
          <img
            src={UltrakarneLogo}
            alt="Ultrakarne Logo"
            style={{ height: "30px" }}
          />
        </div>
        <div className="form">
          <div className="login-header">
            <p>Porfavor ingresa tu clave de acceso.</p>
          </div>

          <Form layout="vertical" form={form}>
            <Form.Item
              name="username"
              required
              rules={[
                {
                  required: true,
                  message: "Porfavor ingresa tu nombre de usuario",
                },
              ]}
            >
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item
              name="password"
              required
              rules={[
                {
                  required: true,
                  message: "Porfavor ingresa tu clave de acceso",
                },
              ]}
            >
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item>
              <Button shape="round" type="primary" onClick={onSubmit}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
