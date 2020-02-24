import { get, post} from '../axios.js';
// 处理新增
const newType = "/api/v1/plAlarmLog/person/newAdd";
// 处理异常
const abNormalType = "/api/v1/plAlarmLog/person/abNormal";
// 获取社区下拉列表
const communityList = "/api/v1/plAlarmLog/communityList";
// 获取社区列表
const communityPage = "/api/v1/esPersonInout/pageList";
// 提交处理结果
const dealResult = "/api/v1/plAlarmLog/dispose"
export default {
	allTypeReq:function(obj){
		return post(newType,obj)
	},
	abNormalReq:function(obj){
		return post(abNormalType,obj)
	},
	communityReq:function(obj){
		return post(communityList,obj)
	},
	ctypageReq:function(obj){
		return post(communityPage,obj)
	},
	dealReq:function(obj){
		return post(dealResult,obj)
	}
}