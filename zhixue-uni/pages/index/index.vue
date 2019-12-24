<template>
  <view class="home">
    <!-- 轮播图 -->
    <view class="home-banner">
      <swiper
        class="swiper"
        :indicator-dots="true"
        :autoplay="true"
        :interval="2000"
        :duration="500"
        indicator-active-color="pink"
        indicator-color="#fff"
      >
        <swiper-item v-for="item in bannerList" :key="item.id">
          <image :src="item.image" style="width: 100%;height: 100%;"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 服务 -->
    <view class="home-server">
      <view class="home-server-list">
        <image :src="serverList[0].image"></image>
      </view>
      <view class="home-server-list">
        <image :src="serverList[1].image"></image>
        <image :src="serverList[2].image"></image>
      </view>
    </view>
    <!-- app模块 -->
    <view class="home-app-list">
      <van-grid :column-num="5" :border="false" :clickable="true">
        <template v-for="item in appList">
          <!-- 内部跳转 -->
          <van-grid-item
            :icon="item.image"
            link-tab="redirectTo"
            :text="item.appName"
            :url="item.pageUrl"
            :key="item.id"
            v-if="item.sinkType == 'page'"
          />
          <!-- 外部跳转 -->
          <van-grid-item
            :icon="item.image"
            link-tab="redirectTo"
            :text="item.appName"
            :url="outUrl + item.pageUrl"
            :key="item.id"
            v-if="item.sinkType == 'html'"
          />
          <!-- 空字符串 -->
          <van-grid-item
            @click="tips"
            :icon="item.image"
            link-tab="switchTab"
            :text="item.appName"
            :key="item.id"
            v-if="item.type == 'no'"
          />
        </template>
      </van-grid>
    </view>
    <!-- 文章模块 -->
    <view class="home-article">
      <van-tabs
        :active="artActive"
        :border="false"
        swipeable
        animated
        color="#07c160"
        :line-width="20"
      >
        <van-tab
          :title="categray.categrayName"
          v-for="categray in articleList"
          :key="categray.id"
        >
          <!-- <view
            class="article-list"
            v-for="article in categray.list"
            :key="article.id"
          > -->
		  <navigator :url="'/pages/articleDetail/articleDetail?id=' + article.id" class="article-list"
            v-for="article in categray.list"
            :key="article.id">
            <view class="art-list-img">
              <image :src="article.image"></image>
            </view>
            <view class="art-list-info">
              <view class="art-info-title">{{ article.title }}</view>
              <view class="art-info-time">{{ article.createTime }}</view>
			  <rich-text :nodes="article.content" class="art-info-content van-multi-ellipsis--l2"></rich-text>
              <!-- <view class="art-info-content van-multi-ellipsis--l2" v-html="article.content"></view> -->
            </view>
			</navigator>
          <!-- </view> -->
        </van-tab>
      </van-tabs>
    </view>
  </view>
</template>

<script>
import uniLofin from "../../utils/login.js"
export default {
	data() {
		return {
			artActive:0,
			outUrl:"/pages/outUrl/outUrl?outUrl=",
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			},
			appList:[
				// {
				// 	appName:"物业服务",
				// 	image: "",
				// 	pageUrl: "",
				// 	type: 0
				// },
				// {
				// 	appName:"人脸管理",
				// 	image: "",
				// 	pageUrl: "/pages/test/index",
				// 	type: 1
				// },
				// {
				// 	appName:"切换百度",
				// 	image: "",
				// 	pageUrl: "https://www.baidu.com",
				// 	type: 2
				// },
				// {
				// 	appName:"房产绑定",
				// 	image: "",
				// 	pageUrl: "",
				// 	type: 0
				// },
				// {
				// 	appName:"家政服务",
				// 	image: "",
				// 	pageUrl: "",
				// 	type: 0
				// },
				// {
				// 	appName:"意见建议",
				// 	image: "",
				// 	pageUrl: "",
				// 	type: 0
				// },
				// {
				// 	appName:"跳蚤市场",
				// 	image: "",
				// 	pageUrl: "",
				// 	type: 0
				// },
				// {
				// 	appName:"跑腿小哥",
				// 	image: "",
				// 	pageUrl: "",
				// 	type: 0
				// },
				// {
				// 	appName:"小区超市",
				// 	image: "",
				// 	pageUrl: "",
				// 	type: 0
				// },
				// {
				// 	appName:"周边商家",
				// 	image: "",
				// 	pageUrl: "",
				// 	type: 0
				// }
			],
			bannerList:[
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
			serverList:[
				{
					"image": require("../../static/img/index/u62.jpg")
				},
				{
					"image": require("../../static/img/index/u62.jpg")
				},
				{
					"image": require("../../static/img/index/u62.jpg")
				},
			],
			articleList:[
					{
						categrayName:"公告",
						list:[
							{
								title:"通知！！某男子在办公司净做出",
								createTime:"15:02 AM",
								image:require('../../static/img/index/u62.jpg'),
								content:"承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。navigationStyle: custom 对 web-view 组件无效"
							},
							{
								title:"通知！！某男子在办公司净做出",
								createTime:"15:02 AM",
								image:require('../../static/img/index/u62.jpg'),
								content:"承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。navigationStyle: custom 对 web-view 组件无效"
							},
							{
								title:"通知！！某男子在办公司净做出",
								createTime:"15:02 AM",
								image:require('../../static/img/index/u62.jpg'),
								content:"承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。navigationStyle: custom 对 web-view 组件无效"
							},
							{
								title:"通知！！某男子在办公司净做出",
								createTime:"15:02 AM",
								image:require('../../static/img/index/u62.jpg'),
								content:"承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。navigationStyle: custom 对 web-view 组件无效"
							},
							{
								title:"通知！！某男子在办公司净做出",
								createTime:"15:02 AM",
								image:require('../../static/img/index/u62.jpg'),
								content:"承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。navigationStyle: custom 对 web-view 组件无效"
							},
						]
					},
					{
						categrayName:"热点",
						list:[
							{
								title:"热点！！某男子在",
								createTime:"15:02 AM",
								image:require('../../static/img/index/u62.jpg'),
								content:"承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。navigationStyle: custom 对 web-view 组件无效"
							},
							{
								title:"热点！！某男子在办公司净做出",
								createTime:"15:02 AM",
								image:require('../../static/img/index/u62.jpg'),
								content:"承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。navigationStyle: custom 对 web-view 组件无效"
							},
							{
								title:"热点！！某男子在办公司净做出",
								createTime:"15:02 AM",
								image:require('../../static/img/index/u62.jpg'),
								content:"承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。navigationStyle: custom 对 web-view 组件无效"
							},
							{
								title:"热点！！某男子在办公司净做出",
								createTime:"15:02 AM",
								image:require('../../static/img/index/u62.jpg'),
								content:"承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。navigationStyle: custom 对 web-view 组件无效"
							},
							{
								title:"热点！！某男子在办公司净做出",
								createTime:"15:02 AM",
								image:require('../../static/img/index/u62.jpg'),
								content:"承载网页的容器。会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。navigationStyle: custom 对 web-view 组件无效"
							},
						]
					}
			],
		}
	},
	onLoad(){
		uniLofin().then(()=>{
			this.getBannerList();
			this.getAppList();
			this.getServerList();
			this.getImageList();
			this.getArticleList();
		})
	},
	methods:{
		// 获得轮播图
		getBannerList(){
			this.$api.indexApi.esBannerReq().then(res => {
				this.bannerList = res.data;
			})
		},
		// 获得app模块
		getAppList(){
			this.$api.indexApi.esAppIndexReq().then(res => {
				this.appList = res.data;
			})
		},
		// 服务模块
		getServerList(){
			this.$api.indexApi.esAppServiceReq().then(res => {
				
			})
		},
		// 中间图片模块
		getImageList(){
			this.$api.indexApi.esAppMiddleReq().then(res => {
				
			})
		},
		// 文章模块
		getArticleList(){
			this.$api.indexApi.esArticleReq().then(res => {
				this.articleList = res.data;
			})
		},
		
	}
}
</script>

<style lang="scss">
@import "../../wxcomponents/vant/common/index.wxss";
.home {
  width: 100%;
  min-height: 100vh;
  background-color: $uni-bg-color-page;
  padding-bottom: 1rem;
  .home-server {
    width: 100%;
    height: 10rem;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    padding: 16rpx 20rpx;
    .home-server-list {
      flex: 1;
      box-sizing: border-box;
      image {
        width: 100%;
        height: 100%;
        border-radius: 5rpx;
      }
      &:last-child {
        display: flex;
        flex-direction: column;
        padding-left: 5rpx;
        image {
          height: 50%;
          &:last-child {
            margin-top: 3rpx;
          }
        }
      }
    }
  }
  .home-app-list{
	  background-color: #fff;
  }
	  
  .home-article {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 20rpx;
    margin-top: 5px;
    & /deep/ .van-tab__pane {
      padding: 0.8rem 0;
    }
    .article-list {
      display: flex;
      padding: 10rpx;
      align-items: stretch;
      & > view {
        box-sizing: border-box;
      }
      .art-list-img {
        width: 40%;
        padding-right: 20rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .art-list-info {
        width: 60%;
        font-size: 0.7rem;
        color: #aaa;
        letter-spacing: 1px;
        & > view {
          line-height: 2em;
        }
        .art-info-title {
          @include wy-ellipsis;
          font-size: 1rem;
          color: #333;
        }
        .art-info-time {
        }
        .art-info-content {
          line-height: 1.2rem;
        }
      }
    }
  }
}
</style>
