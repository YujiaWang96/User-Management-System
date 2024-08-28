import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages";
import Home from "../pages/home";
import Goods from "../pages/goods";
import User from "../pages/user";
import OtherPage1 from "../pages/others/otherPage1";
import OtherPage2 from "../pages/others/otherPage2";
import NotFound from "../pages/notFound";
import Login from "../pages/login/index";

const router = createBrowserRouter([
  {
    //发生错误，显示404这个组件
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Main />,
    children: [
      //重定向，会把main页面自动漫游到home页面
      {
        path: "/",
        element: <Navigate to="home" replace />, //replace 的作用就是防止用户回到之前的页面
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "mall",
        element: <Goods />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "other",
        children: [
          {
            path: "PageOne",
            element: <OtherPage1 />,
          },
          {
            path: "PageTwo",
            element: <OtherPage2 />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
