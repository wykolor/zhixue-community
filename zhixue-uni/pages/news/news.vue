<template>
	<view class="news">
		<van-tabs :active="active" sticky animated swipeable :line-width="15" :z-index="99" color="#07c160">
		  <van-tab :title="item.title" v-for="item in allList" :key="item.id">
			 <van-cell-group>
				 <navigator :url="'/pages/newsDetail/newsDetail?messageCode='+value.code"  v-for="value in item.list" :key="value.id">
					<van-cell custom-class="news-cell" :title="value.title" :label="value.content">
						<view class="new-value">
							<text>{{value.createTime}}</text>
							<text class="news-is-read" v-if="value.readType=='esMessageNotRead'">1</text>
						</view>
						<van-icon slot="icon" :name="item.icon" color="#07c160" size="1.4rem" custom-style="margin-right:5px;" />
					</van-cell>
				</navigator>
			 </van-cell-group> 
		  </van-tab>
		</van-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				allList:[
					{
						title:"消息",
						icon:"chat",
						list:[]
					},
					{
						title:"通知",
						icon:"bell",
						list:[]
						
					}
				],
				newsList:[],
				noticeList:[]
			};
		},
		onShow() {
			this.getNewsList();
			this.getNoticeList();
			this.getnotReadNum();
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
			// 获取消息列表
			getNewsList(){
				this.$api.newApi.messageListReq({
					keyWord:"",
					page:1,
					size:5
				}).then(res => {
					this.newsList = res.listData;
					this.allList[0].list = this.newsList;
				})
			},
			// 获取通知列表
			getNoticeList(){
				this.$api.newApi.noticeListReq({
					keyWord:"",
					page:1,
					size:5
				}).then(res => {
					this.noticeList = res.listData;
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
