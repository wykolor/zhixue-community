<template>
	<view>
		我是我的界面
	</view>
</template>

<script>
	import uniLofin from "../../utils/login.js"
	export default {
		data() {
			return {
				
			};
		},
		onShow(){
			// 待登录回调之后
			uniLofin().then(res => {
				this.getBannerData();
			})
			
		},
		methods:{
			// 获取轮播图数据
			getBannerData(){
				this.$api.indexApi.esBannerReq({}).then(res => {
					this.banerImage = res.data;
				})
				this.$api.indexApi.esAppIndexReq({}).then(res => {
					
				})
				this.$api.indexApi.esAppFacilityReq({}).then(res => {
					
				})
				this.$api.indexApi.esAppServiceReq({}).then(res => {
					
				})
				this.$api.indexApi.esAppMiddleReq({}).then(res => {
					
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
