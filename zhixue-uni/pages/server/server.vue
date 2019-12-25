<template>
	<view class="server">
		<van-cell-group :border="false" class="server-list" v-for="item in serverList" :key="item.id" :title="item.categrayName">
			<van-grid column-num="3" square clickable >
			  <van-grid-item icon="photo-o" :text="list.title" v-for="list in item.list" :key="list.id"/>
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
						categrayName:"物业服务",
						list:[
							{
								title:"小区公告"
							},
							{
								title:"小区报修"
							},
							{
								title:"意见建议"
							},
							{
								title:"物业缴费"
							},
							{
								title:"手机开门"
							},
							{
								title:"便民号码"
							}
						]
					},
					{
						categrayName:"小区互动",
						list:[
							{
								title:"小区活动"
							},
							{
								title:"小区家政"
							},
							{
								title:"房屋租售"
							},
							{
								title:"小区拼车"
							},
						]
					}
				]
			};
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
