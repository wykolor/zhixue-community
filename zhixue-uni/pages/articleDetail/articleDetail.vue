<template>
	<view class="article-detail">
		<view class="article-image">
			<image :src="articleDetail.image" />
		</view>
		<view class="article-info">
			<view class="article-detail-title">{{articleDetail.title}}</view>
			<view class="article-detail-time">{{articleDetail.createTime}}</view>
			<rich-text :nodes="content" class="article-detail-content" :selectable="true"></rich-text>
			<view class="article-detail-footer">
				<!-- 浏览量 -->
				<view class="article-visit">
					<text class="iconfont iconyanjing icons"></text>
					<text class="count-text">{{articleDetail.visit}}</text>
				</view>
				<!-- 点赞量 -->
				<view class="article-thumbs">
					<text class="iconfont icondianzan icons" :class="{active:isThunbs}" @click="getThumbs"></text>
					<text class="count-text">{{articleDetail.thumbs}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleDetail:{},
				id:null,
				isThunbs:false,
				content:null
			}
		},
		onLoad(option){
			const { id="35" } = option ;
			this.id = id;
			this.getDetail()
		},
		methods: {
			// 获取文章详情
			getDetail(id){
				this.$api.articleDetailApi.esArticleDetailReq({id:this.id}).then(res => {
					this.articleDetail = res.data;
					const _CLASS = /<img class="/g;
					if(_CLASS.test(this.articleDetail.content)){
						//  有类名
						this.content = this.articleDetail.content.replace(_CLASS, '<img class="img-width ' )
					}else{
						// 没有类名
						this.content = this.articleDetail.content.replace(/<img/g, "<img class='img-width' " )
					}
				})
			},
			// 点赞
			getThumbs(){
				this.$api.articleDetailApi.esArticleThumbsReq({
					id:this.id
				}).then(res => {
					if(res.code === 100000){
						this.isThunbs = true;
						this.getDetail();
					}
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
	font-size: 0.9rem;
	padding-bottom: 1rem;
	.article-image{
		width: 100%;
		image{
			width: 100%;
		}
	}
	.article-info{
		padding: 0.6rem 1rem;
		.article-detail-title{
			text-indent: 2em;
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
			& /deep/ img{
				width: 100% !important;
			}
			& /deep/ .img-width{
				width: 100% !important;
				// max-height: 400px;
			}
		}
		.article-detail-footer{
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			align-items: center;
			.icons{
				color: #ccc;
				font-size: 20px;
				margin-right: 5px;
				&.active{
					color: $zx-topic-color;
				}
			}
		}
	}
	
}
</style>
