// 功能待开发提示
export function funWaitTips(){
	uni.showToast({
		title:"功能正在开发",
		icon:"none",
		duration:2000
	})
}

// 进入二级界面
export function	_goSecond(item){
	let isBindMobile = getApp().globalData.userInfo.wxUserEstateConfResp.bindMobile;
	let outUrl = isBindMobile ? "/pages/outUrl/outUrl?outUrl=":"/pages/outUrl/outUrl&outUrl=";
	switch (item.sinkType){
		case "page":
			bindMobile(item.needMobile,item.pageUrl)
			break;
		case "html":
			let redirectUrl = `${outUrl}${encodeURI(item.pageUrl)}`;
			bindMobile(item.needMobile,redirectUrl)
			break;
		case "no":
			funWaitTips();
			break;
		default:
			funWaitTips();
			break;
	}
}
function bindMobile(needMobile,redirectUrl){
	let isBindMobile = getApp().globalData.userInfo.wxUserEstateConfResp.bindMobile;
	// 如果需要用户绑定手机并且暂时还没有绑定的时候
	if(!isBindMobile && needMobile === "esNeedMobile"){
		uni.navigateTo({
			url:"/pages/authPhone/authPhone?redirectUrl="+redirectUrl
		})
	}else{
		uni.navigateTo({
			url:redirectUrl
		})
	}
}