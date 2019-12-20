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
	onLoad() {
		this.getData();
	},
		
	created(){
		this.getData();
	},
	methods: {
		getData(){
			this.$api.indexApi.loginAddress().then(res => {
				console.log("请求数据",res)
			})
		}
	}
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
