import { get } from '../axios.js'
// 接口路径
let url = "/api/v1/esMember/list";
export default {
	 facelistReq:function(urlObj){
		 return get(url,urlObj)
	 }
}