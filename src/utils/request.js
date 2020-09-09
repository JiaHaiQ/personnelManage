import axios from "axios";
import { message } from 'antd';
import { getToken, getUsername } from './cookies';

const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
  });

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUsername();
    return config;
 }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const data = response.data;
    // console.log(data);
    if(data.resCode !== 0){
      message.error(data.message)
      return Promise.reject(response);
    } else {
      return response;
    }
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;