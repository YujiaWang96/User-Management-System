import Mock from "mockjs";
import homeApi from "./mockServeData/home";
import userApi from "./mockServeData/user";
import loginApi from "./mockServeData/permission";

//此处为另外功能：拦截 HTTP 请求
//一旦axios的url符合这个规则，就会执行参数末尾所对应的方法
Mock.mock(/home\/getData/, homeApi.getStatisticalData);
Mock.mock(/home\/getUser/, userApi.getUserList);
//新增用户弹窗
Mock.mock(/home\/addUser/, "post", userApi.createUser);
//编辑用户输入弹窗
Mock.mock(/home\/editUser/, "post", userApi.updateUser);
//删除用户数据
Mock.mock(/home\/deleteUser/, "post", userApi.deleteUser);
//用户登录
Mock.mock(/login/, "post", loginApi.getMenu);
