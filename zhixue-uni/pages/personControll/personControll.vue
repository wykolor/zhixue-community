<template>
	<view class="perControll">
		<view class="header">
			<van-search
			  :value="inputValue"
			  placeholder="姓名/人员类型/小区"
			  show-action
			  @search="onSearch"
			  @cancel="onCancel"
			/>
			<van-dropdown-menu>
			  <van-dropdown-item :value="selectOne" :options="allSelect" @change="getType"/>
			  <van-dropdown-item :value="selectTwo" :options="dealType" @change="getDeal" />
			  <van-dropdown-item :value="selectThree" :options="allCommunity" @change="getCommunity" />
			</van-dropdown-menu>
		</view>
		<view class="content">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" >
				<view class="personDetail" v-for="(v,i) in communityArr" :key="i">
					<view>
						<view class="left_detail">
							<view>
								<van-tag plain type="success" size="medium">{{v.typeName}}</van-tag>
								<van-tag plain type="success" size="medium" style="border: 1px solid #fff;">{{v.communityName}}</van-tag>
							</view>					
							<view class="user_info">
								<view class="text_list">
									<text>身份证号：</text>
									<text>{{v.identity}}</text>
								</view>
								<view class="text_list">
									<text>姓名：</text>
									<text>{{v.name}}</text>
								</view>
								<view class="text_list">
									<text>最后出现：</text>
									<text>{{v.endTime}} {{v.endPosition}}</text>
								</view>
								<view class="text_list">
									<text>处理类型：</text>
									<text>{{v.disposeTypeName}}</text>
								</view>
								<view class="text_list">
									<text>电话：</text>
									<text @click="goPhone(v.mobile)">{{v.mobile}}</text>
								</view>
							</view>
						</view>
						<view class="right_photo">
							<img :src="v.image" alt="" />
						</view>
					</view>
					<text class="deal_btn" v-if="v.typeName=='新增人员'" @click="goDealWith(1,v.id,v.type)">去处理</text>			
					<text class="deal_btn" v-if="v.typeName=='异常人员'" @click="goDealWith(2,v.id,v.type)">去处理</text>			
				</view>
			</mescroll-uni>
		</view>
		<van-popup :show="show" @close="onClose" >
			<view class="Dialogbox">
				<view class="title">
					处理{{warnMes}}
				</view>
				<view class="operate_box">
					<view class="picker">
						<text @click="chooseType">{{initPersonType}}</text>
					</view>
					<view class="suggest_box">
						<textarea v-model="inputResult"  placeholder="请输入处理结果" maxlength="50"/>
					</view>
				</view>
				<view class="btn_box">
					<text @click="onClose">取消</text>
					<text @click="submit">确定</text>
				</view>
			</view>
		</van-popup>
		<van-popup :show="showType" position="bottom" overlay="false">
			<van-picker
			:columns="columns"
			@cancel="onCancel"
			@confirm="onConfirm" 
			@change="onChange" 
			show-toolbar/>
		</van-popup>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default{
		mixins: [MescrollMixin],
		data() {
			return {
				inputValue:'',
				inputResult:'',
				selectOne:"",
				selectTwo:'',
				selectThree:'',
				allSelect: [
					{ text: '全部', value:"" },
					{ text: '新增人员', value:"personInoutTypeNewAdd" },
					{ text: '异常人员', value:"personInoutTypeAbnormal" }
				],
				dealType: [
					{ text: '全部', value: "" },
					// { text: '待处理', value: 'personInoutDisposeTypeWait' },
					{ text: '处理中', value: 'personInoutDisposeTypeProgress' },
					{ text: '处理完成', value: 'personInoutDisposeTypeOver' }
				],
				allCommunity:[],
				columns:[],
				escode:'',
				communityArr:[],
				show:false,
				showType:false,
				initPersonType:'点击选择类型',
				peopleType:'',  //全部
				disposeType:'',  //全部
				currentPage:1,
				keyWord:'',
				warnMes:'新增',
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						currentPage: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无数据'
					}
				},
				id:null,
				type:null
			}
		},
		onShow() {
			// 获取全部类型
			this.getAllPepType()
		},
		methods:{
			onSearch(e){
				console.log(e.detail)
				this.keyWord = e.detail
				this.getCommunityList()
			},
			onCancel(){
				
			},
			// 下拉刷新
			downCallback(){
				this.mescroll.endSuccess();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.$api.personCtrlApi.ctypageReq({
					"disposeType":this.disposeType,
					"esCode":this.escode,
					"keyWord":this.keyWord,
					"keyWordSearchList": [""],
					"page":this.currentPage,
					"size":10,
					"type":this.peopleType
				}).then(res=>{
					let curPageData = res.listData
					let curPageLen = res.paginationData.currentElements;
					let totalPage = res.paginationData.totalPages;
					if(res.paginationData.currentPage<totalPage){
						let hasNext = true
					}else{
						let hasNext = false
					}
					//设置列表数据
					if(pageNum == 1) this.communityArr = []; //如果是第一页需手动置空列表
					this.communityArr = this.communityArr.concat(curPageData); //追加新数据
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(curPageLen, totalPage); 
				})		
			},
			getAllPepType(){
				// 获取小区
				this.$api.personCtrlApi.communityReq({}).then(res=>{
					this.allCommunity = res.data.map((v,i)=>{
						return {'text':v.communityName,'value':v.code}
					})
					this.allCommunity.unshift({'text':'全部小区','value':''})
					this.escode = res.data[0].code
					this.getCommunityList()
				})
			},
			// 获取社区列表
			getCommunityList(){
				this.$api.personCtrlApi.ctypageReq({
					"disposeType":this.disposeType,
					"esCode":this.escode,
					"keyWord":this.keyWord,
					"keyWordSearchList": [""],
					"page":this.currentPage,
					"size":10,
					"type":this.peopleType
				}).then(res=>{
					console.log(res)
					this.communityArr = res.listData
				})
			},
			// 处理新增人员
			newAddType(){
				this.$api.personCtrlApi.allTypeReq({}).then(res=>{
					console.log(res)
					this.columns = res.data.map((v,i)=>{
						return {'text':v.categrayName,'value':v.value}
					})
					this.initPersonType = res.data[0].categrayName
					this.type = res.data[0].value
				})
			},
			// 处理异常
			abNormalType(){
				this.$api.personCtrlApi.abNormalReq({}).then(res=>{
					console.log(res)
					this.columns = res.data.map((v,i)=>{
						return {'text':v.categrayName,'value':v.value}
					})
					this.initPersonType = res.data[0].categrayName
					this.type = res.data[0].value
				})
			},
			goDealWith(type,id,peopleType){
				this.show = true
				this.id = id
				if(type==1){
					this.newAddType()
					this.warnMes="新增"
				}else{
					this.abNormalType()
					this.warnMes="异常"
				}
			},
			onClose(){
				this.show = false
			},
			onConfirm(e){
				this.showType = false
			},
			onCancel(){
				this.showType = false
			},
			onChange(event){
				console.log(event.detail.value)
				this.initPersonType = event.detail.value.text
				this.type = event.detail.value.value
			},
			chooseType(){
				this.showType = true
			},
			getType(value){
				console.log(value.detail)
				this.peopleType = value.detail
				this.getCommunityList()
			},
			getDeal(value){
				this.disposeType = value.detail
				this.getCommunityList()
			},
			getCommunity(value){
				this.escode = value.detail
				this.getCommunityList()
			},			
			// 确认提交
			submit(){
				this.$api.personCtrlApi.dealReq({
					"disposeResult":this.inputResult,
					"id":this.id,
					"type":this.type
				}).then(res=>{
					this.show = false
					this.inputResult = ''
					if(res.code == 100000){
						Toast.success(res.message);
						// 刷新列表
						this.getCommunityList()
					}else{
						Toast.fail(res.message);
					}
				})
			},
			goPhone(mobile){
				uni.makePhoneCall({
					phoneNumber:mobile,
					success() {
					},
					fail() {
						
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.perControll{
		background-color: #f2f2f2;
		position:absolute;
		top:0;
		left:0;
		bottom:0;
		width: 100%;
		height: 100%;
		.header{
			height:18%;
		}
		.content{
			/deep/ .mescroll-uni-fixed{
				top: 18% !important;
			}
			height:81%;
			overflow-y: scroll;
			.personDetail{
				margin:6px 10px;
				>view{
					display: flex;
					background-color:#fff;
					min-height:450rpx;
					padding:10px;
					.left_detail{
						flex: 2;						
						.user_info{
							.text_list{
								font-size: 13px;
								line-height: 34px;
								text:first-child{
									color: #ccc;
								}
								text:last-child{
									font-weight: bold;
								}
							}
						}
					}
					.right_photo{
						flex: 1;
						img{
							width:100%;
							height:300rpx;
						}
					}
				}
				.deal_btn{
					height: 80rpx;
					line-height: 80rpx;
					display: block;
					background-color: #07C160;
					color: #fff;
					text-align: center;
				}
			}
		}
		.Dialogbox{
			width: 500rpx;
			height: 600rpx;
			.title{
				text-align: center;
				height: 34px;
				line-height: 34px;
			}
			.operate_box{
				padding:20rpx 30rpx 60rpx;
				height:380rpx;
				border-bottom:1px solid #ddd;
				border-top:1px solid #ddd;
				.suggest_box{
					height: 300rpx;
					border: 1px solid #ddd;
					margin-top: 10px;
					border-radius: 4px;
					textarea{
						width: 400rpx;
						padding: 10px;
					}
				}
			}
			.btn_box{
				width: 100%;
				height: 34px;
				line-height: 34px;
				text{
					display: inline-block;
					width:49.5%;
					text-align: center;
				}
				text:last-child{
					color: #07C160;
					border-left: 1px solid #ddd;
				}
			}
		}
		/deep/ .van-picker-column__item--selected{
			font-weight: 800 !important;
			color:#000 !important;
		}
		/deep/ .van-picker-column__item{
			color:#888;
		}
	}
</style>
