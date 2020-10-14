<template>
	<view class='my-config'>
		
		<view class='config-item' @tap='goPathList'>
			<view style="font-size: 34rpx;">地址管理</view>
			<view class='config-mark'> > </view>
		</view>
		
		<view class='my-exit' @tap="exit">退出登录</view>
		
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['exitLogin']),
			goPathList(){
				uni.navigateTo({
					url:'../my-path-list/my-path-list'
				})
			},
			exit(){
				uni.showToast({
					title:'退出成功',
					icon:'none'
				})
				this.exitLogin();
				uni.reLaunch({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style scoped>
.config-item{
	display: flex;
	justify-content: space-between;
	padding:20rpx 0 20rpx 20rpx;
	border-bottom: 2rpx solid #CCCCCC;
}
.config-mark{
	padding-right:10rpx;
}
.my-exit{
	background: linear-gradient(to right,#9fa5d5,#e8f5c8);
	width:100%;
	line-height: 100rpx;
	color:#FFFFFF;
	text-align: center;
	font-size: 34rpx;
}
</style>
