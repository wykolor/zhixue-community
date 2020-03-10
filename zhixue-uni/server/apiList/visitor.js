import { get, post} from '../axios.js';
// 获取小区
const cmty = "/api/v1/estateCommunity/enableList";
// 身份验证
const indenty = "/api/v1/esMember/visitor/mpadd"
// 头像验证
const userIndenty = "/api/v1/common/face/checkWithBase64"
// 历史列表
const historyUrl = "/api/v1/visitor/history"
// 同意/拒绝
const accessUrl = "/api/v1/visitor/agreeOrDisAgree"
// 再次申请访问
const applyagainUrl = "/api/v1/visitor/applyAgin"
// 访客消息
const visitorMesUrl = "/api/v1/visitor/visitMessage"
// 访问天数
const visitDayUrl = "/api/v1/visitor/visitorDay"
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
	},
	historyReq:function(obj){
		return get(historyUrl,obj)
	},
	accessReq:function(obj){
		return get(accessUrl,obj)
	},
	applyagainReq:function(obj){
		return get(applyagainUrl,obj)
	},
	vsMesReq:function(obj){
		return get(visitorMesUrl,obj)
	},
	visitDayReq:function(obj){
		return get(visitDayUrl,obj)
	}
}