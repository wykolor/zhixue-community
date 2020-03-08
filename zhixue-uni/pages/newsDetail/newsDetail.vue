<template>
	<view class="news-detail">
		<van-cell :border="false" size="large" :title="newsDetail.title" :value="newsDetail.createTime" :label="newsDetail.content"></van-cell>
		<view class="news-detail-footer">
			<view class="page-link" @click="goSink" v-if="newsDetail.sinkType=='page'||newsDetail.sinkType=='html'">
				<text class="iconfont iconshouzhi page-link-icon"></text>
				<text class="page-link-txt" >{{newsDetail.pageTxt}}</text>
			</view>
			<view class="page-home" @click="goHome">
				<van-icon name="wap-home-o" color="#07c160" size="36px"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsDetail:{}
			};
		},
		onLoad(option) {
			const { messageCode } = option;
			this.getNewsDetail(messageCode);
		},
		methods:{
			// 获取详情
			getNewsDetail(messageCode){
				this.$api.newApi.esMessageDetailReq({messageCode}).then(res => {
					this.newsDetail = res.data;
				})
			},
			goSink(){
				uni.navigateTo({
					url:this.newsDetail.pageUrl
				})
			},
			goHome(){
				uni.switchTab({
					url:"/pages/index/index",
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.news-detail{
	.news-detail-footer{
		padding: 0.8rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		z-index: 99;
		width: 100%;
		box-sizing: border-box;
		.page-link{
			color: skyblue;
			.page-link-icon{
				font-size: 1rem;
				margin-right: 5px;
				color:#999;
			}
		}
		.page-home{
			width: 56px;
			height: 56px;
			border-radius: 50%;
			border: 1px solid #07c160;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
