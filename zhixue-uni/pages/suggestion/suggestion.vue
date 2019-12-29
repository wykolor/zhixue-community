<template>
	<view class="suggestion">
		<van-field label="意见建议:" type="textarea"  autosize :border="false" placeholder="请输入您的宝贵意见" :maxlength="100"  left-icon="edit"  @change="inputHandle"></van-field>
		<view class="text-len">{{textLen}}/100</view>
		<view class="submit-btn">
			<van-button custom-class="btn-self" type="primary" round size="small" @click="submitValue">提交反馈</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textLen:0,
				value:null
			};
		},
		methods:{
			inputHandle(value){
				let len = value.detail.length;
				this.textLen = len;
				this.value = value.detail;
			},
			submitValue(){
				console.log(this.value);
				this.$api.suggestionApi.esAdviceReq({
					content:this.value
				}).then(res => {
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.suggestion{
	@include init-style;
	.text-len{
		width: 100%;
		@include  border-box;
		padding: 10px 16px;
		font-size: 12px;
		color: #666;
		text-align: right;
	}
	.submit-btn{
		width: 100%;
		@include  border-box;
		padding:1rem;
		text-align: center;
		& /deep/ .van-button{
			width: 10rem !important;
		}
	}
}
</style>
