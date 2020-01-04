<template>
	<view class="error-tips">
		<img src="./error.png" class="error-img" width="100%"/>
	</view>
</template>

<script>
	export default {
		name:"error-tip"
	}
</script>

<style lang="scss" scoped>
.error-tips{
	width: 100%;
	margin-top: 5%;
	box-sizing: border-box;
	text-align: center;
	img{
		width: 200px;
		height: 150px;
	}
}
</style>
