<template>
	<web-view :src="outUrl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				outUrl:""
			}
		},
		methods: {
			
		},
		onLoad(query){
			console.log("页面传参",query)
			this.outUrl = query.outUrl;
		},
		onShow() {
			console.log(this.outUrl)
		}
	}
</script>

<style>

</style>
