<template>
	<view class="scan_QR">
		<camera v-show="img==''" :device-position="position" flash="off" style="margin:20px auto;width:500rpx; height:600rpx;">
		</camera>
		<image :src="img" v-show="img!=''"></image>
		<view class="button_box">
			<text class="iconfont iconfanzhuanshexiangtou" @click="reverse"></text>
			<text class="iconfont iconxiangji" @click="goTakePhoto"></text>
			<text class="rephoto" @click="reTakePhoto">重拍</text>
		</view>
		<view style="padding: 10%;">
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
						Toast.fail("人脸识别失败，失败原因:"+res.message)				
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
								this.base64 = 'data:image/jpeg;base64,'+res.data
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
			},
			reverse(){
				if(this.position == 'front'){
					this.position = 'back'
				}else{
					this.position = 'front'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scan_QR {
		width: 100%;
		text-align: center;
		image{
			width:500rpx;
			height:600rpx;
			margin-top:20px;
			margin-bottom: -4px;
		}
		.button_box{
			padding:0 10%;
			margin-top: 30px;
			display: flex;
			justify-content: space-around;
			text{
				font-size: 40px;
				display: inline-block;
			}
			.rephoto{
				width: 40px;
				height:40px;
				line-height: 40px;
				border-radius: 50%;
				background-color: rgb(242, 130, 106);
				color: #fff;
				font-size:14px;
			}
		}
	}
</style>
