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
			  @change="changehandle"
			/>
			<!-- 筛选 -->
			<van-dropdown-menu active-color="#07c160">
			  <van-dropdown-item :value="type" :options="option1" @change="changeType"/>
			  <van-dropdown-item :value="priceOrder" :options="option2" @change="changeOrder"/>
			</van-dropdown-menu>
		</view>
		<!-- 服务商品列表 -->
		<view class="help-list">
			<van-card
				v-for="item in helpList"
				:key="item.id"
				:price="item.priceinfo"
				:desc="item.info"
				:title="item.name"
				:thumb="item.image"
			>
				<view slot="footer">
					<van-button size="small" type="primary" round icon="phone">立即订购</van-button>
				</view>
			</van-card>
			<error-tip v-if="!helpList.length"></error-tip>
			<van-divider content-position="center" custom-style="width:70%;margin:20px auto" v-if="finished">没有更多了~</van-divider>
		</view>
	</view>
</template>

<script>
	import ErrorTip from "../../components/error/error.vue";
	export default {
		data() {
			return {
				keyWord:null,
				type:'',
				priceOrder:'',
				option1:[{
					text:'全部商品',
					value:''
				}],
				currentPage:1,
				totalPages:Number,
				finished:false,
				option2:[
					{ text: '默认排序', value:''},
					{ text: '降序', value: 'desc' },
					{ text: '升序', value: 'asc' }
				],
				helpList:[]
			}
		},
		onShow(){
			// 获得服务数据列表
			this.getHelpList();
			// 获得服务类型
			this.gettypeList();
		},
		onPullDownRefresh(){
			this.currentPage = 1;
			this.totalPages = Number;
			this.finished = false;
			this.getHelpList();
		},
		// 上拉加载
		onReachBottom(){
			this.currentPage++;
			this.getHelpList();
		},
		components:{
			"error-tip":ErrorTip,
		},
		methods: {
			// 重置分页数据
			resetData(){
				this.currentPage = 1;
				this.totalPages = Number;
			},
			changeType(value){
				this.resetData();
				this.type = value.detail;
				this.getHelpList();
			},
			changeOrder(value){
				this.resetData();
				this.priceOrder = value.detail;
				this.getHelpList();
			},
			changehandle(event){
				this.keyWord = event.detail;
			},
			searchHandle(event){
				this.resetData();
				this.keyWord = event.detail;
				this.getHelpList();
			},
			// 获取服务数据列表
			getHelpList(){
				// 如果当前页码大于总页数
				if(this.currentPage > this.totalPages){
					this.finished = true;
					return false;
				}
				let params = {
					keyWord:this.keyWord,
					page:this.currentPage,
					priceOrder:this.priceOrder,
					size:10,
					type:this.type
				}
				this.$api.homeHelpApi.eshourseKeepingReq(params).then(res => {
					// 停止下拉刷新
					uni.stopPullDownRefresh();
					// 获取总页数
					this.totalPages = res.paginationData.totalPages;
					if(this.currentPage === 1){
						this.helpList = res.listData;
					}else{
						this.helpList = this.helpList.concat(res.listData)
					}
				})
			},
			// 服务类型
			gettypeList(){
				this.$api.homeHelpApi.typeListReq().then(res => {
					this.option1 = this.option1.concat(res.data.map(item => {
						return {
							text:item.categrayName,
							value:item.value
						}
					}))
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
