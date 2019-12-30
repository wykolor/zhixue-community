/**
 * 授权登录相关
 * */ 
 import { api } from "../server/api.js";
 
 /**
  * 像后台传递code获取用户令牌
  * @param code 微信返回的code
  * */ 
 function zxLogin(code,resolve,reject){
	api.authApi.loginReq({ code }).then(res => {
		if(res.code === 100000){
			let { openId,token,userCode } = res.data;
			getApp().globalData.openId = openId;
			// 通过openId获取用户信息
			api.authApi.detailReq({ openId }).then(res => {
				// 存入全局globalData
				if(res.code === 100000){
					getApp().globalData.userInfo = res.data;
				}
			})
			
			// 将令牌存入本地
			uni.setStorageSync("token",`Bearer${token}`);
			
			resolve(res.data);
		}else{
			reject("error");
		}
	})
 }
 /**
  * 微信登录
  * */ 
 function uniLogin(){
	 // 调用登录接口
	return new Promise(function(resolve,reject){
		// 微信登录
		uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
				const { code } = loginRes;
				zxLogin(code,resolve,reject);
			}
		});
	}) 
 }
 export default uniLogin;