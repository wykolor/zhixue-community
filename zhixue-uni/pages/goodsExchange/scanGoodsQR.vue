<template>
	<view>
		<view class="scanbox">
			<view class="scanicon" @click="goScan">
				<text class="iconfont iconsaoma-" style="font-size:136px;"></text>
			</view>
			<text>点击扫码，兑换商品</text>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			goScan(){
				uni.scanCode({
					onlyFromCamera:true,
					success: (res) => {
						console.log(res)
						// 跳转进入商品详情页面
						uni.navigateTo({
							url:'./goodsDetail?productCode='+res.result
						})
					},
					fail: (res) => {
						console.log('扫码失败')
						Toast('扫码失败');
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view{
		.scanbox{
			width: 600rpx;
			height: 600rpx;
			margin: 200rpx auto 0;
			text-align: center;
			.scanicon{
				width:50%;
				height:50%;
				margin: 0 auto;
				border:1px dashed #ccc;
				margin-bottom: 20px;
				border-radius: 6px;
			}
		}
	}
</style>
