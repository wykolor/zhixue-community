import { post} from '../axios.js';
import QS from "qs";

// 文章详情
const esArticleDetail = "/api/v1/esArticle/detail";

export default {
	esArticleDetailReq:function(esArticleDetailObj){
		return post(esArticleDetail,QS.stringify(esArticleDetailObj),{
			"Content-Type":"application/x-www-form-urlencoded"
		})
	}
}