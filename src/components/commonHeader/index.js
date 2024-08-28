import React from "react";
import { Button, Layout } from "antd";
import { Dropdown, Avatar } from "antd";
import "./index.css";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { collapseMenu } from "../../store/reducer/tab";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const CommonHeader = ({ collapsed }) => {
  const navigate = useNavigate();
  const logout = () => {
    //登出就是清除token
    localStorage.removeItem("token");
    navigate("/login");
  };
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Me
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => logout()} target="_blank" rel="noopener noreferrer">
          Log Out
        </a>
      ),
    },
  ];

  //点击展开收起的按钮
  const dispatch = useDispatch();
  function setCollapsed() {
    //用dispatch来派送action改变状态
    dispatch(collapseMenu());
  }

  const url = require("../../assets/images/user.png"); //直接用url字符串的话，react找不到图像路径。必须用require才行
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={<MenuFoldOutlined rotate={0} />}
        style={{
          fontSize: "16px",
          width: 62,
          height: 32,
          backgroundColor: "#fff",
        }}
        onClick={() => {
          setCollapsed();
        }}
      />
      <Dropdown menu={{ items }}>
        {/* //avatar用法看ant design说明 */}
        <Avatar style={{ width: 40, height: 40 }} src={url} />
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;
