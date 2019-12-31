<template>
	<view class="indentify">
		<van-button type="primary" size="large" round @click="binduser">关联用户</van-button>
		<input type="text" value="" class="number" placeholder="请输入身份证号码" v-model="numberCode"/>
		<input type="text" value="" placeholder="请输入真实姓名" v-model="name"/>
		<view class="button_box">
			<van-button type="primary" size="large" round @click="goSubmit">提交注册</van-button>
		</view>
		<van-toast id="van-toast" />
		<van-popup v-model="show" position="bottom" :overlay="true">
			<van-picker :columns="columns" @change="onChange" />
		</van-popup>
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
				columns:[],
				show:false
			}
		},
		onLoad(option) {
			this.imgUrl = option.imgurl
			this.$api.hsbindApi.peopleTypeReq({}).then(res=>{
				console.log(res)
				this.columns = res.data.map((v,i)=>{
					return {"text":v.categrayName,"flagEndTime":v.flagEndTime,"value":v.value}
				})
			})
		},
		methods:{
			goSubmit(){
				this.$api.hsbindApi.addReq({
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
			},
			onChange(event){
				console.log(event.detail.value.flagEndTime)
			},
			binduser(){
				this.show = true
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
