<template>
	<view class="home">
		<view class="home-banner">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500" indicator-active-color="pink" indicator-color="#fff">
				<swiper-item v-for="item in banerImage" :key="item.id">
					<image :src="item.image"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="home-server">
			<view>
				<image :src="homeServer[0].image"></image>
			</view>
			<view>
				<image :src="homeServer[1].image" ></image>
				<image :src="homeServer[2].image" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banerImage:[
					{
						"image": require("../../static/img/index/u118.jpg")
					},
					{
						"image": require("../../static/img/index/u118.jpg")
					},
					{
						"image": require("../../static/img/index/u118.jpg")
					}
				],
				homeServer:[
					{
						"image": require("../../static/img/index/u129.png")
					},
					{
						"image": require("../../static/img/index/u130.png")
					},
					{
						"image": require("../../static/img/index/u131.png")
					},
				]
			};
		}
	}
</script>

<style lang="scss">

.home-server{
	width: 100%;
	box-sizing: border-box;
	display: flex;
}
</style>
