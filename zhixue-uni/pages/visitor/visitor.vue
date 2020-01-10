<template>
	<view class="visitor">
		<text>选择小区</text>
		<van-picker :columns="columns" @change="onChange" />
		<view class="button_box">
			<van-button type="primary" size="large" round @click="goNextbind">下一步</van-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{				
				columns: [],
				code:null,
				showFlag:1
			}
		},
		onReady() {
			// 加载小区
			this.$api.visitorApi.cmtyReq({}).then(res=>{
				this.columns = res.data.map((v,i)=>{
					return {text:v.communityName,code:v.code}
				})
				this.code = this.columns[0].code
			})
		},
		methods:{
			goNextbind(){				
				uni.navigateTo({
					url:"./scanQR"
				})				
			},
			onChange(e){
				console.log(e.detail)
				this.code = e.detail.value.code
			}
		}
	}
</script>

<style lang="scss" scoped>
	.visitor{
		& /deep/ .van-picker-column__item--selected{
			font-weight: 800 !important;
			color:#000 !important;
		}
		& /deep/ .van-picker-column__item{
			color:#888;
		}
		text-align: center;
		margin-top: 2rem;
		.button_box{
			padding:0 5%;
		}
		.pwd_bind{
			.scan_code{
				text-align: center;
			}
		}
	}
</style>
