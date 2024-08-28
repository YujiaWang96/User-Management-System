//调用封装好的axios对象，在这里进行后台交互。定义接口调用
import http from "./axios"; //http就是生成的axios对象

export const getData = () => {
  return http.request({
    url: "/home/getData",
    method: "get",
  });
};

export const getUser = (params) => {
  return http.request({
    url: "/home/getUser",
    method: "get",
    params,
  });
};
//新增用户的方法
export const addUser = (data) => {
  return http.request({
    url: "/home/addUser",
    method: "post",
    data,
  });
};
//修改用户的方法
export const editUser = (data) => {
  return http.request({
    url: "/home/editUser",
    method: "post",
    data,
  });
};
//删除用户的方法
export const deleteUser = (data) => {
  return http.request({
    url: "/home/deleteUser",
    method: "post",
    data,
  });
};

export const getMenu = (data) => {
  return http.request({
    url: "/login",
    method: "post",
    data,
  });
};
