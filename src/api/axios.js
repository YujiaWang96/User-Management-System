import axios from "axios";

// 定义基础 URL 前缀
const baseUrl = "/api";

// 定义一个 HttpRequest 类，用于封装 axios 请求
class HttpRequest {
  // 构造函数，接收并保存基础 URL
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // 获取内部配置的方法。每次发送请求的时候要携带一些参数配置，有一些是固定的，就放在config里面。options里就是额外加的
  getInsideConfig() {
    // 定义并返回配置对象
    const config = {
      baseUrl: this.baseUrl, // 配置基础 URL
      header: {}, // 配置请求头
    };
    return config;
  }

  // 拦截器方法，接收 axios 实例作为参数
  interception(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config;
      },
      function (error) {
        // 处理请求错误
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        // 对响应数据做些什么
        return response;
      },
      function (error) {
        // 处理响应错误
        return Promise.reject(error);
      }
    );
  }

  // 发送请求的方法
  request(options) {
    //options里是除了上面固定的config之外，额外搭配的外部传递的一些可选
    // 合并内部配置和传入的配置选项
    options = { ...this.getInsideConfig(), ...options };
    // 创建 axios 实例
    const instance = axios.create();
    // 应用拦截器
    this.interception(instance);
    // 返回 axios 实例的请求结果
    return instance(options); //当你调用 axios.create() 时，它返回的 instance 实际上是一个可以调用的函数，但它同时也是一个对象，这使得它可以被当作函数来使用，也可以拥有自己的属性和方法。instance(options) 实际上是在调用这个配置好的 Axios 实例函数，发起 HTTP 请求。
  }
}

// 导出一个 HttpRequest 实例，并传入基础 URL
export default new HttpRequest(baseUrl);
