import { post,get } from "../axios.js";
// 商品详情
const gooddetailUrl = '/api/v1/exchangeProduct/detail'
// 商品消费
const goodconsumeUrl = '/api/v1/exchangeProduct/consume'

export default{
	goodsDeatilReq:function(obj){
		return get(gooddetailUrl,obj)
	},
	goodconsumeReq:function(obj){
		return get(goodconsumeUrl,obj)
	}
}