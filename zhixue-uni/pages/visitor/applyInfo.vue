<template>
	<view>
		<van-panel title="申请提示" :desc="infoMes" :status="time">
		</van-panel>
		<view class="callphone">
			<text class="iconfont iconhandoright"></text><text @click="gophone">拨打电话:{{phone}}</text>
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
				infoMes:null,
				time:new Date().toLocaleString(),
				phone:null
			}
		},
		onLoad(option) {
			this.phone = option.phone
			this.$api.hsbindApi.infoMesReq({"keyWord":'visitorMptxt'}).then(res=>{
				console.log(res.data.value)
				this.infoMes = res.data.value
			})
		},
		methods:{
			gophone(){
				uni.makePhoneCall({
					phoneNumber:this.phone,
					success() {
					},
					fail() {
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.callphone{
		position: fixed;
		bottom:2.5rem;
		left: 1rem;
	}
</style>
