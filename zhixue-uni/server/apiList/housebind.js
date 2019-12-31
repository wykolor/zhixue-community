import { get, post} from '../axios.js';

// 楼栋获取
const buildurl = "/api/v1/esHourseConf/listTree"
// 房间码校验
const roomCode = '/api/v1/esHourseConf/checkBindRoomPasswd'
// 房产是否绑定
const isBindUrl = '/api/v1/esHourseConf/detail' 
// 智能门禁 社区成员添加
const addMberUrl = "/api/v1/esMember/add"
// 智能门禁 人员类型
const peopleType = "/personTypeList"
export default {
	// 楼栋列表
	buildReq:function(Obj){
		return get(buildurl,Obj)
	},
	roomcodeReq:function(Obj){
		return get(roomCode,Obj)
	},
	isBIndReq:function(Obj){
		return get(isBindUrl,Obj)
	},
	addReq:function(Obj){
		return post(addMberUrl,Obj)
	},
	peopleTypeReq:function(Obj){
		return post(peopleType,Obj)
	}
}