import { get, post} from '../axios.js';

const alertList = "/api/v1/plAlarmLog/pageList";

export default {
	alertReq:function(obj){
		return post(alertList,obj)
	}
}