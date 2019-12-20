import { post } from '../axios.js'
let url = "core/api/sales/Article_banner";
export default {
	 loginAddress:function(urlObj){
		 return post(url,urlObj)
	 }
}