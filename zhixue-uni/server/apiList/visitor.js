import { get, post} from '../axios.js';
// 获取小区
const cmty = "/api/v1/estateCommunity/enableList";
// 身份验证
const indenty = "/api/v1/esMember/visitor/mpadd"
// 头像验证
const userIndenty = "/api/v1/common/face/checkWithBase64"
export default {
	// 轮播图
	cmtyReq:function(Obj){
		return get(cmty,Obj)
	},
	indentyReq:function(obj){
		return post(indenty,obj)
	},
	userIndentyReq:function(obj){
		return post(userIndenty,obj)
	}
}