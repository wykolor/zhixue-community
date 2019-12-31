<template>
	<view class="news-detail">
		<van-cell :border="false" size="large" :title="newsDetail.title" :value="newsDetail.createTime" :label="newsDetail.content"></van-cell>
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
			getNewsDetail(messageCode){
				this.$api.newApi.esMessageDetailReq({messageCode}).then(res => {
					this.newsDetail = res.data;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
