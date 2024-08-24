const MenuConfig = [
  {
    path: "/home",
    name: "home",
    label: "Home",
    icon: "HomeOutlined",
    url: "/home/index",
  },
  {
    path: "/mall",
    name: "mall",
    label: "Goods",
    icon: "ShopOutlined",
    url: "/mall/index",
  },
  {
    path: "/user",
    name: "user",
    label: "Users",
    icon: "UserOutlined",
    url: "/user/index",
  },
  {
    path: "/other",
    label: "Others",
    icon: "SettingOutlined",
    children: [
      {
        path: "/other/pageOne",
        name: "page1",
        label: "Page 1",
        icon: "SettingOutlined",
      },
      {
        path: "/other/pageTwo",
        name: "page2",
        label: "Page 2",
        icon: "SettingOutlined",
      },
    ],
  },
];

export default MenuConfig;
