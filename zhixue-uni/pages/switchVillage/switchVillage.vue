<template>
	<view class="switch-village">
		<view class="village-header">
			<van-search
			  :value="searchValue"
			  placeholder="搜索小区"
			  show-action
			  shape="round"
			  @search="searchHandle"
			/>
		</view>
		<view class="village-show">
			<view class="village-list " v-for="item in villageList" :key="item.id">
				<view class="village-img">
					<image :src="item.image"></image>
				</view>
				<view class="village-info">
					<view class="village-title">{{item.communityName}}</view>
					<view>简介：</view>
					<view class="village-desc van-multi-ellipsis--l3">{{item.info}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue:"",
				villageList:[
					{
						communityName:"保利·锦江",
						image:require('../../static/img/index/u62.jpg'),
						info:"位于天府五街位于天府五街位于天府五街位于天府位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街"
					},
					{
						communityName:"锐利·领峰",
						image:require('../../static/img/index/u62.jpg'),
						info:"位于华府大道位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街"
					},
					{
						communityName:"保利·锦江",
						image:require('../../static/img/index/u62.jpg'),
						info:"位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街"
					},
					{
						communityName:"锐利·领峰",
						image:require('../../static/img/index/u62.jpg'),
						info:"位于华府大道位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街"
					},
					{
						communityName:"保利·锦江",
						image:require('../../static/img/index/u62.jpg'),
						info:"位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街"
					},
					{
						communityName:"锐利·领峰",
						image:require('../../static/img/index/u62.jpg'),
						info:"位于华府大道位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街"
					},
					{
						communityName:"保利·锦江",
						image:require('../../static/img/index/u62.jpg'),
						info:"位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街"
					},
					{
						communityName:"锐利·领峰",
						image:require('../../static/img/index/u62.jpg'),
						info:"位于华府大道位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街位于天府五街"
					},
				]
			};
		},
		methods:{
			searchHandle(event){
				console.log(event.detail)
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
		padding: 0.8rem;
		.village-list{
			display: flex;
			align-items: stretch;
			margin-bottom: 0.6rem;
			padding: 0.5rem;
			border-radius: 0.4rem;
			box-shadow: 0 1px 3px #C0C0C0;
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
