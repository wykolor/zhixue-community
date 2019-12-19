import axios from "axios";
import qs from "qs";

// 时间戳
const NewTimeStamp = new Date().getTime();

// 请求超时时间
axios.defaults.timeout = 30000;

// 请求头
axios.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";

// 由于微信小程序需要用微信官方请求接口 wx.request，因此需要用adapter自定义
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    let data =
      config.method === "get" ? config.params : qs.stringify(config.data);
    // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
    wx.request({
      url: config.url,
      method: config.method,
      data: data,
      success: res => {
        return resolve(res);
      },
      fail: err => {
        return reject(err);
      }
    });
  });
};

// axios 拦截器
function Instance() {
  // 请求拦截器
  axios.interceptors.request.use(
    function (request) {
      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
}

Instance();

/**
 * 封装的get请求
 * @param {*} url 请求路径
 * @param {*} params 请求参数
 * @returns
 */
export function get(url, params) {
  return axios({
    method: "get",
    url: url,
    params: params
  });
}

/**
 * 封装的post请求
 * @param {*} url 请求路径
 * @param {*} params 请求参数
 * @returns
 */
export function post(url, params) {
  return axios({
    method: "post",
    url: url,
    data: params
  });
}
