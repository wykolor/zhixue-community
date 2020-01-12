import { get } from '../axios.js'
// 接口路径
let url = "/api/v1/esMember/list";
// 删除照片
let delurl = "/api/v1/esMember/delete";
// 重新下发数据
let repeaturl = "/api/v1/esMember/reReoverImage";
export default {
	facelistReq:function(urlObj){
		return get(url,urlObj)
	},
	delphotoReq:function(urlObj){
		return get(delurl,urlObj)
	},
	repeatReq:function(urlObj){
		return get(repeaturl,urlObj)
	}
}