<template>
	<view class="detailbind">
		<!-- 绑定单元 -->
		<view v-show="showFlag==1">
			<text>选择单元</text>
			<van-picker :columns="columns" @change="onChange" />
			<view class="button_box">
				<van-button type="primary" size="large" round @click="goNext(2)">下一步</van-button>
			</view>
		</view>
		<!-- 绑定楼层 -->
		<view v-show="showFlag==2">
			<text>选择楼层</text>
			<van-picker :columns="columns" @change="onChange" />
			<view class="button_box">
				<van-button type="primary" size="large" round @click="goNext(3)">下一步</van-button>
			</view>
		</view>
		<!-- 绑定房间 -->
		<view v-show="showFlag==3">
			<text>选择房间</text>
			<van-picker :columns="columns" @change="onChange" />
			<view class="button_box">
				<van-button type="primary" size="large" round @click="goNext(4)">下一步</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast'
	export default{
		data(){
			return{				
				columns: [],
				showFlag:1
			}
		},
		onLoad(option){ //option为object类型，会序列化上个页面传递的参数
		    console.log(option.code); //打印出上个页面传递的参数。
			// 选择单元
			this.$api.hsbindApi.buildReq({
				"type":"unit",
				"code":option.code
			}).then(res=>{
				this.columns = res.data.map((v,i)=>{
					return {"type":v.type,"text":v.name,"code":v.code}
				})
				// 默认情况
				this.code = this.columns[0].code
			})
		},
		methods:{
			goNext(count){				
				switch (count){
					case 2:
					// 选择楼层
						this.showFlag = count
						this.switchOpt("floor")
						break;
					case 3:
					// 选择房间
						this.showFlag = count
						this.switchOpt("room")
						break;
					case 4:
						// 跳转
						uni.navigateTo({
							url:"successInfo?type=1"  //住户绑定
						})
						break;
					default:
						break;
				}				
			},
			onChange(event) {
				console.log(event.detail)
				this.code = event.detail.value.code
			},
			// 切换选项
			switchOpt(type){
				this.$api.hsbindApi.buildReq({
					"type":type,
					"code":this.code
				}).then(res=>{
					if(res.data.length!=0){
						this.columns = res.data.map((v,i)=>{
							return {"type":v.type,"text":v.name,"code":v.code}
						})
						// 默认情况
						this.code = this.columns[0].code
					}else{
						Toast.fail("暂无数据")
					}					
				})
			}
		}
	}
</script>

<style lang="scss">
	.detailbind{
		margin-top: 2rem;
		view{
			text-align: center;
			.button_box{
				padding: 0 5%;
			}
		}
	}
</style>
