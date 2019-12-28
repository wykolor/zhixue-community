<template>
	<view class="">
		<text>达令港介绍</text>
		<text>2018.1.1</text>
		<view class="">
			<!-- 内容 -->
			<!-- 图片 -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				info:""
			}
		},
		onReady(){
			this.$api.wyintroApi.wyintroReq({}).then(res=>{
				console.log(res)
			})
		}
	}
</script>

<style lang="scss">
	text{
		display: block;
		text-align: center;
	}
</style>
