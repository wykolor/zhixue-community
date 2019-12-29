<script>
export default {
	globalData:{
		notReadNum:0
	},
	onLaunch() {
		
	},
	onShow() {
		this.getnotReadNum();
		
	},
	methods:{
		// 获取未读数据
		getnotReadNum(){
			this.$api.newApi.notReadNumReq().then(res => {
				this.globalData.notReadNum = res.data;
				if(!this.globalData.notReadNum){
					uni.removeTabBarBadge({
						index:2
					})
				}else{
					uni.setTabBarBadge({
						index:2,
						text:String(this.globalData.notReadNum),
					})
				}
			})
		}
	}
};
</script>

<style>
@import "./common/iconfont/iconfont.css";
/*每个页面公共css */ 
*{
	font-family: arial;
}
</style>
