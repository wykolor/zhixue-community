<template>
	<view class="upface">
		<camera device-position="back" flash="off" style="margin-left: 50rpx;width:400rpx; height:500rpx;">
		</camera>
		<!-- 上传人脸 -->
		<view class="scanbox" @click="upload">
			<!-- 人头 -->
			<text v-show="img==''">+</text>
			<image :src="img" mode=""></image>
		</view>
		<text>点击上传人像</text>
		<view class="button_box">
			<!-- <van-button type="primary" size="large" round @click="goNextbind">下一步</van-button> -->
			<van-button type="primary" size="large" round @click="goTakePhoto">拍照</van-button>
		</view>
		<van-dialog id="van-dialog" />
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default{
		data(){
			return{
				img:"",
				base64:"",
				passObj:{rodeg:0}
			}
		},
		onShow() {
			this.$api.hsbindApi.isBIndReq({}).then(res=>{
				if(res.data.flag === false){
					Dialog.confirm({
					  title: '请先绑定房产',
					  confirmButtonText:"去绑定",
					  message: '检测到您还未绑定房产，进行房产绑定后才能使用此功能哦~'
					}).then(() => {
					  // 跳转进行绑定
					  uni.navigateTo({
					  	url:"../housebind/housebind"
					  })
					}).catch(() => {
						//不进行绑定
						uni.navigateBack({
							delta:1
						});
					});
				}
			})
			
		},
		methods:{
			upload(){
				Toast.loading({
				  message: '上传中...',
				  duration:10000
				});
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					sizeType:'compressed',
					success: (res) => {
						this.passObj.fileName = res.tempFilePaths[0].substring(7,)
						console.log(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))
						this.img = res.tempFilePaths[0]
						wx.getFileSystemManager().readFile({
							filePath:res.tempFilePaths[0],
							encoding:"base64",
							success:res=>{
								this.base64 = 'data:image/jpeg;base64,'+res
								this.passObj.baseStr = this.base64
								Toast.clear()
							}
						 })
					},
					fail:(res)=>{
						console.log("选取失败！")
					}
				})
			},
			goNextbind(){
				this.$api.visitorApi.userIndentyReq(this.passObj).then(res=>{
					console.log(res)
					if (res.code == 100000) {
						Toast.success("人脸识别成功")
						setTimeout(() => {
							// 进行校验
							uni.navigateTo({
								url:"./indentify?imgurl="+res.data.image
							})
						}, 1000)
					} else {
						Toast.fail(res.message)				
					}
				})
			},
			goTakePhoto(){
				uni.createCameraContext().takePhoto({
					success:(res)=>{
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upface{
		width: 100%;
		text-align: center;
		.scanbox{
			width:300rpx;
			height:300rpx;
			border: 1px dashed #ddd;
			border-radius:10rpx;
			margin: 100rpx auto 2rem;
			line-height: 290rpx;
			text-align: center;
			text{
				font-size:140rpx;
				color:#ddd;
			}
			image{
				width:300rpx;
				height:300rpx;
				border-radius:10rpx;
			}				
		}
		.button_box{
			padding:20% 10%;
		}
	}
</style>
