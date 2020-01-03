<template>
	<view class="start-up">
		<view class="start-up-text">
			<text class="start-up-text-logo">智旭</text>
			<text class="start-up-text-desc">您身边的智慧社区</text>
		</view>
	</view>
</template>

<script>
import uniLogin from "../../utils/login.js";
export default {
	data() {
		return {
			
		};
	},
	onLoad() {
		uniLogin().then(res => {
			// 跳转到首页
			uni.switchTab({
				url:"/pages/index/index"
			})
		});
	}
}
</script>

<style lang="scss" scoped>
.start-up{
	@include  init-style;
	background-color: #fff;
	font-size: 0.9rem;
	color: #430;
	display: flex;
	justify-content: center;
	padding-top: 40px;
	text-align: center;
	.start-up-text{
		.start-up-text-logo{
			margin: 0 auto;
			font-size: 1.6rem;
			color: #fff;
			display: block;
			background-color: $zx-topic-color;
			width:4rem;
			height:4rem;
			line-height: 4rem;
			border-radius: 10px;
		}
		.start-up-text-desc{
			line-height: 2.4;
			letter-spacing: 1px;
		}
	}
}
</style>
