<template>
	<view class="home-help">
		<!-- 头部-->
		<view class="header">
			<!-- 搜索 -->
			<van-search
			  placeholder="搜索小区服务"
			  show-action
			  shape="round"
			  background="#07c160"
			  cancel-class="cancel-text"
			  @search="searchHandle"
			/>
			<!-- 筛选 -->
			<van-dropdown-menu active-color="#07c160">
			  <van-dropdown-item :value="value1" :options="option1" />
			  <van-dropdown-item :value="value2" :options="option2" />
			  <van-dropdown-item :value="value3" :options="option3" />
			</van-dropdown-menu>
		</view>
		<!-- 服务商品列表 -->
		<view class="help-list">
			<van-card
				v-for="item in helpList"
				:key="item.id"
				:price="item.price"
				:desc="item.desc"
				:title="item.title"
				:thumb="item.image"
				
			>
				<view slot="footer">
					<van-button size="small" type="primary" round icon="phone" @click="callUp" :id="item.phone">立即订购</van-button>
				</view>
			</van-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1:0,
				value2:"a",
				value3:"open",
				option1:[
					{ text: '全部商品', value: 0 },
					{ text: '新款商品', value: 1 },
					{ text: '活动商品', value: 2 }
				],
				option2:[
					{ text: '默认排序', value: 'a' },
					{ text: '好评排序', value: 'b' },
					{ text: '销量排序', value: 'c' }
				],
				option3:[
					{text:"正在营业",value: "open"},
					{text:"停止营业",value: "close"}
				],
				helpList:[
					{
						image:require('../../static/img/homeHelp/u186.jpg'),
						title:"和平保洁公司",
						price:"100.00",
						time:"(营业时间 10:00-21:00)",
						desc:"良心保洁 用心体验",
						phone:"18208207457"
					},
					{
						image:require('../../static/img/homeHelp/u195.jpg'),
						title:"建设小区送水上门",
						price:"19.00",
						time:"(营业时间 10:00-21:00)",
						desc:"水质安全 放心饮用",
						phone:"18283171252"
					},
					{
						image:require('../../static/img/homeHelp/u186.jpg'),
						title:"和平保洁公司",
						price:"100.00",
						time:"(营业时间 10:00-21:00)",
						desc:"良心保洁 用心体验",
						phone:"13649037730"
					},
					{
						image:require('../../static/img/homeHelp/u195.jpg'),
						title:"建设小区送水上门",
						price:"19.00",
						time:"(营业时间 10:00-21:00)",
						desc:"水质安全 放心饮用",
						phone:"18190282178"
					},
					{
						image:require('../../static/img/homeHelp/u186.jpg'),
						title:"和平保洁公司",
						price:"100.00",
						time:"(营业时间 10:00-21:00)",
						desc:"良心保洁 用心体验"
					},
					{
						image:require('../../static/img/homeHelp/u195.jpg'),
						title:"建设小区送水上门",
						price:"19.00",
						time:"(营业时间 10:00-21:00)",
						desc:"水质安全 放心饮用",
						phone:"18190282178"
					},
					{
						image:require('../../static/img/homeHelp/u186.jpg'),
						title:"和平保洁公司",
						price:"100.00",
						time:"(营业时间 10:00-21:00)",
						desc:"良心保洁 用心体验",
						phone:"18190282178"
					},
					{
						image:require('../../static/img/homeHelp/u195.jpg'),
						title:"建设小区送水上门",
						price:"19.00",
						time:"(营业时间 10:00-21:00)",
						desc:"水质安全 放心饮用",
						phone:"18190282178"
					}
				]
			}
		},
		onShow(){
			this.getHelpList();
		},
		methods: {
			searchHandle(event){
				console.log("搜索服务",event.detail);
			},
			// 获取数据
			getHelpList(){
				
				let params = {
					keyWord:"",
					page:1,
					priceOrder:"desc",
					size:10,
					type:"保洁"
				}
				this.$api.homeHelpApi.eshourseKeepingReq({
					keyWord:"false",
					page:1,
					priceOrder:"desc",
					size:10,
					type:"保洁"
				}).then(res => {
					
				})
			},
			// 拨打电话
			callUp(e){
				uni.makePhoneCall({
					phoneNumber:e.target.id,
					success() {
						
					},
					fail() {
						console.log("失败")
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.home-help{
	width: 100%;
	min-height: 100vh;
	@include border-box;
	padding-top: 104px;
	background: $uni-bg-color-page;
	.header{
		width: 100%;
		position: fixed;
		top:0;
		left: 0;
		z-index: 99;
		& /deep/.van-search{
			.cancel-text{
				color: #fff;
			}
		}
	}
	.help-list{
		width: 100%;
		@include border-box;
		padding: 8px;
		& /deep/ .van-card{
			background-color: #fff;
			margin-bottom: 8px;
			border-radius: 5px;
		}
	}
}
</style>
