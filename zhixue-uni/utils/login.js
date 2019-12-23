/**
 * 授权登录相关
 * */ 
 import { api } from "../server/api.js";
 
 /**
  * 像后台传递code获取用户令牌
  * @param code 微信返回的code
  * */ 
 function zxLogin(code){
	api.authApi.loginReq({ code }).then(res => {
		let { openId,token,userCode } = res.data;
		// 将令牌存入本地
		uni.setStorageSync("token",`Bearer${token}`);
		// // 更新用户信息
		// updateUserInfo();
	})
 }
 /**
  * 更新用户信息 需要用户显示授权
  * */ 
 function updateUserInfo(){
	 uni.getUserInfo({
		provider:"weixin",
		// withCredentials: true,
		success:function(data){
			console.log(data);
		},
		fail(error) {
			console.log(error)
		}
	 })
 }
 /**
  * 
  * */ 
 function uniLogin(){
	 // 登录获得code传给后台
	 uni.login({
	   provider: 'weixin',
	   success: function (loginRes) {
		const { code } = loginRes;
		zxLogin(code);
	   }
	 });
 }
 export default uniLogin;