import { get, JSpost} from '../axios.js';
// 获取小区
const cmty = "/api/v1/estateCommunity/enableList";
// 身份验证
const indenty = "/api/v1/esMember/visitor/mpadd"
export default {
	// 轮播图
	cmtyReq:function(Obj){
		return get(cmty,Obj)
	},
	indentyReq:function(obj){
		return JSpost(indenty,obj)
	}
}