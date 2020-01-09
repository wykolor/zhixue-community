<template>
	<view class="housbind">
		<view v-for="(v,i) in houseArr" :key="i">
			<view class="house">
				<img :src="v.image" alt="">
				<view class="detail">
					<text class="font16">{{v.info}}</text>
					<text class="passed" v-if="v.status=='esHourseCheckSucess'">审核通过</text>
					<text class="nopass" v-if="v.status=='esHourseCheckFail'">审核失败</text>
					<text class="passing" v-if="v.status=='esHourseNotCheck'">等待审核</text>
					<van-radio-group :value="radio" @change="onChange(v.hourseCode,$event)">
					  <van-radio :name="i" checked-color="#07c160" shape="square">默认房产</van-radio>
					</van-radio-group>
				</view>
			</view>
			<text class="del">删除</text>
		</view>
		<view class="uploader" @click="goBind">
			<text>+</text>
		</view>
		<van-dialog id="van-dialog" />
		<van-notify id="van-notify" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import Notify from '../../wxcomponents/vant/notify/notify';
	export default{
		data(){
			return{	
				imageURL:require('../../static/img/tabbar/home-active.png'),
				radio: '1',
				houseArr:[]
			}
		},
		onReady() {
			this.initList()
		},
		methods:{
			initList(){
				this.$api.hsbindApi.hsListReq({}).then(res=>{
					if(res.code==100000){
						console.log(res)
						this.houseArr = res.data
						res.data.forEach((v,i)=>{
							if(v.defaultHourse==='esDefaultHourse'){
								console.log(111)
								this.radio = i+''
							}
						})
					}					
				})
			},
			goBind(){
				this.$api.hsbindApi.bindWayReq({}).then(res=>{
					if(res.code==100000){
						uni.navigateTo({
							url:res.data.value,//跳转的路径			 
						})
					}					
				})				
			},
			onChange(housecode,event){
				Dialog.confirm({
				  title: '提示',
				  confirmButtonText:"确定",
				  message: '是否要切换默认房产'
				}).then(() => {
				  // 确定
				  this.$api.hsbindApi.switchReq({
				  	"hourseCode":housecode
				  }).then(res=>{
				  	if(res.code==100000){
						this.radio = event.detail
				  		Notify({ type: 'success', message: '切换成功！' });
				  	}else{
						Notify({ type: 'danger', message: '切换失败！'+res.message });
					}
				  })
				}).catch(() => {
					console.log("取消切换")
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.font16{
		font-size: 16px;
	}
	.housbind{
		background-color: #fafafa;
		position:absolute;
		top:0;
		left:0;
		bottom:0;
		width: 100%;
		height: 100%;
		>view{
			width: 94%;
			margin: 20px auto;
			background:#fff;
			font-size: 12px;
			.house{				
				display: flex;
				justify-content:flex-start;			
				height: 200rpx;
				border-bottom: 1px solid #eee;
				img{
					width: 40%;
					height: 200rpx;
				}
				.detail{
					width:60%;
					padding:0 10px;
					text{
						display: block;
						line-height:34px;
						height:34px;
					}
					text:last-child{
						text-align: right;
					}
					.passing{
						color: #409EFF;
					}
					.passed{
						color: #67C23A;
					}
					.nopass{
						color: #F56C6C;
					}
				}
			}
			.del{
				display:block;
				text-align: center;
				line-height: 34px;
				height: 34px;
				color:#ee0a24;
			}
		}
		.uploader{
			position: fixed;
			bottom:1rem;
			right: 1rem;
			border: 1px solid #07c160;
			background-color:#fff;
			border-radius:50%;
			height: 60px;
			width: 60px;
			text-align: center;
			line-height: 56px;
			text{
				font-size:34px;
				color:#07c160;
			}
		}
	}
</style>
