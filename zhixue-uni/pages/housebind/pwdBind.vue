<template>
	<view class="pwd_bind">
		<text>输入密钥</text>
		<!-- <view class="pwd_inpt">
			<input class="input" maxlength="1" :value="code[0]"></input>
			<input class="input" maxlength="1" :value="code[1]"></input>
			<input class="input" maxlength="1" :value="code[2]"></input>
			<input class="input" maxlength="1" :value="code[3]"></input>
			<input class="input" maxlength="1" :value="code[4]"></input>
			<input class="input" maxlength="1" :value="code[5]"></input>
		</view> -->
		<!-- <input @input="inputEvent" class="code-input-input" v-model="code" maxlength="6" type="text" /> -->
		<view style="height:100px;margin-top: 20px;">
		    <validcode :maxlength="6" :isPwd="false" @finish="getCode"></validcode>
		</view>
		<van-button type="primary" size="large" round @click="goNext">下一步</van-button>
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
				pwd:""
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
