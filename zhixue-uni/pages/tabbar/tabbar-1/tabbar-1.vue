<template>
	<view class="content">
		页面 - 1
		<view class="kolor">
			kolor
		</view>
		<van-button type="danger">测试按钮</van-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	
};
</script>

<style lang="scss" scoped>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
	.kolor{
		color: red;
	}
		
}
</style>
