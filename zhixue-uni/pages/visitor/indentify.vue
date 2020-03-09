<template>
	<view class="indentify">
		<input type="text" value="" class="number" placeholder="请输入身份证号码" v-model="numberCode"/>
		<input type="text" value="" placeholder="请输入真实姓名" v-model="name"/>
		<input type="text" value="" placeholder="请输入业主电话" v-model="phone"/>
		<textarea value="" placeholder="请输入理由,15字数以内" v-model="reason" maxlength="15"/>
		<view class="button_box">
			<van-button type="primary" size="large" round @click="goSubmit" :disabled="numberCode==null">提交</van-button>
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default{
		data(){
			return{
				name:"",
				reason:"",
				numberCode:null,
				imgUrl:null,
				phone:null
			}
		},
		onLoad(option) {
			this.imgUrl = option.imgurl
		},
		methods:{
			goSubmit(){
				this.$api.visitorApi.indentyReq({
					"identity":this.numberCode,
					"image":this.imgUrl,
					"memberName":this.name,
					"reason":this.reason,
					"esCode":getApp().globalData.userInfo.wxUserEstateConfResp.currentEstate,
					"esMobile":this.phone
				}).then(res=>{
					if(res.code == 100000){
						// 成功
						uni.navigateTo({
							url:"../housebind/successInfo?type=0"  //0为访客
						})
					}else{
						Toast.fail(res.message);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.indentify{
		width: 100%;
		input{
			width:80%;
			margin: 0 auto;
			border: 1px solid #ddd;
			height: 100rpx;
			line-height:100rpx;
			outline: none;
			padding-left:34rpx;
			border-radius:50rpx;
			margin-bottom:30rpx;
		}
		input.number{
			margin-top:150rpx;
		}
		textarea{
			width:80%;
			margin: 0 auto;
			height:300rpx;
			margin-bottom:50rpx;
			border: 1px solid #ddd;
			padding-left:34rpx;
			border-radius:10rpx;
		}
		.button_box{
			width: 80%;
			margin: 0 auto;
		}
	}
</style>
