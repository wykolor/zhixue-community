<template>
	<view class="pwd_bind">
		<text>输入密钥</text>
		<view class="pwd_inpt">
			<input type="tel" :value="iptValue.length>=index+1?pwdArr[index]:''" :key="i" class="input" v-for="(v,i) in 5" @input="inputchange"/>
		</view>
		<van-button type="primary" size="large" round @click="goNext">下一步</van-button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				pwdArr:["","","","",""],
				isFocus:false
			}
		},
		methods:{
			goNext(){
				console.log(this.pwdArr)
				this.$api.hsbindApi.roomcodeReq({
					"passwd":"12345" 
				}).then(res=>{
					console.log(res)
				})
			},
			inputchange(e){

				// this.$refs.input[this.index].focus()
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
</style>
