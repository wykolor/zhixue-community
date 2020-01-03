<template>
	<view class="indentify">
		<text @click="binduser">关联用户:{{relaUser}}</text>
		<text v-if="expFlag" class="expTime">人脸有效期:{{faceExp}}</text>
		<input type="text" value="" class="number" placeholder="请输入身份证号码" v-model="numberCode"/>
		<input type="text" value="" placeholder="请输入真实姓名" v-model="name"/>
		<view class="button_box">
			<van-button type="primary" size="large" round @click="goSubmit">提交注册</van-button>
		</view>
		<van-toast id="van-toast" />
		<van-popup :show="show" position="bottom">
			<van-picker
			:columns="columns"
			@cancel="onCancel"
			@confirm="onConfirm" 
			@change="onChange" 
			show-toolbar 
			title="选择关系"/>
			<van-datetime-picker
			  type="datetime"
			  :show-toolbar="false"
			  v-if="expFlag"
			  :value="currentDate"
			  :min-date="minDate"
			  :max-date="maxDate"
			  @input="onInput"
			/>
		</van-popup>
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/toast/toast';
	export default{
		data(){
			return{
				name:"",
				reason:"",
				numberCode:null,
				imgUrl:null,
				columns:[],
				show:false,
				// 时间选择器参数
				minHour: 10,
				maxHour: 20,
				minDate: new Date().getTime(),
				maxDate: new Date(2021, 10, 1).getTime(),
				currentDate: new Date().getTime(),
				// 关联用户有效期
				relaUser:"本人",
				faceExp:"",
				expFlag:false //人脸选择有效期开关
			}
		},
		onLoad(option) {
			this.imgUrl = option.imgurl
			this.$api.hsbindApi.peopleTypeReq({}).then(res=>{
				console.log(res)
				this.columns = res.data.map((v,i)=>{
					return {"text":v.categrayName,"flagEndTime":v.flagEndTime,"value":v.value}
				})
			})
		},
		methods:{
			goSubmit(){				
				this.$api.hsbindApi.addReq({
					"identity":this.numberCode,
					"image":this.imgUrl,
					"memberName":this.name,
					"reason":this.reason
				}).then(res=>{
					if(res.code == 100000){
						// 成功
						uni.navigateTo({
							url:"../housebind/successInfo"
						})
					}else{
						Toast.fail(res.message);
					}
				})
			},
			onChange(event){
				console.log(event.detail.value.flagEndTime)
				this.relaUser = event.detail.value.text
				if(event.detail.value.flagEndTime){
					this.expFlag = true
				}else{
					this.expFlag = false
				}
			},
			binduser(){
				this.show = true
			},
			onInput(event) {
			    console.log("currentDate",event.detail)
				this.faceExp = this.formatDate(new Date(event.detail))
				console.log(this.faceExp)
			},
			formatDate(now) { 
				let year=now.getFullYear();  //取得4位数的年份
				let month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
				let date=now.getDate();      //返回日期月份中的天数（1到31）
				let hour=now.getHours();     //返回日期中的小时数（0到23）
				let minute=now.getMinutes(); //返回日期中的分钟数（0到59）
				let second=now.getSeconds(); //返回日期中的秒数（0到59）
				return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
			},
			onConfirm(){
				this.show = false
			},
			onCancel(){
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.indentify{
		width: 100%;
		input{
			width:80%;
			margin: 0 auto;
			border: 1px solid #ddd;
			height: 100rpx;
			line-height:100rpx;
			outline: none;
			padding-left:34rpx;
			border-radius:50rpx;
			margin-bottom:30rpx;
		}
		input.number{
			margin-top:50rpx;
		}
		textarea{
			width:80%;
			margin: 0 auto;
			height:300rpx;
			margin-bottom:50rpx;
			border: 1px solid #ddd;
			padding-left:34rpx;
			border-radius:10rpx;
		}
		.button_box{
			width: 80%;
			margin: 0 auto;
		}
		& >text{
			display: block;
			text-align: center;
			margin-top:100rpx;
		}
		.expTime{
			margin-top:50rpx;
		}
	}
</style>
