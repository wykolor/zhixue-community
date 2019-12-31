import { get, post } from "../axios.js";

// 消息列表
const messageList = "/api/v1/esMessage/messageList";

// 通知列表
const noticeList = "/api/v1/esMessage/noticeList";

// 消息未读数
const notReadNum = "/api/v1/esMessage/notReadNum";

// 消息详情
const esMessageDetail = "/api/v1/esMessage/detail";

export default {
	messageListReq:function(messageListObj){
		return post(messageList,messageListObj)
	},
	noticeListReq:function(noticeListObj){
		return post(noticeList,noticeListObj)
	},
	notReadNumReq:function(notReadNumObj){
		return get(notReadNum,notReadNumObj)
	},
	esMessageDetailReq:function(esMessageDetailObj){
		return get(esMessageDetail,esMessageDetailObj)
	}
}