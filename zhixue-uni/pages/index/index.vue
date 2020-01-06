<template>
  <view class="home">
    <!-- 头部 -->
    <van-nav-bar title="智旭" :border="false" fixed>
      <view class="nav-left" slot="left">
        <text class="iconfont iconweizhi1"></text>
        <text class="address">{{communityName}}</text>
      </view>
      <text class="nav-right iconfont iconzuji" slot="right" @click="goVisitor"></text>
    </van-nav-bar>
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
        <image :src="serverList[0].image" @click="goSecond(serverList[0])"></image>
      </view>
      <view class="home-server-list">
        <image :src="serverList[1].image" @click="goSecond(serverList[1])"></image>
        <image :src="serverList[2].image" @click="goSecond(serverList[2])"></image>
      </view>
    </view>
    <!-- app模块 -->
    <view class="home-app-list">
      <van-grid :column-num="5" :border="false" :clickable="true">
        <template v-for="item in appList">
          <!-- 内部跳转 -->
          <van-grid-item
            :icon="item.image"
            :text="item.appName"
            :key="item.id"
			@click="goSecond(item)"
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
          <navigator
            :url="'/pages/articleDetail/articleDetail?id=' + article.id"
            class="article-list"
            v-for="article in categray.list"
            :key="article.id"
          >
            <view class="art-list-img">
              <image :src="article.image"></image>
            </view>
            <view class="art-list-info">
              <view class="art-info-title">{{ article.title }}</view>
              <view class="art-info-time">{{ article.createTime }}</view>
              <rich-text
                :nodes="article.subTitle"
                class="art-info-content van-multi-ellipsis--l2"
              ></rich-text>
            </view>
          </navigator>
        </van-tab>
      </van-tabs>
    </view>
  </view>
</template>

<script>
import uniLogin from "../../utils/login.js";
import { _goSecond } from "../../utils/base.js";
export default {
	data() {
		return {
			artActive: 0,
			webviewStyles: {
				progress: {
					color: "#FF3333"
				}
			},
			communityName:"", // 小区地址
			appList: [], // app列表
			bannerList: [], // 轮播图列表
			serverList: [], // 服务列表
			articleList: [] // 文章列表
		};
	},
	onLoad() {
		this.getBack();
	},
	onShow(){
		// this.getBack();
		this.getBannerList();
		this.getAppList();
		this.getImageList();
		this.getArticleList();
		this.getnotReadNum();
		this.getCommunity();
	},
	methods: {
		// 获得轮播图
		getBannerList() {
		  this.$api.indexApi.esBannerReq().then(res => {
			this.bannerList = res.data;
		  });
		},
		// 获得app模块
		getAppList() {
		  this.$api.indexApi.esAppIndexReq().then(res => {
			this.appList = res.data;
		  });
		},
		// 中间图片模块
		getImageList() {
		  this.$api.indexApi.esAppMiddleReq().then(res => {
			this.serverList = res.data;
		  });
		},
		// 文章模块
		getArticleList() {
		  this.$api.indexApi.esArticleReq().then(res => {
			this.articleList = res.data;
		  });
		},
		// 去文章详情
		goArticleDetail(e) {
		  const { id } = e.currentTarget;
		  uni.navigateTo({
			url: "/pages/articleDetail/articleDetail?id=" + id
		  });
		},
		// 获取未读数据
		getnotReadNum() {
		  this.$api.newApi.notReadNumReq().then(res => {
			getApp().globalData.notReadNum = res.data;
			if (!getApp().globalData.notReadNum) {
			  uni.removeTabBarBadge({
				index: 2
			  });
			} else {
			  uni.setTabBarBadge({
				index: 2,
				text: String(getApp().globalData.notReadNum)
			  });
			}
		  });
		},
		// 获取小区信息
			
		getCommunity() {
			console.log(getApp())
			// let esCode = getApp().globalData.userInfo.wxUserEstateConfResp.currentEstate;
			this.$api.switchVillageApi.communityDetailReq({esCode:getApp().globalData.userInfo.wxUserEstateConfResp.currentEstate}).then(res => {
				if (res.code === 100000) {
					getApp().globalData.communityInfo = res.data;
					this.communityName = getApp().globalData.communityInfo.communityName;
				}
			});
		},
		// 进入二级界面
		goSecond(item){
			_goSecond(item);
		},
		getBack(){
			this.$api.indexApi.rollBackUserInfoReq({openId:getApp().globalData.openId}).then(res=>{
				
			})
		},
		goVisitor(){
			uni.navigateTo({
				url:"../visitor/visitor"
			})
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../wxcomponents/vant/common/index.wxss";
.home {
  width: 100%;
  min-height: 100vh;
  background-color: $uni-bg-color-page;
  padding-top: 2.7rem;
  padding-bottom: 1rem;
  & /deep/ .van-nav-bar {
    color: #fff;
    background-color: $zx-topic-color;
    padding: 0 !important;
    .van-nav-bar__title {
      color: #fff;
    }
    .nav-left {
      .address {
        margin-left: 5px;
      }
    }
    .nav-right {
      font-size: 20px;
    }
  }
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
  .home-app-list {
    background-color: #fff;
  }
  .home-article {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 20rpx 20rpx;
    margin-top: 5px;
    & /deep/ .van-tab__pane {
      padding: 0.8rem 0;
    }
    .article-list {
      display: flex;
      padding: 10rpx;
      height: 6rem;
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
        // .art-info-time {
        // }
        .art-info-content {
          line-height: 1.2rem;
        }
      }
    }
  }
}
</style>
