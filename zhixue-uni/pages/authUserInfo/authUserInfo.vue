<template>
	<view class="auth-user-info">
		<view class="auth-tips">
			<view class="tips-list">
				<image src="../../static/img/video.png" alt="logo" mode="aspectFit"></image>
				<text class="iconfont iconbangding"></text>
				<text class="iconfont iconweixin wx-logo"></text>
			</view>
			<view class="tips-text">
				<text>智旭社区</text>
				<text>申请获取您的公开信息(头像、昵称等)</text>
			</view>
			<button type="primary"  open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getUserInfo(detail){
				console.log(detail)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.auth-user-info{
	width: 100%;
	padding-top: 5rem;
	box-sizing: border-box;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	.auth-tips{
		width: 90%;
		.tips-list{
			display: flex;
			justify-content: space-around;
			align-items: center;
			text{
				font-size: 1.6rem;
				&.wx-logo{
					font-size: 2.8rem;
					color: #07c160;
				}
			}
			image{
				width: 20%;
				height: 3rem;
			}
		}
		.tips-text{
			text-align: center;
			font-size: 0.8rem;
			margin: 0.8rem 0 4rem;
			text{
				display: block;
				line-height: 24px;
				&:first-child{
					font-size: 1rem;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
