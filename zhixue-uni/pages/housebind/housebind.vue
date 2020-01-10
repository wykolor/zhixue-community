<template>
	<view class="housbind">
		<van-picker 
		:columns="columns" 
		active-class="selected"
		@change="onChange"/>
		<view class="button_box">
			<van-button type="primary" size="large" round @click="goNextbind">下一步</van-button>
		</view>
		<view class="pwd_bind">
			<van-divider contentPosition="center">通过秘钥绑定</van-divider>
			<view @click="goBindPwd" class="pwd_icon">
				<text class="iconfont iconyuechi"></text>
			</view>
		</view>
	</view>
</template>

<script>
	// import Toast from '/wxcomponents/vant/toast/toast'
	export default{
		data(){
			return{				
				columns: [],
				code:null,
				imageURL:require('../../static/img/tabbar/home-active.png'),
				radio: '1'
			}
		},
		onReady() {
			let code = getApp().globalData.userInfo.wxUserEstateConfResp.currentEstate
			// 获取楼栋
			this.$api.hsbindApi.buildReq({
				"type":"building",
				"code":code
			}).then(res=>{
				this.columns = res.data.map((v,i)=>{
					return {"type":v.type,"text":v.name,"code":v.code}
				})
				this.code = this.columns[0].code
			})
		},
		methods:{
			goBindPwd(){
				uni.navigateTo({				 
					url: './pwdBind',//跳转的路径			 
				})
			},
			goNextbind(){
				uni.navigateTo({
					url: './detailBind?code='+this.code,//跳转的路径
								 
				})
			},
			onChange(event) {
				console.log(event.detail)
				this.code = event.detail.value.code
				/* const { picker, value, index } = event.detail;
				picker.setColumnValues(1, citys[value[0]]); */
			}
		}
	}
</script>

<style lang="scss" scoped>
	.housbind{
		& /deep/ .van-picker-column__item--selected{
			font-weight: 800 !important;
			color:#000 !important;
		}
		& /deep/ .van-picker-column__item{
			color:#888;
		}
		.button_box{
			padding:0 5%;
		}
		.pwd_bind{
			.pwd_icon{
				text-align: center;
				padding-top: 2%;
				text{
					font-size: 70rpx;
				}
			}
		}
	}
</style>
