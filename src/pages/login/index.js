import "./index.css";
import React from "react";
import { Button, Form, Input, message } from "antd";
import { getMenu } from "../../api";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  //在登录状态下，需要跳转到home页面
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" replace />;
  }
  const handlSubmit = (val) => {
    if (!val.password || !val.username) {
      return message.open({
        type: "warning",
        content: "Please enter the correct username and password",
      });
    }
    getMenu(val).then(({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.data.token);
      navigate("/home");
    });
  };
  return (
    <Form className="login-container" onFinish={handlSubmit}>
      <div className="login_title">Login</div>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input placeholder="Please input your Username!" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password placeholder="Please input your Password!" />
      </Form.Item>
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
