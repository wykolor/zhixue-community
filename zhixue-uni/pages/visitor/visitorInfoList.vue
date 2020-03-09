<template>
	<view class="vsinfo">
		<van-tabs :active="active" @change="onChange">
			<van-tab title="历史申请">
				<view class="current history">
					<view class="list" v-for="(v,i) in listArr" :key="i">
						<view class="img_info">
							<view class="img">
								<van-image
								  round
								  width="8rem"
								  height="8rem"
								  fit="cover"
								  :src="v.image"
								/>
							</view>							
							<view class="info">
								<text>姓名：{{v.esMemberName}}</text>
								<text>访问小区：{{v.esName}}</text>
								<text>访问人：{{v.memberName}}</text>
								<view @click="gophone(v.esMobile)">访问电话：{{v.esMobile}} <van-tag type="success" size="large">拨打</van-tag></view>
								<text>访问房屋：</text>
								<text>审核状态：{{v.status==esvisitorNotCheck?'未审核':v.status==esvisitorCheckSuccess?'审核成功':'拒绝申请'}}</text>
								<text>访问到期时间：{{v.endTime}}</text>
							</view>
						</view>
						<view class="btn_box">
							<van-button type="primary" @click="goAgreeagain(v.code)">再次申请访问</van-button>
						</view>
					</view>
				</view>
			</van-tab>
			<van-tab title="访客申请">
				<view class="history">
					<view class="list" v-for="(v,i) in listInfoArr" :key="v.code">
						<view class="img_info">
							<view class="img">
								<van-image
								  round
								  width="8rem"
								  height="8rem"
								  fit="cover"
								  :src="v.image"
								/>
							</view>							
							<view class="info">
								<text>申请人：{{v.esMemberName}}</text>
								<view @click="gophone(v.esMobile)">申请电话：{{v.esMobile}}&nbsp;<van-tag type="success" size="large">拨打</van-tag></view>
								<text>访问到期时间：{{v.endTime}}</text>
								<text>申请理由：{{v.reason}}</text>
							</view>
						</view>
						<view class="btn_box">
							<van-button type="primary" @click="goAgree(v.code)">同意申请</van-button>
							<van-button type="primary" plain @click="refuseAgree(v.code)">拒绝申请</van-button>
						</view>
					</view>
				</view>			
			</van-tab>
		</van-tabs>
		<view class="uploader" v-show="active==0" @click="goVisit">
			<text>申请访问</text>
		</view>
		<van-popup :show="show" @close="onClose">
			<view class="infobox">
				<view class="detail">
					<view>申请人：</view>
					<view>有效日期：<text @click="showpicker">1天</text></view>
				</view>
				<view class="btn_box">
					<van-button type="primary" plain @click="show=false">取 消</van-button>
					<van-button type="primary" @click="subApply">确 定</van-button>
				</view>
			</view>
		</van-popup>
		<van-popup :show="showday" @close="showday=false">
			<van-picker :columns="dayArr" @change="onChange"/>
		</van-popup>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	export default{
		data(){
			return{
				active:0,
				show:false,
				listArr:[],
				listInfoArr:[],
				code:null,
				expireDay:1,
				dayArr:['一天','二天','三天'],
				showday:false
			}
		},
		onLoad(option) {
			// 接收从消息跳转页面过来的参数
			this.$api.visitorApi.historyReq({}).then(res=>{
				console.log(res)
				this.listArr = res.data
			})
			this.$api.visitorApi.vsMesReq({}).then(res=>{
				console.log('ls',res)
				this.listInfoArr = res.data
			})
		},
		methods:{
			onChange(event) {
				console.log(event.detail.name)
				this.active = event.detail.name
			},
			goAgree(code){
				this.show = true
				this.code = code
			},
			subApply(){
				this.$api.visitorApi.accessReq({
					"code":this.code,
					"day":this.expireDay,
					"type":"esvisitorCheckSuccess"
				}).then(res=>{
				
				})
			},
			refuseAgree(code){
				Dialog.confirm({
				  title: '提示',
				  message: '你确定要拒绝本次申请吗？'
				}).then(() => {
					this.$api.visitorApi.accessReq({
						"code":code,
						"day":0,
						"type":"esvisitorCheckRefuse"
					}).then(res=>{
					
					})
				}).catch(() => {
				  // on cancel
				});
			},
			showpicker(){
				this.showday = true
			},
			onClose(){
				this.show = false
			},
			goAgreeagain(){
				this.$api.visitorApi.applyagainReq({
					code
				}).then(res=>{
				
				})
			},
			goVisit(){
				uni.navigateTo({
					url:'./visitor'
				})
			},
			gophone(phone){
				console.log(1111)
				uni.makePhoneCall({
					phoneNumber:phone,
					success() {
					},
					fail() {
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .van-tabs__line{
		background-color: #07c160;
	}
	.vsinfo{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: #f2f2f2;
		.history{
			width: 100%;
			.list{
				min-height:380rpx;
				width: 90%;
				margin: 20rpx auto;
				background:#fff;
				padding:20rpx;
				border-radius: 6px;
				box-shadow: 0 8px 12px #ebedf0;
				.img_info{
					display: flex;
					font-size: 14px;
					.img{
						flex: 1;
					}
					.info{
						flex: 3;
						margin-left:40rpx;
						text{
							line-height:60rpx;
							display: block;
						}
					}
				}
				.btn_box{
					text-align: center;
					margin-top: 20rpx;
					/deep/ .van-button--normal{
						margin-right:40rpx;
					}
					/deep/ .van-button--normal{
						margin-left:40rpx;
					}
				}
			}
		}
		.current{
			.info{
				text{
					line-height:40rpx !important;
				}
			}
		}
		.infobox{
			width:600rpx;
			height:440rpx;
			background:#fff;
			.detail{
				line-height: 40px;
				margin-left: 20px;
				margin-top: 20px;
			}
			.btn_box{
				display: flex;
				justify-content: space-around;
				margin-top:65px;
				/deep/ .van-button{
					width:120px;
				}
			}
		}
		.uploader {
			position: fixed;
			bottom: 1rem;
			right: 1rem;
			border: 1px solid #07c160;
			border-radius: 50%;
			height: 60px;
			width: 60px;
			text-align: center;
			line-height: 56px;
			z-index: 9;
		
			text {
				font-size:14px;
				color: #07c160;
			}
		}
	}
	
</style>
