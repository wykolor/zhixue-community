<template>
	<view id="face_box">
		<view class="content">
			<view class="up_face" v-for="(v,i) in imgList" :key="i">
				<image :src="v.image"></image>
				<text class="name">{{v.memberName}}</text>
				<text class="status">
					状态：
					<text class="passing" v-if="v.status=='checkIng'">审核中</text> 
					<text class="nopass" v-if="v.status=='checkFail'">未通过</text> 
					<text v-if="v.status=='notCheck'">未审核</text> 
					<text class="passed" v-if="v.status=='checkSuccess'">已通过</text> 
				</text>
				<text>有效期:{{v.endTime}}</text>
			</view>
			<error-tip style="width: 100%;" v-if="!imgList.length"></error-tip>
		</view>
		<view class="uploader" @click="upload">
			<text>+</text>
		</view>
	</view>
</template>

<script>
	import ErrorTip from "../../components/error/error.vue";
	export default {
		data() {
			return {
				imgList:[]
			}
		},
		components:{
			"error-tip":ErrorTip,
		},
		onLoad() {
			// 获取人脸列表
			this.$api.faceApi.facelistReq({}).then(res=>{
				console.log(res)
				this.imgList = res.data
			})
		},
		methods: {
			upload(){
				uni.navigateTo({
					url:"../smartdoor/upFace"
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	
	#face_box {
		width: 100%;
		font-size:1rem;
		.content {
			width:100%;
			margin: 0 auto;
			padding:1% 0;
			display: flex;
			justify-content:flex-start;
			flex-wrap: wrap;
			text-align: center;
			.up_face {
				width:31%;
				margin:0 1.15% 20rpx;
				font-size: 12px;
				image {
					width: 100%;
					height: 9rem;
				}
				.name{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.status,.name {
					display: block;
					text-align: center;
					.passing{
						color: #409EFF;
					}
					.passed{
						color: #67C23A;
					}
					.nopass{
						color: #F56C6C;
					}
				}
			}
		}
		.uploader{
			position: fixed;
			bottom:1rem;
			right: 1rem;
			border: 1px solid #07c160;
			border-radius:50%;
			height: 60px;
			width: 60px;
			text-align: center;
			line-height: 56px;
			text{
				font-size:34px;
				color:#07c160;
			}
		}
	}
</style>
