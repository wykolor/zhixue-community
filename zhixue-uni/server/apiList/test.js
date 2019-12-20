import { post } from '../axios.js'
// 接口路径
let url = "core/api/sales/Article_banner";
export default {
	// 
	 loginReq:function(urlObj){
		 return post(url,urlObj)
	 }
}