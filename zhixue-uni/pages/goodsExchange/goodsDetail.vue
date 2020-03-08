<template>
	<view class="goods-detail">
		<view class="intro">
			<img :src="goodsInfo.image" alt="">
			<text>商品简介：{{goodsInfo.info}}</text>
		</view>
		<view class="goods-detail-price"><text>{{goodsInfo.costCoin}}</text> 熊猫币</view>
		<!-- 按钮 -->
		<view class="button">
			<van-button type="primary" block round @click="goExchange">兑换商品</van-button>
		</view>
		<van-dialog id="van-dialog" />
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				goodsInfo: null,
				productCode: null
			}
		},
		onLoad(option) {
			this.productCode = option.productCode
			this.$api.goodsExgApi.goodsDeatilReq({
				'productCode': option.productCode
			}).then(res => {
				this.goodsInfo = res.data
			})
		},
		methods: {
			goExchange() {
				Dialog.confirm({
					title: '兑换商品',
					message: '确定要兑换该商品吗？'
				}).then(() => {
					this.$api.goodsExgApi.goodconsumeReq({
						'productCode': this.productCode
					}).then(res => {
						if(res.code == 100000){
							Toast.success(res.message)
							uni.redirectTo({
								url:"/pages/wallet/wallet"
							})
						}else{
							Toast.fail(res.message)
						}
					})
				}).catch(() => {
					Toast('取消兑换');
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-detail{
		.intro {
			background-color: #fff;
			border-radius: 6px;
			box-shadow: 0 8px 12px #ebedf0;
			padding: 24px;
			width: 70%;
			min-height: 200px;
			margin: 60px auto 20px;
			img {
				width: 80%;
				height: 180px;
				display: block;
				margin: 0 auto;
			}
			text {
				display: block;
				line-height: 24px;
			}
		}
		.goods-detail-price{
			text-align: right;
			padding: 0.8rem;
			font-size: 0.9rem;
			text{
				color: red;
			}
		}
		.button {
			width: 70%;
			margin: 0 auto;
		}
	}
</style>
