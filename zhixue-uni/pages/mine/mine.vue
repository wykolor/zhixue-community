<template>
	<view class="mine">
		<view class="mine-header">
			<van-cell :title="userInfo.nickName" v-if="userInfo" size="large" center :border="false">
				<van-icon slot="icon" :name="userInfo.avatarUrl" size="4rem" custom-style="margin-right:10px"></van-icon>
			</van-cell>
			<van-cell v-else title="登录/注册"  size="large" isLink center :border="false" url="/pages/authUserInfo/authUserInfo">
				<van-icon slot="icon" name="smile" size="4rem" custom-style="margin-right:10px"></van-icon>
			</van-cell>
			
		</view>
		<van-cell-group :border="false">
			<van-cell title="人脸管理"  isLink icon="coupon-o">
			</van-cell>
			<van-cell title="物业电话"  isLink icon="phone"/>
			<van-cell title="智能门禁"  isLink icon="smile-o"/>
			<van-cell title="意见反馈" isLink icon="ellipsis"/>
		</van-cell-group>
	</view>
</template>

<script>
	import uniLofin from "../../utils/login.js"
	export default {
		data() {
			return {
				userInfo:null
			};
		},
		onShow(){
			this.userInfo = uni.getStorageSync("userInfo") || null
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
.mine{
	width: 100%;
	min-height: 100vh;
	background: #fff;
	@include border-box;
	.mine-header{
		& /deep/ .van-cell{
			padding-bottom: 3rem;
			padding-top: 2rem;
			background-color: $zx-topic-color;
			color: #fff;
			.van-cell__right-icon-wrap{
				color: #fff;
			}
			image{
				border-radius: 50%;
			}
		}
	}
		
}
</style>
