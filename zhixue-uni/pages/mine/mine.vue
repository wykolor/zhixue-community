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
			<template v-for="item in appList">
				<van-cell  :title="item.appName" :icon="item.image" isLink @click="goSecond(item)" :key="item.id" :value="item.appName == '物业电话' ? mobile : ''"></van-cell>
			</template>
		</van-cell-group>
	</view>
</template>

<script>
import uniLofin from "../../utils/login.js";
import { _goSecond } from "../../utils/base.js";
export default {
	data() {
		return {
			userInfo:null,
			appList:[],
			mobile:""
		};
	},
	onShow(){
		this.mobile = getApp().globalData.communityInfo.mobile || "";
		this.userInfo = uni.getStorageSync("userInfo") || null;
		this.getAppList();
	},
	methods:{
		getAppList(){
			this.$api.mineApi.esAppMineReq().then(res => {
				if(res.code === 100000){
					this.appList = res.data;
				}
			})
		},
		// 二级界面
		goSecond(item){
			_goSecond(item);
		}
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
