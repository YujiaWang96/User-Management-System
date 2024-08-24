//调用封装好的axios对象，在这里进行后台交互。定义接口调用
import http from "./axios"; //http就是生成的axios对象

export const getData = () => {
  return http.request({
    url: "/home/getData",
    method: "get",
  });
};
