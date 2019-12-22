<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		// setTimeout(() => {
		// 	uni.setTabBarBadge({
		// 		index: 1,
		// 		text: '31'
		// 	});
		// 	uni.showTabBarRedDot({
		// 		index: 3
		// 	});
		// }, 1000);
		uni.login({
		  provider: 'weixin',
		  success: function (loginRes) {
		    console.log('登录信息',loginRes);
		  }
		});
	},
	onShow: function() {
		console.log('App Show');
	}
};
</script>

<style>
/*每个页面公共css */ 
</style>
