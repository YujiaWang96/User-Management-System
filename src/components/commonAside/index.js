import React from "react";
import * as iconMap from "@ant-design/icons"; //把所有的icon取出来，iconMap作为一个对象包含antD的所有icon。键值对形式，值就是icon组件
import MenuConfig from "../../config";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const items = MenuConfig.map((item) => {
  const child = {
    key: item.path,
    icon: React.createElement(iconMap[item.icon]),
    label: item.label,
  };
  if (item.children) {
    child.children = item.children.map((item) => {
      return {
        key: item.path,
        icon: React.createElement(iconMap[item.icon]), //react.createElement里面可以传字符串，就生成正常的组件对象。此时应该传icon组件
        label: item.label,
      };
    });
  }
  return child;
});

const CommonAside = ({ collapsed }) => {
  const navigate = useNavigate();
  //点击菜单跳转
  const selectMenu = (e) => {
    console.log(e.key);
    navigate(e.key);
  };
  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className="app-name"> {collapsed ? "User" : "User Management"}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{
          height: "100%",
        }}
        onClick={selectMenu}
      />
    </Sider>
  );
};

export default CommonAside;
