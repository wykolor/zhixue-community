<template>
	<view id="face_box">
		<view class="content">
			<view class="up_face" v-for="v in 4">
				<image src="../../static/img/index/u62.jpg"></image>
				<text>张三</text>
				<text>状态：审核中</text>
			</view>
		</view>
		<view class="uploader">
			<van-uploader :file-list="fileList" bind:after-read="afterRead" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: []
			}
		},
		methods: {
			afterRead(event) {
				const {
					file
				} = event.detail;
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				wx.uploadFile({
					url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
					filePath: file.path,
					name: 'file',
					formData: {
						user: 'test'
					},
					success(res) {
						// 上传完成需要更新 fileList
						const {
							fileList = []
						} = this.data;
						fileList.push({ ...file,
							url: res.data
						});
						this.setData({
							fileList
						});
					}
				});
			}
		}
	}
</script>
<style>
	#face_box .van-uploader__upload{
		border: 1px solid #ebedf0 !important;
		border-radius: 40px !important;
	}
</style>
<style scoped lang="scss">
	
	#face_box {
		width: 100%;
		font-size:1rem;
		.content {
			width: 90%;
			margin: 0 auto;
			padding:2% 0;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.up_face {
				width: 29%;
				display: inline-block;
				image {
					width: 100%;
					height: 8rem;
				}

				text {
					display: block;
					text-align: center;
				}
			}
		}
		.uploader{
			position: absolute;
			bottom:1rem;
			right: 1rem;
		}
	}
</style>
