
let baseURL = "";
if(process.env.NODE_ENV === 'development'){
	baseURL = "http://mpestate.dev.smartyface.cn";
}else{
	baseURL = "http://mpestate.prd.smartyface.cn";
}
export default baseURL;