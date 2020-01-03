<template>
	<view class="news">
		<van-tabs :active="active" :sticky="true" :animated="true" :swipeable="true" :line-width="15" :z-index="99" color="#07c160" @change="changeHandle">
			<van-tab :title="item.title" v-for="item in allList" :key="item.title" :name="item.title" >
				<van-cell-group :border="false">
					<navigator :url="'/pages/newsDetail/newsDetail?messageCode='+value.code"  v-for="value in item.list" :key="value.id">
						<van-cell custom-class="news-cell" :title="value.title" :label="value.content">
							<view class="new-value">
								<text>{{value.createTime}}</text>
								<text class="news-is-read" v-if="value.readType=='esMessageNotRead'">1</text>
							</view>
							<van-icon slot="icon" :name="item.icon" color="#07c160" size="1.4rem" custom-style="margin-right:5px;" />
						</van-cell>
					</navigator>
				</van-cell-group >
				<van-cell-group :border="false" v-if="item.finised"><van-divider content-position="center" custom-style="width:70%;margin:20px auto">没有更多了~</van-divider></van-cell-group>
			</van-tab>
		</van-tabs>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:"消息",
				allList:[
					{
						title:"消息",
						icon:"chat",
						finised:false,
						list:[]
						
					},
					{
						title:"通知",
						icon:"bell",
						finised:false,
						list:[]
						
					}
				],
				newsInfo:{
					currentPage:1,
					keyWord:"",
					totalPages:Number
				},
				noticeInfo:{
					currentPage:1,
					keyWord:"",
					totalPages:Number
				},
				newsList:[],
				noticeList:[]
			};
		},
		onShow() {
			this.getNewsList();
			this.getNoticeList();
			this.getnotReadNum();
		},
		// 下拉刷新
		onPullDownRefresh(){
			switch (this.active){
				case "消息":
					this.newsInfo.currentPage = 1;
					this.newsInfo.totalPages = Number;
					this.allList[0].finised = false;
					this.getNewsList();
					break;
				case "通知":
					this.noticeInfo.currentPage = 1;
					this.noticeInfo.totalPages = Number;
					this.allList[1].finised = false;
					this.getNoticeList();
					break;
			}
		},
		// 上拉加载
		onReachBottom(){
			switch (this.active){
				case "消息":
					this.newsInfo.currentPage ++;
					this.getNewsList();
					break;
				case "通知":
					this.noticeInfo.currentPage ++;
					this.getNoticeList();
					break;
			}
		},
		methods:{
			// 获取未读数据
			getnotReadNum(){
				this.$api.newApi.notReadNumReq().then(res => {
					getApp().globalData.notReadNum = res.data;
					if(!getApp().globalData.notReadNum){
						uni.removeTabBarBadge({
							index:2
						})
					}else{
						uni.setTabBarBadge({
							index:2,
							text:String(getApp().globalData.notReadNum),
						})
					}
				})
			},
			// 滑动切换
			changeHandle(event){
				this.active = event.detail.name;
			},
			// 获取消息列表
			getNewsList(){
				// 如果当前页码大于总页数
				if(this.newsInfo.currentPage > this.newsInfo.totalPages){
					this.allList[0].finised = true;
					return false;
				}
				this.$api.newApi.messageListReq({
					keyWord:this.newsInfo.keyWord,
					page:this.newsInfo.currentPage,
					size:10
				}).then(res => {
					// 停止下拉刷新
					uni.stopPullDownRefresh();
					// 获取总页数
					this.newsInfo.totalPages = res.paginationData.totalPages;
					if(this.newsInfo.currentPage === 1){
						this.newsList = res.listData;
					}else{
						this.newsList = this.newsList.concat(res.listData)
					}
					this.allList[0].list = this.newsList;
				})
			},
			// 获取通知列表
			getNoticeList(){
				// 如果当前页码大于总页数
				if(this.noticeInfo.currentPage > this.noticeInfo.totalPages){
					this.allList[1].finised = true;
					return false;
				}
				this.$api.newApi.noticeListReq({
					keyWord:this.noticeInfo.keyWord,
					page:this.noticeInfo.currentPage,
					size:10
				}).then(res => {
					// 停止下拉刷新
					uni.stopPullDownRefresh();
					if(res.code === 100000){
					}
					// 获取总页数
					this.noticeInfo.totalPages = res.paginationData.totalPages;
					if(this.noticeInfo.currentPage === 1){
						this.noticeList = res.listData;
					}else{
						this.noticeList = this.noticeList.concat(res.listData)
					}
					this.allList[1].list = this.noticeList;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
$length:16px;
.news{
	@include init-style;
	.news-cell{
		position: relative;
		.new-value{
			font-size: 26rpx;
			.news-is-read{
				width:$length;
				height: $length;
				line-height: $length;
				position: absolute;
				bottom: 6px;
				right: 18px;
				display: block;
				background-color: red;
				text-align: center;
				font-size: 12px;
				border-radius: 50%;
				color: #fff;
			}
		}
	}
}
</style>
