<template>
	<view class="switch-village">
		<view class="village-header">
			<van-search
			  placeholder="搜索小区"
			  show-action
			  shape="round"
			  @search="searchHandle"
			/>
		</view>
		<view class="village-show">
			<view class="village-list " v-for="item in villageList" :key="item.id" :id="item.code" @click="clickHandle">
				<view class="village-img">
					<image :src="item.image"></image>
				</view>
				<view class="village-info">
					<view class="village-title">{{item.communityName}}</view>
					<view>简介：</view>
					<view class="village-desc van-multi-ellipsis--l3">{{item.info}}</view>
				</view>
			</view>
			<error-tip v-if="!villageList.length"></error-tip>
		</view>
	</view>
</template>

<script>
	import ErrorTip from "../../components/error/error.vue";
	export default {
		data() {
			return {
				searchValue:"",
				villageList:[] // 小区列表
			};
		},
		components:{
			"error-tip":ErrorTip,
		},
		onShow() {
			this.getVillageList();
		},
		methods:{
			searchHandle(event){
				this.searchValue = event.detail;
				this.getVillageList();
				console.log(event.detail)
			},
			// 获取小区列表
			getVillageList(){
				this.$api.switchVillageApi.enableListReq({
					keyWord:this.searchValue
				}).then(res => {
					this.villageList = res.data;
				})
			},
			// 切换小区
			changeCommunity(communityCode){
				this.$api.switchVillageApi.changeCommunityReq({communityCode}).then(res => {
					if(res.code === 100000){
						
					}
				})
			},
			clickHandle(e){
				let communityCode = e.currentTarget.id;
				uni.showModal({
					title:"确认切换小区吗?",
					confirmColor:"#07c160",
					success:(res) => {
						if (res.confirm) {
							// 用户点击了确定按钮
							this.changeCommunity(communityCode)
						} else if (res.cancel) {
							console.log("取消切换")
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "../../wxcomponents/vant/common/index.wxss";
.switch-village{
	width: 100%;
	@include border-box;
	min-height: 100vh;
	padding-top: 54px;
	.village-header{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
	}
	.village-show{
		width: 100%;
		@include border-box;
		padding: 0.6rem;
		.village-list{
			display: flex;
			align-items: stretch;
			margin-bottom: 0.6rem;
			padding: 0.5rem;
			min-height: 200rpx;
			border-radius: 0.4rem;
			box-shadow: 0 0 10px #f0f0f0;
			.village-img{
				width: 40%;
				padding-right:20rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.village-info{
				width: 60%;
				font-size: 0.7rem;
				color: #999;
				line-height: 1.2rem;
				.village-title{
					font-size: 1rem;
					line-height: 1.4rem;;
					color: #666;
				}
				.village-desc{
					@include letter-space-1;
				}
			}
		}
	}
}
</style>
