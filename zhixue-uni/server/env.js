
let baseURL = "";
if(process.env.NODE_ENV === 'development'){
	baseURL = "http://mpestate.dev.smartyface.cn";
	// baseURL = "http://mpestate.prd.smartyface.cn";
}else{
	baseURL = "https://mpestate.prd.smartyface.cn";
}

export default baseURL;