import { get, post} from '../axios.js';

const esAdvice = "/api/v1/esAdvice/list";

export default {
	esAdviceReq:function(esAdviceObj){
		return post(esAdvice,esAdviceObj)
	}
}