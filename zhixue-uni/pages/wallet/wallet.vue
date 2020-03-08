<template>
	<view class="wallet">
		<view class="wallet-header">
			<van-cell  size="large" center label-class="my-label" use-label-slot :border="false" :url="userInfo.nickName?'':'/pages/authUserInfo/authUserInfo'">
				<text slot="title">{{userInfo.nickName?userInfo.nickName:'登录/注册'}}</text>
				<van-icon slot="icon" :name="userInfo.avatarUrl?userInfo.avatarUrl:'smile'" size="4rem" custom-style="margin-right:10px"></van-icon>
				<view class="" slot="label" @click.stop="goWallet">
					熊猫币:{{userInfo.wxUserEstateConfResp.pandaCoin}}个
				</view>
			</van-cell>
		</view>
		<van-cell-group title="钱包明细" :border="false">
			<picker mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="order-time"><text>{{date}}</text><van-icon name="arrow-down" /></view>
			</picker>
			<van-cell v-for="item in orderList" :key="item.id" :title="item.reason" :label="item.createTime">
				<text class="my-value" :class="{active:item.type==0}">{{item.type==0?`+${item.costCoin}个`:`-${item.costCoin}个`}}</text>
			</van-cell>
			<error-tip v-if="!orderList.length"></error-tip>
			<van-divider content-position="center" custom-style="width:70%;margin:20px auto" v-if="finished">没有更多了~</van-divider>
		</van-cell-group>
	</view>
</template>

<script>
	import ErrorTip from "../../components/error/error.vue";
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				userInfo:{},
				currentPage:1,
				keyWord:"",
				totalPage:Number,
				finished:false,
				date:currentDate, // 日期
				orderList:[]
			};
		},
		onShow(){
			this.getUserInfo();
			this.getOrderList();
		},
		components:{
			"error-tip":ErrorTip,
		},
		computed: {
		    startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.currentPage = 1;
			this.totalPage = Number;
			this.finished = false;
			this.getOrderList();
		},
		// 上拉加载
		onReachBottom(){
			this.currentPage++;
			this.getOrderList();
		},
		methods:{
			bindDateChange: function(e) {
				this.date = e.target.value;
				// 恢复初始化分页
				this.currentPage = 1;
				this.totalPage = Number;
				this.finished = false;
				this.getOrderList();
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year;
					month = month;
				}
				month = month > 9 ? month : '0' + month;;
				return `${year}-${month}`;
			},
			// 获取用户信息
			getUserInfo(){
				this.userInfo = getApp().globalData.userInfo;
				this.$api.authApi.detailReq({ openId:getApp().globalData.openId }).then(res => {
					// 存入全局globalData
					if(res.code === 100000){
						this.userInfo = res.data;
					}
				})
			},
			// 获取消费明细
			getOrderList(){
				// 如果当前页码大于总页数
				if(this.currentPage > this.totalPage){
					this.finished = true;
					return false;
				}
				this.$api.walletApi.accountDetailListReq({
					month:this.date,
					page:this.currentPage,
					keyWord:this.keyWord,
					size:10
				}).then(res => {
					// 停止下拉刷新
					uni.stopPullDownRefresh();
					let { listData,paginationData,code} = res;
					if(code === 100000){
						if(this.currentPage===1){
							this.orderList = listData;
							this.totalPage = paginationData.totalPages;
						}else{
							this.orderList = this.orderList.concat(listData);
						}
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.wallet{
	width: 100%;
	min-height: 100vh;
	background: #fff;
	@include border-box;
	.wallet-header{
		& /deep/ .van-cell{
			padding-bottom: 3rem;
			padding-top: 2rem;
			background-color: $zx-topic-color;
			color: #fff;
			.van-cell__right-icon-wrap{
				color: #fff;
			}
			image{
				border-radius: 50%;
			}
			.my-label{
				color: #fff;
			}
		}
		
	}
	& /deep/ .van-cell-group{
		.order-time{
			display: flex;
			align-items: center;
			padding: 0 0.8rem;
			
		}
		.van-cell{
			.my-value{
				color:#333;
				&.active{
					color:orange;
				}
			}
		}
	}
}
</style>
