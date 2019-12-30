import { get, post} from '../axios.js';

// 轮播图
const esBanner = "/api/v1/estate/esBanner/list";
// app模块
const esAppIndex = "/api/v1/estate/esAppIndex/list";

const esAppFacility = "/api/v1/estate/esAppFacility/list";

// 中间区域图片
const esAppMiddle = "/api/v1/estate/esAppMiddle/list";

// 文章模块
const esArticle = "/api/v1/esArticle/allList";

// 社区信息
const communityDetail = "/api/v1/estateCommunity/detail";

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
	esAppMiddleReq:function(esAppMiddleObj){
		return get(esAppMiddle,esAppMiddleObj)
	},
	esArticleReq:function(esArticleObj){
		return post(esArticle,esArticleObj)
	},
	communityDetailReq:function(communityDetailObj){
		return get(communityDetail,communityDetailObj)
	}
}