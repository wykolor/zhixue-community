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

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
    // 将令牌配置到请求头信息中
	const testToken = "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzY5NTE4ODEsInVzZXJfbmFtZSI6Im9hU1FCNWVwN3ltMzhqTTdXdU91SlV2eTB2UTAiLCJqdGkiOiIxNWE5MTg3ZC1lMDNmLTQzZTQtYmE1ZC0yN2ZiODBjMzUwYjgiLCJjbGllbnRfaWQiOiJ3ZWJBcHAiLCJzY29wZSI6W119.RwCrwkmYiBwHH0IOtQaE2S4lwbUTCTnD8R5EGzF4JOk"
    const token = uni.getStorageSync("token") || testToken;
    token && (config.headers.Authorization = token);
    return config
})

// 响应拦截器 
http.interceptors.response.use(response => {
    // code...
    
    return response.data
}, error => {
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