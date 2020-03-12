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
				<text class="upphoto" @click="godownPhoto(v.code)">下发照片</text>
				<text class="delicon" @click="delPhoto(v.code)">x</text>
			</view>
			<error-tip style="width: 100%;" v-if="!imgList.length"></error-tip>
		</view>
		<view class="uploader" @click="upload">
			<text>+</text>
		</view>
		<van-dialog id="van-dialog" />
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import ErrorTip from "../../components/error/error.vue";
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				imgList: []
			}
		},
		components: {
			"error-tip": ErrorTip,
		},
		onLoad() {
			// 获取人脸列表
			this.initFaceList()
		},
		methods: {
			initFaceList() {
				this.$api.faceApi.facelistReq({}).then(res => {
					console.log(res)
					this.imgList = res.data
				})
			},
			upload() {
				uni.navigateTo({
					url: "../smartdoor/upFace"
				})
			},
			delPhoto(code) {
				Dialog.confirm({
					title: '提示',
					message: '是否删除该照片？'
				}).then(() => {
					this.$api.faceApi.delphotoReq({
						code
					}).then(res => {
						if (res.code == 100000) {
							Toast.success('删除成功！');
							this.initFaceList()
						} else {
							Toast.fail(res.message);
						}
					})
				})
			},
			godownPhoto(code) {
				Dialog.confirm({
					title: '提示',
					message: '确定下发该张照片？'
				}).then(() => {
					this.$api.faceApi.repeatReq({
						code
					}).then(res => {
						if (res.code == 100000) {
							Toast.success('下发成功！');
						} else {
							Toast.fail(res.message);
						}
					})
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	#face_box {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background-color: #f2f2f2;
		font-size: 1rem;

		.content {
			width: 100%;
			margin: 0 auto;
			padding: 1% 0;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			text-align: center;

			.up_face {
				position: relative;
				width: 30%;
				background-color: #fff;
				margin: 20rpx 1.5% 20rpx;
				font-size: 12px;

				image {
					width: 100%;
					height: 9rem;
				}

				.name {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.status,
				.name {
					display: block;
					text-align: center;

					.passing {
						color: #409EFF;
					}

					.passed {
						color: #67C23A;
					}

					.nopass {
						color: #F56C6C;
					}
				}

				.upphoto {
					background-color: #07C160;
					display: block;
					color: #fff;
				}

				.delicon {
					position: absolute;
					right: -6px;
					top: -6px;
					display: block;
					color: #fff;
					background-color: #969799;
					height: 18px;
					width: 18px;
					border-radius: 50%;
				}
			}
		}

		.uploader {
			position: fixed;
			bottom: 1rem;
			right: 1rem;
			border: 1px solid #07c160;
			border-radius: 50%;
			height: 60px;
			width: 60px;
			text-align: center;
			line-height: 56px;
			z-index: 9;

			text {
				font-size: 34px;
				color: #07c160;
			}
		}
	}
</style>
