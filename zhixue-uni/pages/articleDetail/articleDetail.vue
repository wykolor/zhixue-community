<template>
	<view class="article-detail">
		<view class="article-detail-title">{{articleDetail.title}}</view>
		<view class="article-detail-time">{{articleDetail.createTime}}</view>
		<rich-text :nodes="articleDetail.content" class="article-detail-content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleDetail:{}
			}
		},
		onLoad(option){
			const { id } = option;
			this.getDetail(id);
		},
		methods: {
			getDetail(id){
				this.$api.articleDetailApi.esArticleDetailReq({id}).then(res => {
					this.articleDetail = res.data;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.article-detail{
	width: 100%;
	min-height: 100vh;
	box-sizing: border-box;
	padding: 1rem;
	font-size: 0.9rem;
	.article-detail-title{
		text-indent: 2em;
		font-weight: bold;
	}
	.article-detail-time{
		text-align: right;
		font-size: 0.8rem;
		color: #ccc;
		line-height:2rem;
	}
	.article-detail-content{
		line-height: 1.4rem;
		text-indent: 2em;
	}
}
</style>
