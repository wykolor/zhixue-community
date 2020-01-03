<template>
	<view class="scan_QR">
		<!-- 上传人脸 -->
		<view class="scanbox" @click="upload">
			<text v-show="img==null">+</text>
			<!-- 人头 -->
			<image :src="img" mode=""></image>
		</view>
		<text>点击上传人像</text>
		<view class="button_box">
			<van-button type="primary" size="large" round @click="goNextbind" :disabled="img==null">下一步</van-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				img:null,
				base64:""
			}
		},
		methods:{
			upload(){
				uni.chooseImage({
					count: 1,
					sourceType:['camera'],
					success: (res) => {
						console.log(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))
						this.img = res.tempFilePaths[0]
						this.base64 = 'data:image/jpeg;base64,'+wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64")
					}
				})
			},
			goNextbind(){
				uni.navigateTo({
					url:"./indentify?imgurl="+this.base64
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scan_QR{
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
