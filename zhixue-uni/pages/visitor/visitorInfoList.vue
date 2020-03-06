<template>
	<view class="vsinfo">
		<van-tabs :active="active" @change="onChange">
			<van-tab title="历史申请">
				<view class="history">
					<view class="list">
						<view class="img_info">
							<view class="img">
								<van-image
								  round
								  width="8rem"
								  height="8rem"
								  fit="cover"
								  src="https://img.yzcdn.cn/vant/cat.jpeg"
								/>
							</view>							
							<view class="info">
								<text>申请人：</text>
								<text>申请电话：133821884<van-tag type="danger" size="large">拨打</van-tag></text>
								<text>访问到期时间：</text>
								<text>申请理由：</text>
							</view>
						</view>
						<view class="btn_box">
							<van-button type="primary">同意申请</van-button>
							<van-button type="primary" plain>拒绝申请</van-button>
						</view>
					</view>
				</view>
			</van-tab>
			<van-tab title="访客申请">
				<view class="current history">
					<view class="list">
						<view class="img_info">
							<view class="img">
								<van-image
								  round
								  width="8rem"
								  height="8rem"
								  fit="cover"
								  src="https://img.yzcdn.cn/vant/cat.jpeg"
								/>
							</view>							
							<view class="info">
								<text>姓名：</text>
								<text>访问小区：</text>
								<text>访问人：</text>
								<text>访问电话：133821884<van-tag type="danger" size="large">拨打</van-tag></text>
								<text>访问房屋：</text>
								<text>审核状态：</text>
								<text>访问到期时间：</text>
							</view>
						</view>
						<view class="btn_box">
							<van-button type="primary">再次申请访问</van-button>
						</view>
					</view>
				</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				active:0
			}
		},
		onLoad(option) {
			// 接收从消息跳转页面过来的参数
		},
		methods:{
			onChange(event) {
				console.log(event.detail.name)
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
						flex: 2;
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
	}
	
</style>
