import React from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import { useSelector } from "react-redux"; //useselector来获取store里的状态，因为sider和header里面都要状态决定是否显示和图标方向
import store from "../store";
import { RouterAuth } from "../router/routerAuth";

const { Header, Sider, Content } = Layout;

function Main() {
  //const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const collapsed = useSelector((state) => state.tab.isCollapse);
  return (
    <RouterAuth>
      <Layout className="main-container">
        <CommonAside collapsed={collapsed} />
        <Layout>
          <CommonHeader collapsed={collapsed} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RouterAuth>
  );
}

export default Main;
