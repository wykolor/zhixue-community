import { post } from '../axios.js'
// 接口路径
let url = "api/v1/esArticle/estateinfo";
export default {
	 wyintroReq:function(urlObj){
		 return post(url,urlObj)
	 }
}