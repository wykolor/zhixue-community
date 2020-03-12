<template>
	<view class="upface">
		<camera v-show="img=='' && isband" :device-position="position" flash="off">
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
				passObj:{rodeg:0},
				position:'front',
				isband:false
			}
		},
		onShow() {
			Toast.loading({
			  message: '加载中',
			  duration:2000
			});
			this.$api.hsbindApi.isBIndReq({}).then(res=>{
				if(res.data.flag === false){
					Dialog.confirm({
					  title: '请先绑定房产',
					  confirmButtonText:"去绑定",
					  message: '检测到您还未绑定房产，进行房产绑定后才能使用此功能哦~'
					}).then(() => {
						this.$api.hsbindApi.bindWayReq({}).then(res=>{
							if(res.code==100000){
								uni.navigateTo({
									url:res.data.value,//跳转的路径			 
								})
							}else{
								Toast.fail(res.message)
							}				
						})
					}).catch(() => {
						//不进行绑定
						uni.navigateBack({
							delta:1
						});
					});
				}else{
					this.isband = true
				}
			})
			
		},
		methods:{
			goNextbind(){
				console.log(this.base64)
				this.$api.visitorApi.userIndentyReq(this.passObj).then(res=>{
					console.log(res)
					if (res.code == 100000) {
						Toast.success("识别成功！")
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
					quality:'high',
					success:(res)=>{
						this.img = res.tempImagePath
						this.passObj.fileName = res.tempImagePath.substring(7,)
						wx.getFileSystemManager().readFile({
							filePath:res.tempImagePath,
							encoding:"base64",
							success:res=>{
								console.log(res)
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
	.upface{
		width: 100%;
		text-align: center;
		image{
			width:500rpx;
			height:600rpx;
			margin-top:20px;
			margin-bottom: -4px;
		}
		camera{
			margin:20px auto;
			width:500rpx; 
			height:600rpx;
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
