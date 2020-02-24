<template>
	<view class="alterNotice">
		<view class="header">
			<view class="search_box">
				<van-search
				  :value="value"
				  placeholder="姓名或关键字"
				  show-action
				  @search="onSearch"
				  @cancel="onCancel"
				/>
			</view>
			<view class="tag_box">
				搜索范围:<text @click="pickTime(1)">{{startTime===''?'开始时间':startTime}}</text> - <text @click="pickTime(2)">{{endTime===''?'结束时间':endTime}}</text>
			</view>
		</view>
		<view class="content">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption" >
				<view class="imglist" v-for="(v,i) in imglistArr" :key="'list'+i">
					<view class="img">
						<img :src="v.faceUrlFull" alt="" class="icon_head">
						<text>{{v.faceName}}</text>
						<img :src="v.panoramaUrlFull" alt="" class="full_img" :class='{"full_imgBig":imgflag&&i==index,"full_imgSmall":!imgflag&&i==index}' @click="scaleImg(i)">
					</view>
					<view class="detail_text">
						<text>{{v.createTime}} {{v.captureAddress}} {{v.alarmScore}} 黑名单报警</text>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<van-popup :show="TimeFlag" position="bottom">
			<van-datetime-picker
			  type="datetime"
			  :value="currentDate"
			  :min-date="minDate"
			  :max-date="maxDate"
			  @input="getstartTime"			  
			  @cancel="closePicker"
			  @confirm="surePicker"
			/>
		</van-popup>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin],
		data(){
			return{
				value:'',
				imglistArr:[],
				TimeFlag:false,
				// 时间选择器参数
				minHour: 10,
				maxHour: 20,
				minDate: new Date(2019, 8, 1).getTime(),
				maxDate: new Date().getTime(),
				currentDate: new Date().getTime(),
				timeType:null,
				startTime:"",
				endTime:"",
				keyWord:"",
				// 下拉刷新的常用配置
				downOption: { 
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					native: false // 启用系统自带的下拉组件,默认false;
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						currentPage: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '没有更多数据了'
					}
				},
				imgflag:false,
				index:null
			}
		},
		onShow(){
			// 获取列表
			this.getAlertList()
			console.log(this)
		},
		methods:{
			onSearch(e){
				this.keyWord = e.detail
				this.getAlertList()
			},
			onCancel(){
				
			},
			scaleImg(i){
				console.log(1111)
				this.index = i
				this.imgflag = !this.imgflag
			},
			// 下拉刷新
			downCallback(){
				this.mescroll.endSuccess();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				this.$api.alertNoticeApi.alertReq({
					"keyWord":this.keyWord,
					"page":this.currentPage,
					"size": 10,
					"endTime":this.endTime,
					"startTime":this.startTime
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
					if(pageNum == 1) this.imglistArr = []; //如果是第一页需手动置空列表
					this.imglistArr = this.imglistArr.concat(curPageData); //追加新数据
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(curPageLen, totalPage); 
				})		
			},
			getAlertList(){
				this.$api.alertNoticeApi.alertReq({
					"keyWord":this.keyWord,
					"page":this.currentPage,
					"size": 10,
					"endTime":this.endTime,
					"startTime":this.startTime
				}).then(res=>{
					this.imglistArr = res.listData
				})
			},
			pickTime(type){
				this.TimeFlag = true
				if(type==1){
					this.timeType = 1
				}else{
					this.timeType = 2
				}
			},
			closePicker(){
				this.TimeFlag = false
			},
			surePicker(){
				this.TimeFlag = false
				if(this.timeType==2){
					// 搜索列表
					this.getAlertList()
				}
			},
			getstartTime(event) {
			    console.log(event)
				if(this.timeType == 1){
					this.startTime = this.formatDate(new Date(event.detail))
				}else if(this.timeType == 2){
					this.endTime = this.formatDate(new Date(event.detail))
				}
			},
			formatDate(now) {
				let year=now.getFullYear();  //取得4位数的年份
				let month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
				let date=now.getDate();      //返回日期月份中的天数（1到31）
				let hour=now.getHours();     //返回日期中的小时数（0到23）
				let minute=now.getMinutes(); //返回日期中的分钟数（0到59
				let second=now.getSeconds(); //返回日期中的秒数（0到59）
				return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
			}
		}
	}
</script>

<style scoped lang="scss">
	.alterNotice{
		background-color: #f2f2f2;
		position:absolute;
		top:0;
		left:0;
		bottom:0;
		width: 100%;
		height: 100%;
		.header{
			height:15%;
			background-color: #fff;
			.search_box{
				border-bottom: 1px solid #eee;
				margin-bottom: 8px;			
			}
			.tag_box{
				padding-left:10px;
				font-size:14px;
				text{
					margin:0 10px;
				}
			}
		}
		.content{
			height: 84%;
			overflow-y:scroll;
			/deep/ .mescroll-uni-fixed{
				top: 15% !important;
			}
			.imglist{
				width: 96%;
				margin: 0 auto;
				text-align: center;
				font-size:14px;
				background: #fff;
				margin-top: 10px;
				margin-bottom: 10px;
				position: relative;
				.img{
					width:100%;
					height:240px;
					overflow: scroll;
					.icon_head{
						width: 120rpx;
						height: 160rpx;
						position: absolute;
						left:20px;
						z-index:99;
					}
					.full_imgBig{					
						width:640px;
						height:480px;
						animation-duration: 0.6s;
					}
					.full_imgSmall{
						width:320px;
						height:240px;
						animation-duration: 0.6s;
					}
					text{
						position: absolute;
						left:40rpx;
						top:128rpx;
						font-weight: bold;
						z-index:99;
					}
				}
			}
			.detail_text{
				padding: 10px 0;
			}
		}
	}
</style>
