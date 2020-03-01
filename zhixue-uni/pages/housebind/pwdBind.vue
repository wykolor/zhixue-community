<template>
	<view class="pwd_bind">
		<text>输入密钥</text>
		<view style="height:100px;margin-top: 20px;">
		    <validcode :maxlength="6" :isPwd="false" @finish="getCode"></validcode>
		</view>
		<van-button type="primary" size="large" round @click="goNext">下一步</van-button>
		<view class="warning">
			<text @click="showMore">
				{{warnMes}}
			</text>
			<text @click="gophone">{{mobile}}</text>			
		</view>		
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default{
		data(){
			return{
				isFocus:false,
				code: '',
				pwd:"",
				warnMes:'没有密钥？',
				mobile:''
			}
		},
		methods:{
			goNext(){
				console.log(this.pwdArr)
				this.$api.hsbindApi.roomcodeReq({
					"passwd":this.pwd
				}).then(res=>{
					if(res.code == 100000){
						uni.navigateTo({
							url:"successInfo?type=2"
						})
					}else{
						Toast.fail(res.message);
					}
				})
			},
			getCode(val) {
				console.log(val);
				this.pwd = val
			},
			showMore(){
				this.warnMes = "请联系物业处电话："
				this.mobile = getApp().globalData.communityInfo.mobile
			},
			gophone(){
				uni.makePhoneCall({
				    phoneNumber:this.mobile
				});
			}
		}
	}
</script>

<style lang="scss">
	.pwd_bind{
		padding:20% 5% 0;
		text-align: center;
		.pwd_inpt{
			display: flex;
			justify-content: space-around;
			margin:2rem 0;
			input{
				width:3rem;
				height: 3rem;
				line-height: 3rem;
				border-radius: 50%;
				border: 1px solid #ddd;
			}
		}
		.warning{
			margin-top:600rpx;
			display: block;
		}
	}
	.code-input-input {
		height:250rpx;
		position: absolute;
		width: 100%;
		outline: none;
		color: transparent;
		text-shadow: 0 0 0 transparent;
		top: 150rpx;
	}
</style>
