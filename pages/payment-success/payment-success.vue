<template>
	<view class='payment-success'>
		<view class='f-active-color' style='font-size:52rpx;'>支付成功</view>
		<view @tap='goIndex' class="return-index f-active-color">返回首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goIndex(){
				uni.reLaunch({
					url:"../index/index"
				})
			},
		}
	}
</script>

<style scoped>
.payment-success{
	position: absolute;
	left:0;
	right:0;
	bottom:0;
	top:0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.return-index{
	padding:14rpx 60rpx;
	border-radius: 40rpx;
	background: linear-gradient(to right,#EF8D34,#EC602A);
	color: #fff;
	font-size: 34rpx;
}
</style>
