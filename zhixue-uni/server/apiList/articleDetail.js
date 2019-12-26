import { get, post} from '../axios.js';

const esArticleDetail = "/api/v1/esArticle/detail";

export default {
	esArticleDetailReq:function(esArticleDetailObj){
		return post(esArticleDetail,esArticleDetailObj,{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    })
	}
}