<template>
	<view class="indentify">
		<input type="text" value="" class="number" placeholder="请输入身份证号码" v-model="numberCode"/>
		<input type="text" value="" placeholder="请输入真实姓名" v-model="name"/>
		<textarea value="" placeholder="请输入理由" v-model="reason"/>
		<view class="button_box">
			<van-button type="primary" size="large" round @click="goSubmit">提交</van-button>
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
				imgUrl:null
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
					"reason":this.reason
				}).then(res=>{
					if(res.code == 100000){
						// 成功
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
			text-indent:34rpx;
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
			text-indent:34rpx;
			border-radius:10rpx;
		}
		.button_box{
			width: 80%;
			margin: 0 auto;
		}
	}
</style>
