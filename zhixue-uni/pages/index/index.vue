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
        <swiper-item v-for="item in bannerList" :key="item.id" @click="goSwiperItem(item)">
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
	<!-- 钱包弹窗 -->
	<van-popup :show="showPopup"   custom-class="wallet-popup"  :close-on-click-overlay="false" custom-style="height: 80%;width: 80%;background:rgba(0,0,0,0)" overlay-style="background:rgba(0,0,0,.3)">
		<view class="wrapper-box">
			<view class="logo-info">
				<image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" style="width: 70px;height: 70px;border-radius: 50%;"></image>
				<image v-else src="/static/img/logo.png" style="width: 70px;height: 70px; border-radius: 50%;"></image>
			</view>
			<view class="wallet-info-unopen" v-if="!isOpen">
				<view>{{redNoOpenInfo.rewardInfo.title}}</view>
				<view>送给你一个红包</view>
				<view class="big">{{redNoOpenInfo.rewardInfo.coverTxt}}</view>
				<view class="open-text-box">
					<view class="open-text" @click="addByDayReward">開</view>
				</view>
			</view>
			<view class="wallet-info-open" v-else>
				<view class="wallet-detail-box">
					<view class="wallet-detail">
						<view class="">获取现金熊猫币(个)</view>
						<view class="">+{{redNoOpenInfo.coin}}个</view>
						<view class="" @click="checkWallet">查看钱包</view>
					</view>
				</view>
				<view class="wallet-footer">
					{{redNoOpenInfo.rewardInfo.openTxt}}
				</view>
			</view>
		</view>
		<view class="close-btn" @click="showPopup=false"><van-icon name="close" color="#666" size="2rem"/></view>
	</van-popup>
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
			redNoOpenInfo:{}, // 红包未开前的信息
			redOpenInfo:{},	  // 红包已开之后的信息
			communityName:"", // 小区地址
			appList: [], // app列表
			bannerList: [], // 轮播图列表
			serverList: [], // 服务列表
			articleList: [], // 文章列表
			showPopup:false, // 是否展示钱包弹窗
			isOpen:false, // 红包开否
			userInfo:null
		};
	},
	onLoad() {
		// this.$api.walletApi.deleteDayRewardReq();
	},
	onHide(){
		if(this.showPopup&&this.isOpen){
			this.showPopup = false;
			this.isOpen = false;
		}
	},
	onShow(){
		this.getBannerList();
		this.getAppList();
		this.getImageList();
		this.getArticleList();
		this.getnotReadNum();
		this.getCommunity();
		this.flagHaveDayReward();
		this.userInfo = getApp().globalData.userInfo || null;
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
		// 回滚用户信息
		getBack(){
			this.$api.indexApi.rollBackUserInfoReq({openId:getApp().globalData.openId}).then(res=>{
				
			})
		},
		// 去访客界面
		goVisitor(){
			uni.navigateTo({
				url:'../visitor/visitorInfoList'
			}) 

		},
		// 轮播图跳转
		goSwiperItem(item){
			switch (item.sinkType){
				case "page":
					uni.navigateTo({
						url:item.pageUrl
					})
					break;
				case "html":
					uni.navigateTo({
						url:`/pages/outUrl/outUrl?outUrl=${item.pageUrl}`
					})
					break;
				case "no":
				case "":
					break;
				default:
					break;
			}
		},
		// 判断红包是否打开
		flagHaveDayReward(){
			this.$api.walletApi.flagHaveDayRewardReq().then(res => {
				if(res.code===100004){
					// 没有红包
					this.showPopup = false;
				}else if(res.code === 100000){
					// 有红包
					this.showPopup = true;
					// 获取红包信息
					this.dayReward();
				}
			})
		},
		// 获取今日红包信息
		dayReward(){
			this.$api.walletApi.dayRewardReq().then(res => {
				if(res.code === 100000){
					this.redNoOpenInfo = res.data;
				}
			})
		},
		// 打开红包
		addByDayReward(){
			this.$api.walletApi.addByDayRewardReq({
				code:this.redNoOpenInfo.code
			}).then(res=>{
				if(res.code === 100000){
					this.isOpen = true;
					// 更新用户信息
					this.updateUseInfo();
				}
			})
		},
		// 更新用户信息
		updateUseInfo(){
			this.$api.authApi.updateUserInfoReq({
				openId:getApp().globalData.openId,
				...this.userInfo
			}).then(res => {
				// 
				this.$api.authApi.detailReq({ openId:getApp().globalData.openId }).then(res => {
					// 存入全局globalData
					if(res.code === 100000){
						getApp().globalData.userInfo = res.data;
					}
				})
			})
		},
		// 查看钱包
		checkWallet(){
			uni.navigateTo({
			    url: '/pages/wallet/wallet'
			});
			this.showPopup = false;
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
	& /deep/ .van-grid-item__text{
		font-size: 14px !important;
	}
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
        font-size: 0.8rem;
        color: #aaa;
        letter-spacing: 1px;
        & > view {
          line-height: 2em;
        }
        .art-info-title {
          @include wy-ellipsis;
          font-size: 1.2rem;
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
  & /deep/ .wallet-popup{
	box-sizing: border-box;
	text-align: center;
	color: #EBCD99;
	line-height: 1.5;
	.wrapper-box{
		background: #F15E51;
		height: 90%;
		border-radius: 1.2rem;
	}
	// 关闭按钮
	.close-btn{
		color: #ccc;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		margin: 0 auto;
		font-size: 1.2rem;
	}
	.van-popup__close-icon--top-right{
		color: rgba(0,0,0,.4);
	}
	// 红包未开样式
	.wallet-info-unopen{
		height: 60%;
		box-sizing: border-box;
		padding: 1rem 0 0;
		.big{
			font-size: 1.2rem;
			margin: 1.6rem 0;
			font-weight: bold;
			letter-spacing: 1px;
		}
		.open-text-box{
			position: relative;
			height: 4rem;
			border-bottom-left-radius: 60%;
			border-bottom-right-radius: 60%;
			box-shadow: 0 7px 3px #A21610;
			.open-text{
				display: inline-block;
				width:80px;
				height: 80px;
				border-radius: 50%;
				line-height: 80px;
				background: #F9D759;
				font-size: 2.4rem;
				color: #EF9A39;
				font-weight: bold;
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				bottom: -40px;
				box-shadow: 1px 6px 5px #931E04;
			}
		}
	}
	// 红包点开样式
	.wallet-info-open{
		color: #FAAF52;
		height: 50%;
		box-sizing: border-box;
		.wallet-detail-box{
			position: relative;
			height: 100%;
			.wallet-detail{
				background: #fff;
				padding: 1rem;
				width: 80%;
				border-radius: 10px;
				box-sizing: border-box;
				margin: 0 auto;
				height: 100%;
				&>view{
					margin-bottom: 2rem;
				}
			}
		}
		.wallet-footer{
			background: #F3482F;
			width: 100%;
			position: absolute;
			bottom: 50px;
			left: 0;
			height: 33%;
			box-sizing: border-box;
			padding-top: 30%;
			text-align: center;
			border-bottom-left-radius: 1.2rem;
			border-bottom-right-radius: 1.2rem;
		}
	}
  }
}
</style>
