import axios from "@/js_sdk/gangdiedao-uni-axios";

import baseURL from "./env.js";

// 创建自定义接口服务实例
const http = axios.create({
  baseURL:baseURL,
  timeout: 20000, // 不可超过 manifest.json 中配置 networkTimeout的超时时间
  // #ifdef H5
  withCredentials: true,
  // #endif
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

function startLoading() {
  uni.showLoading({
    title: "加载中",
    mask: true
  });
}
function endLoading() {
  uni.hideLoading();
}

// 声明一个对象用于存储请求个数
var needLoadingRequestCount = 0;
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}
// 接口白名单
let _login = "/api/v1/wechat/login";

// 拦截器 在请求之前拦截
http.interceptors.request.use(
	config => {
	
    // 加载样式开启
    showFullScreenLoading();
	// 配置请求白名单 除了登录接口 其他都加上请求头token
	if(!config.url.includes(_login)){
		const token = uni.getStorageSync("token");
		token && (config.headers.Authorization = token);  
	}
    return config;
  },
  error => {
    // 请求错误
    return Promise.reject(error);
  }
);
// 响应拦截器
http.interceptors.response.use(
  response => {
    // 隐藏加载样式
    tryHideFullScreenLoading();
    if (response.data.code == 100001) {
      uni.navigateTo({
        url: "/pages/authPhone/authPhone"
      });
    }
    return response.data;
  },
  error => {
	// 请求超时
	if (!error.response){
		tryHideFullScreenLoading();
		uni.showToast({
		    title: '请求超时,请重试!',
			icon:"none",
		    duration: 2000
		});
		return false;
	}
    // 登录过期
	let { status } = error.response;
    if (status === 401) {
      uni.clearStorageSync("token");
	  uni.showToast({
		  title:"抱歉,登录过期!",
		  icon:"none",
		  duration:1000,
		  success() {
		  	uni.redirectTo({
		  		url: '/pages/startup/startup'
		  	});
		  }
	  })
    }	
    tryHideFullScreenLoading();
    return Promise.reject(error.message);
  }
);

/**
 * 封装的get请求
 * @param {*} url 请求路径
 * @param {*} params 请求参数
 * @returns
 */
export function get(url, params) {
  return http({
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
export function post(url, params, headers) {
  return http({
    method: "post",
    url: url,
    data: params,
    headers
  });
}

