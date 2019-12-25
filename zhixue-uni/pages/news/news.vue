<template>
	<view class="news">
		<van-tabs :active="active" sticky animated swipeable :line-width="15" :z-index="99" color="#07c160">
		  <van-tab :title="item.title" v-for="item in allList" :key="item.id">
			 <van-cell-group>
				<van-cell custom-class="news-cell" :title="value.title" :value="value.time" :label="value.info" v-for="value in item.list" :key="value.id">
					<van-icon slot="icon" :name="item.icon" color="#07c160" size="1.4rem" custom-style="margin-right:5px;" />
				</van-cell>
			 </van-cell-group> 
		  </van-tab>
		</van-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				allList:[
					{
						title:"消息",
						icon:"chat",
						list:[]
					},
					{
						title:"通知",
						icon:"bell",
						list:[]
						
					}
				],
				newsList:[
					{
						title:"物业管理",
						info:"您本月水电费账单已生成",
						time:"12-22 09:00"
					},
					{
						title:"物业管理",
						info:"您本月水电费账单已生成",
						time:"12-22 09:00"
					},
					{
						title:"物业管理",
						info:"您本月水电费账单已生成",
						time:"12-22 09:00"
					},
					{
						title:"物业管理",
						info:"您本月水电费账单已生成",
						time:"12-22 09:00"
					},
					{
						title:"物业管理",
						info:"您本月水电费账单已生成",
						time:"12-22 09:00"
					},
					{
						title:"物业管理",
						info:"您本月水电费账单已生成",
						time:"12-22 09:00"
					},
					{
						title:"物业管理",
						info:"您本月水电费账单已生成",
						time:"12-22 09:00"
					},
					{
						title:"物业管理",
						info:"您本月水电费账单已生成",
						time:"12-22 09:00"
					},
					{
						title:"物业管理",
						info:"您本月水电费账单已生成",
						time:"12-22 09:00"
					},
					{
						title:"物业管理",
						info:"您本月水电费账单已生成",
						time:"12-22 09:00"
					},
				],
				noticeList:[
					{
						title:"紧急通知",
						info:"今晚小区8点会停电1小时，敬请原谅",
						time:"12-21 19:00"
					},
					{
						title:"紧急通知",
						info:"今晚小区8点会停电1小时，敬请原谅",
						time:"12-21 19:00"
					},
					{
						title:"紧急通知",
						info:"今晚小区8点会停电1小时，敬请原谅",
						time:"12-21 19:00"
					},
					{
						title:"紧急通知",
						info:"今晚小区8点会停电1小时，敬请原谅",
						time:"12-21 19:00"
					},
					{
						title:"紧急通知",
						info:"今晚小区8点会停电1小时，敬请原谅",
						time:"12-21 19:00"
					},
					{
						title:"紧急通知",
						info:"今晚小区8点会停电1小时，敬请原谅",
						time:"12-21 19:00"
					},
					{
						title:"紧急通知",
						info:"今晚小区8点会停电1小时，敬请原谅",
						time:"12-21 19:00"
					},
					{
						title:"紧急通知",
						info:"今晚小区8点会停电1小时，敬请原谅",
						time:"12-21 19:00"
					},
					{
						title:"紧急通知",
						info:"今晚小区8点会停电1小时，敬请原谅",
						time:"12-21 19:00"
					},
					{
						title:"紧急通知",
						info:"今晚小区8点会停电1小时，敬请原谅",
						time:"12-21 19:00"
					},
				]
			};
		},
		onLoad(){
			this.allList[0].list = this.newsList;
			this.allList[1].list = this.noticeList;
		},
		
	}
</script>

<style lang="scss" scoped>
.news{
	@include init-style;
	.news-cell{
	}
}
</style>
