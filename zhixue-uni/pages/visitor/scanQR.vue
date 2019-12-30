<template>
	<view class="scan_QR">
		<!-- 上传人脸 -->
		<view class="scanbox" @click="upload">
			<!-- 人头 -->
			<image :src="img" mode=""></image>
		</view>
		<text>点击上传人像</text>
		<view class="button_box">
			<van-button type="primary" size="large" round @click="goNextbind">下一步</van-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				img:"",
				base64:""
			}
		},
		methods:{
			upload(){
				uni.chooseImage({
					count: 1,
					sourceType:['camera'],
					success: (res) => {
						console.log(res)
						this.img = res.tempFilePaths[0]
						this.urlTobase64(res.tempFilePaths[0])
					}
				})
			},
			urlTobase64(url){
				uni.request({
					url: url,
					method:'GET',
					responseType: 'arraybuffer',
					success: ress => {
						let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
						this.base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
						
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
