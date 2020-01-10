<template>
	<view class="server">
		<van-grid column-num="3" square clickable >
		  <van-grid-item :icon="list.image" :text="list.appName" v-for="(list,index) in deviceList" :key="index" @click="goSecond(list)"/>
		</van-grid>
	</view>
</template>

<script>
	import { _goSecond } from "../../utils/base.js";
	export default{
		data(){
			return {
				deviceList:[]
			};
		},
		onShow() {
			this.getSmartList();
		},
		methods:{
			// 服务模块
			getSmartList(){
				this.$api.deviceApi.smartIndexReq({}).then(res => {
					console.log(res)
					this.deviceList = res.data;
				})
			},
			// 进入二级界面
			goSecond(item){
				console.log(item)
				_goSecond(item);
			},
		}
	}	
</script>

<style lang="scss" scoped>
.server{
	@include init-style;
	background-color: $uni-bg-color-page;
	padding:10px;
}
</style>
