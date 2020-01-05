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
		onLoad(option) {
			let keyWord = "membertxt"
			if(option.type==0){
				keyWord = "visitorMptxt"
			}
			this.$api.hsbindApi.infoMesReq({"keyWord":keyWord}).then(res=>{
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
