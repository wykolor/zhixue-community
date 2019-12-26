
import { get, post} from '../axios.js';
// 服务模块
const esAppService = "/api/v1/estate/esAppService/list";

export default {
	esAppServiceReq:function(esAppServiceObj){
		return get(esAppService,esAppServiceObj)
	},
}