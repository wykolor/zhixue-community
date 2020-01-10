import { get } from '../axios.js';
// 智能设备
const smartUrl = "/api/v1/estate/esAppFacility/list";

export default {
	smartIndexReq:function(obj){
		return get(smartUrl,obj)
	}
}