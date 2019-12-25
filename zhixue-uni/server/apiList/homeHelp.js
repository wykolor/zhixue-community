import { post } from "../axios.js";

// 家政服务列表
const eshourseKeeping = "/api/v1/eshourseKeeping/list";

// 家政服务类型
const typeList = "/api/v1/eshourseKeeping/typeList";

export default {
	eshourseKeepingReq:function(eshourseKeepingObj){
		return post(eshourseKeeping,eshourseKeepingObj)
	},
	typeListReq:function(typeListObj){
		return post(typeList,typeListObj)
	}
}