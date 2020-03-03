import { get, post} from '../axios.js';

// 账号消费明细
const accountDetailList = "/api/v1/pandaCoin/accountDetailList";

// 通过红包为账号添加金额
const addByDayReward = "/api/v1/pandaCoin/addByDayReward";

// 获取每日红包
const dayReward = "/api/v1/pandaCoin/dayReward";

// 判断是否有红包
const flagHaveDayReward = "/api/v1/pandaCoin/flagHaveDayReward";

export default {
	accountDetailListReq:function(accountDetailListObj){
		return post(accountDetailList,accountDetailListObj)
	},
	addByDayRewardReq:function(addByDayRewardObj){
		return post(addByDayReward,addByDayRewardObj)
	},
	dayRewardReq:function(dayRewardObj){
		return post(dayReward,dayRewardObj)
	},
	flagHaveDayReward:function(flagHaveDayRewardObj){
		return post(flagHaveDayReward,flagHaveDayRewardObj)
	},
}