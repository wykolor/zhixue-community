<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData(){
				this.$api.testApi.loginReq({}).then(res => {
					console.log("请求数据",res)
				}).catch(err=>{
					
				})
			}
		}
	}
</script>

<style lang="less">

</style>
