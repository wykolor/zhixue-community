
let baseURL = "";
if(process.env.NODE_ENV === 'development'){
	baseURL = "https://mpestate.dev.smartyface.cn";
}else{
	baseURL = "https://mpestate.prd.smartyface.cn";
}
export default baseURL;