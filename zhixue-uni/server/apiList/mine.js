import { get } from "../axios.js";

const esAppMine = "/api/v1/estate/esAppMine/list";

export default {
	esAppMineReq:function(esAppMineObj){
		return get(esAppMine,esAppMineObj)
	}
}