<template>
	<view class="wallet">
		<view class="wallet-header">
			<van-cell label-class="my-label" :title="userInfo.nickName" use-label-slot size="large" center :border="false">
				<van-icon slot="icon" :name="userInfo.avatarUrl" size="4rem" custom-style="margin-right:10px"></van-icon>
				<view class="" slot="label" >
					钱包:0.26个熊猫币
				</view>
			</van-cell>
		</view>
		<van-cell-group title="钱包明细" :border="false">
			<picker mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="order-time"><text>{{date}}</text><van-icon name="arrow-down" /></view>
			</picker>
			<van-cell v-for="item in orderList" :key="item.id" :title="item.reason" :label="item.createTime">
				<text class="my-value" :class="{active:item.type==1}">{{item.type==1?`+${item.costCoin}个`:`-${item.costCoin}个`}}</text>
			</van-cell>
		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				userInfo:null,
				date:currentDate, // 日期
				orderList:[
					{
						"costCoin": 0.26,
						"createTime": "2020-03-03 14:07:08",
						"reason": "获得熊猫币",
						"type": 0,
					},
					{
						"costCoin": 0.20,
						"createTime": "2020-03-03 14:07:08",
						"reason": "消费熊猫币",
						"type": 1,
					},
					{
						"costCoin": 0.26,
						"createTime": "2020-03-03 14:07:08",
						"reason": "获得熊猫币",
						"type": 0,
					},
					{
						"costCoin": 0.26,
						"createTime": "2020-03-03 14:07:08",
						"reason": "消费熊猫币",
						"type": 1,
					},
				]
			};
		},
		onShow(){
			this.userInfo = uni.getStorageSync("userInfo") || null;
		},
		computed: {
		    startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods:{
			bindDateChange: function(e) {
				this.date = e.target.value
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
