<template>
	<view class="intro">
		<text>{{title}}</text>
		<text>最近更新日期：{{updateTime}}</text>
		<view class="content">
			<!-- 图片 -->
			<image :src="image"></image>
			<!-- 内容 -->
			<text v-html="content"></text>						
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				title:"",
				updateTime:null,
				image:"",
				content:null
			}
		},
		onReady(){
			this.$api.wyintroApi.wyintroReq({}).then(res=>{
				this.title = res.data.title
				this.updateTime = res.data.updateTime
				this.content = res.data.content
				this.image = res.data.image
			})
		}
	}
</script>

<style lang="scss" scoped>
	.intro{
		padding:2rem 10%;
		text-align: center;
		text{
			display: block;
			text-align: center;
			line-height: 2rem;
		}
		image{
			width: 80%;
		}
	}
	
</style>
