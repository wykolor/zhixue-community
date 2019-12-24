import { get, post} from '../axios.js';

// 轮播图
const esBanner = "/api/v1/estate/esBanner/list";
// app模块
const esAppIndex = "/api/v1/estate/esAppIndex/list";

const esAppFacility = "/api/v1/estate/esAppFacility/list";
// 服务模块
const esAppService = "/api/v1/estate/esAppService/list";
// 中间区域图片
const esAppMiddle = "/api/v1/estate/esAppMiddle/list";
// 文章模块
const esArticle = "/api/v1/esArticle/allList";

export default {
	// 轮播图
	esBannerReq:function(esBannerObj){
		return get(esBanner,esBannerObj)
	},
	esAppIndexReq:function(esAppIndexObj){
		return get(esAppIndex,esAppIndexObj)
	},
	esAppFacilityReq:function(esAppFacilityObj){
		return get(esAppFacility,esAppFacilityObj)
	},
	esAppServiceReq:function(esAppServiceObj){
		return get(esAppService,esAppServiceObj)
	},
	esAppMiddleReq:function(esAppMiddleObj){
		return get(esAppMiddle,esAppMiddleObj)
	},
	esArticleReq:function(esArticleObj){
		return post(esArticle,esArticleObj)
	}
}