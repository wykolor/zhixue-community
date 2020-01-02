<template>
	<view class="server">
		<van-cell-group :border="false" class="server-list" v-for="(item,itemIndex) in serverList" :key="itemIndex" :title="item.name">
			<van-grid column-num="3" square clickable >
			  <van-grid-item :icon="list.image" :text="list.appName" v-for="(list,index) in item.esAppResps" :key="index" @click="goSecond(list)"/>
			</van-grid>
		</van-cell-group>
	</view>
</template>

<script>
import { _goSecond } from "../../utils/base.js";
export default {
	data() {
		return {
			serverList:[]
		};
	},
	onShow() {
		this.getServerList();
	},
	methods:{
		// 服务模块
		getServerList(){
			this.$api.serverApi.esAppServiceReq().then(res => {
				this.serverList = res.data;
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
	padding-bottom: 1rem;
}
</style>
