<script>
import uniLogin from "./utils/login.js";
export default {
	onLaunch: function() {
		uniLogin();
	},
	onShow: function() {
		console.log('App Show');
	}
};
</script>

<style>
/*每个页面公共css */ 
</style>
