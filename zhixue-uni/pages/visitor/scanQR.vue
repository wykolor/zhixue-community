<template>
	<view class="scan_QR">
		<camera v-show="img==''" device-position="back" flash="off" style="margin:20px auto;width:400rpx; height:500rpx;">
		</camera>
		<image :src="img" v-show="img!=''"></image>
		<view class="button_box">
			<van-button type="primary" size="large" round @click="goTakePhoto" v-if="img==''">拍照</van-button>
			<van-button type="primary" size="large" round  @click="reTakePhoto" v-if="img!=''">重拍</van-button>
			<van-button type="primary" size="large" round @click="goNextbind" v-if="img!=''">下一步</van-button>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				img:'',
				base64: "",
				passObj:{rodeg:0}
			}
		},
		onShow(){
			Toast.loading({
			  message: '加载中',
			  duration:2000
			});
		},
		methods: {
			goNextbind() {
				this.$api.visitorApi.userIndentyReq(this.passObj).then(res=>{
					console.log(res)
					if (res.code == 100000) {
						Toast.success("人脸识别成功")
						setTimeout(() => {
							// 进行校验
							uni.navigateTo({
								url: "./indentify?imgurl=" + res.data.image
							})
						}, 1000)
					} else {
						Toast.fail("人脸识别失败，请重新上传！")				
					}
				})
				
			},
			goTakePhoto(){
				uni.createCameraContext().takePhoto({
					quality:'high',
					success:(res)=>{
						this.img = res.tempImagePath
						this.passObj.fileName = res.tempImagePath.substring(7,)
						wx.getFileSystemManager().readFile({
							filePath:res.tempImagePath,
							encoding:"base64",
							success:res=>{
								this.base64 = 'data:image/jpeg;base64,'+res
								this.passObj.baseStr = this.base64
							}
						 })
					},
					fail: () => {
						Toast.fail("拍摄失败！")
					}
				})
			},
			reTakePhoto(){
				this.img = ""
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scan_QR {
		width: 100%;
		text-align: center;
		image{
			width:400rpx;
			height:500rpx;
			margin-top:20px;
		}
		.button_box{
			padding:10% 10%;
			/deep/ .van-button{
				margin-bottom:20px;
			}
		}
	}
</style>
