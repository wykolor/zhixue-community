<template>
	<view class="info_box">
		<text class="iconfont iconchenggong"></text>
		<view>
			{{infoMes}}
		</view>
		<view class="backhome" @click="goback">
			<van-icon name="wap-home-o" color="#07c160" size="36px"/>
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
			}else if(option.type==2){
				keyWord = "hourseBindtxt"
			}
			this.$api.hsbindApi.infoMesReq({"keyWord":keyWord}).then(res=>{
				console.log(res.data.value)
				this.infoMes = res.data.value
			})
		},
		methods:{
			goback(){
				console.log("跳转？")
				uni.navigateBack({
					delta:3
				})
			}
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
	.backhome{
		position: fixed;
		bottom:1rem;
		right: 1rem;
		border: 1px solid #07c160;
		background-color:#fff;
		border-radius:50%;
		height: 60px;
		width: 60px;
		text-align: center;
		line-height: 56px;
		z-index:9;
		/deep/ .van-icon{
			margin-top: 10px;
		}
	}
</style>
