import { get, post} from '../axios.js';

// 楼栋获取
const buildurl = "/api/v1/esHourseConf/listTree"
// 房间码校验
const roomCode = '/api/v1/esHourseConf/checkBindRoomPasswd'
// 房产是否绑定
const isBindUrl = '/api/v1/esHourseConf/detail' 
// 绑定房间
const sureBindUrl = "/api/v1/esHourseConf/bindRoom"
// 智能门禁 社区成员添加
const addMberUrl = "/api/v1/esMember/add"
// 智能门禁 人员类型
const peopleType = "/personTypeList"
// 提示内容
const infoUrl = "/api/v1/esConfig/committxt"
// 获取绑定方式
const bindWayUrl = "/api/v1/esConfig/hourseConfig"
// 获取房产列表
const houseListUrl = "/api/v1/esHourseConf/detail"
// 切换默认选择
const defaultRadio = "/api/v1/esHourseConf/changeDefault"
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
	},
	infoMesReq:function(Obj){
		return get(infoUrl,Obj)
	},
	sureBindReq:function(Obj){
		return get(sureBindUrl,Obj)
	},
	bindWayReq:function(Obj){
		return get(bindWayUrl,Obj)
	},
	hsListReq:function(Obj){
		return get(houseListUrl,Obj)
	},
	switchReq:function(Obj){
		return get(defaultRadio,Obj)
	}
}