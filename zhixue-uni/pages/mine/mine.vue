<template>
	<view class="mine">
		<view class="mine-header">
			<van-cell  size="large" isLink center label-class="my-label" use-label-slot :border="false" :url="userInfo.nickName?'/pages/wallet/wallet':'/pages/authUserInfo/authUserInfo'">
				<text slot="title">{{userInfo.nickName?userInfo.nickName:'登录/注册'}}</text>
				<van-icon slot="icon" :name="userInfo.avatarUrl?userInfo.avatarUrl:'smile'" size="4rem" custom-style="margin-right:10px"></van-icon>
				<view class="" slot="label" @click.stop="goWallet">
					熊猫币:{{userInfo.wxUserEstateConfResp.pandaCoin}}个
				</view>
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
			userInfo:{},
			appList:[],
			mobile:""
		};
	},
	onShow(){
		this.getUserInfo();
		this.mobile = getApp().globalData.communityInfo.mobile || "";
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
		goWallet(){
			uni.navigateTo({
				url: '/pages/wallet/wallet'
			});
		},
		getUserInfo(){
			this.userInfo = getApp().globalData.userInfo;
			this.$api.authApi.detailReq({ openId:getApp().globalData.openId }).then(res => {
				// 存入全局globalData
				if(res.code === 100000){
					this.userInfo = res.data;
				}
			})
		},
		// 二级界面
		goSecond(item){
			if(item.appName=="物业电话"){
				uni.makePhoneCall({
				    phoneNumber:this.mobile 
				});
			}else{
				_goSecond(item);
			}
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
			.my-label{
				color: #fff;
			}
		}
	}
	/deep/ .van-cell{
		font-size: 16px !important;
		.van-icon__image{
			vertical-align: top;
		}
	}		
}
</style>
