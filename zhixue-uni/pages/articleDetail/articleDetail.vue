<template>
	<view class="article-detail">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(option){
			const { id } = option;
			console.log(id)
			this.getDetail(id);
		},
		methods: {
			getDetail(id){
				this.$api.articleDetailApi.esArticleDetailReq({id:id}).then(res => {
					
				})
			}
		}
	}
</script>

<style>

</style>
