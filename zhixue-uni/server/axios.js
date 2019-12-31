import axios from '@/js_sdk/gangdiedao-uni-axios';
import uniLogin from "../utils/login.js";
// 创建自定义接口服务实例
const http = axios.create({
    baseURL: "http://mpestate.dev.smartyface.cn", // 测试服务器
	// baseURL: "http://mpestate.prd.smartyface.cn/",   // 生产机
    timeout: 6000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
    // #ifdef H5
    withCredentials: true,
    // #endif
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
})

function startLoading(){
	uni.showLoading({
		title: '加载中',
		mask:true
	});
}
function endLoading(){
	uni.hideLoading();
}

// 声明一个对象用于存储请求个数
var needLoadingRequestCount = 0;
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};
// 接口白名单
let _login = "/api/v1/wechat/login";

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
	// 加载样式开启
	showFullScreenLoading();
	const token = uni.getStorageSync("token");
	token && (config.headers.Authorization = token);
	return config
	
},error => {
	// 请求错误
	return Promise.reject(error);
})
// 响应拦截器 
http.interceptors.response.use(response => {
	// 隐藏加载样式
	tryHideFullScreenLoading();
	if(response.data.code == 100001){
		uni.navigateTo({
			url:"/pages/authPhone/authPhone"
		})
	}
    return response.data
}, error => {
	let { status } = error.response;
	// 登录过期
	if(status === 401){
		uni.clearStorageSync("token");
	}
	tryHideFullScreenLoading();
    return Promise.reject(error.message)
})

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
    params:params
  });
}

/**
 * 封装的post请求
 * @param {*} url 请求路径
 * @param {*} params 请求参数
 * @returns
 */
export function post(url, params,headers) {
  return http({
    method: "post",
    url: url,
    data:params,
	headers
  });
}
