<template>
	<view class="info_box">
		<text class="iconfont iconchenggong"></text>
		<view>
			{{infoMes}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				infoMes:''
			}
		},
		onLoad() {
			this.$api.hsbindApi.infoMesReq({"keyWord":"membertxt"}).then(res=>{
				console.log(res.data.value)
				this.infoMes = res.data.value
			})
		}
	}
</script>

<style scoped lang="scss">
	text{
		font-size: 240rpx;
	}
	.info_box{
		text-align: center;
		padding:4rem 2rem;
	}
</style>
