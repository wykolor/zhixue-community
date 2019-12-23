import axios from '@/js_sdk/gangdiedao-uni-axios';

// 创建自定义接口服务实例
const http = axios.create({
    baseURL: "http://mpestate.dev.smartyface.cn", // 测试服务器
	// baseURL: "http://mpestate.prd.smartyface.cn/",   // 生产机
    timeout: 6000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
    // #ifdef H5
    withCredentials: true,
    // #endif
    headers: {
        'Content-Type': 'application/json',
        //'X-Requested-With': 'XMLHttpRequest',
    },
})

function startLoading(){
	uni.showLoading({
	    title: '加载中',
		mask:false
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

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
	// 加载样式开启
	showFullScreenLoading();
    // 将令牌配置到请求头信息中
    const token = uni.getStorageSync("token");
	const phone = uni.getStorageSync("phone");
    token && (config.headers.Authorization = token);
	phone && (config.headers.phone = phone);
	// if(!config.headers.phone){
	// 	uni.redirectTo({
	// 		url:"/pages/authPhone/authPhone"
	// 	})
	// }
    return config
})

// 响应拦截器 
http.interceptors.response.use(response => {
	// 隐藏加载样式
	tryHideFullScreenLoading();
    return response.data
}, error => {
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
  return http({
    method: "post",
    url: url,
    data: params
  });
}