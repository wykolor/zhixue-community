import { get, post} from '../axios.js';

// 轮播图
const esBanner = "/api/v1/estate/esBanner/list";

export default {
	// 轮播图
	esBannerReq:function(esBannerObj){
		return get(esBanner,esBannerObj)
	}
}