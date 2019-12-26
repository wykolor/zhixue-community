<template>
	<view class="server">
		<van-cell-group :border="false" class="server-list" v-for="item in serverList" :key="item.id" :title="item.name">
			<van-grid column-num="3" square clickable >
			  <van-grid-item :icon="list.image" :text="list.appName" v-for="list in item.esAppResps" :key="list.id"/>
			</van-grid>
		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serverList:[
					{
						name:"物业服务",
						esAppResps:[
							{
								appName:"小区公告"
							},
							{
								appName:"小区报修"
							},
							{
								appName:"意见建议"
							},
							{
								appName:"物业缴费"
							},
							{
								appName:"手机开门"
							},
							{
								appName:"便民号码"
							}
						]
					},
					{
						name:"小区互动",
						esAppResps:[
							{
								appName:"小区活动"
							},
							{
								appName:"小区家政"
							},
							{
								appName:"房屋租售"
							},
							{
								appName:"小区拼车"
							},
						]
					}
				]
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
