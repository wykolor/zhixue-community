import { get } from "../axios.js";

// 小区列表
const enableList = "/api/v1/estateCommunity/enableList";

// 更换小区
const changeCommunity = "/api/v1/estateCommunity/changeCommunity";

// 小区信息
const communityDetail = "/api/v1/estateCommunity/detail";

export default {
	// 小区列表
	enableListReq:function(enableListObj){
		return get(enableList,enableListObj)
	},
	// 更换小区
	changeCommunityReq:function(changeCommunityObj){
		return get(changeCommunity,changeCommunityObj)
	},
	// 小区信息
	communityDetailReq:function(communityDetailObj){
		return get(communityDetail,communityDetailObj)
	}
}