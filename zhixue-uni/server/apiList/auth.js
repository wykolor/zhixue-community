import { get, post} from '../axios.js';

// 登录 
const login = "/api/v1/wechat/login";

// 获取用户信息
const detail = "/api/v1/wechat/detail";

// 更新用户信息
const updateUserInfo = "/api/v1/wechat/updateUserInfo";

// 更新用户电话号码
const updateUserMobile = "/api/v1/wechat/updateUserMobile";

// 获取logo
const esConfig = "/api/v1/esConfig/committxt";

export default {
	// 登录
	loginReq:function(loginObj) {
		return get(login,loginObj)
	},
	// 获取用户信息
	detailReq:function(detailObj){
		return get(detail,detailObj)
	},
	// 更新用户信息
	updateUserInfoReq:function(updateUserInfoObj){
		return post(updateUserInfo,updateUserInfoObj)
	},
	// 更新用户电话号码
	updateUserMobileReq:function(updateUserMobileObj){
		return post(updateUserMobile,updateUserMobileObj)
	},
	esConfigReq:function(esConfigObj){
		return get(esConfig,esConfigObj)
	}
}