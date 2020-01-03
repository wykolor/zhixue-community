import { post} from '../axios.js';
import QS from "qs";

// 文章详情
const esArticleDetail = "/api/v1/esArticle/detail";
// 点赞文章
const esArticleThumbs = "/api/v1/esArticle/thumbs";


export default {
	esArticleDetailReq:function(esArticleDetailObj){
		return post(esArticleDetail,QS.stringify(esArticleDetailObj),{
			"Content-Type":"application/x-www-form-urlencoded"
		})
	},
	esArticleThumbsReq:function(esArticleThumbsObj){
		return post(esArticleThumbs,QS.stringify(esArticleThumbsObj),{
			"Content-Type":"application/x-www-form-urlencoded"
		})
	}
}