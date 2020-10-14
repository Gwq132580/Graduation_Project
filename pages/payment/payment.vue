<template>
	<view>
		<!--自定义导航栏-->
		<uniNavBar 
			title='确认支付' 
			left-text='关闭' 
			fixed='true'
			status-bar='true'
			@clickLeft='goBack'
		></uniNavBar>
		
		<view class='pay-main'>
			<label for="">
				<view class="pay-item">
					<image class='pay-img' src='../../static/img/zfb.png' mode=""></image>
					<view style="width: 250rpx;">
						<view style="font-size: 32rpx;">支付宝支付</view>
						<view class='pay-txt' style="font-size: 28rpx;">推荐支付宝用户使用</view>
					</view>
					<label class="radio">
						<radio value="" color='#FF3333'/><text></text>
					</label>
				</view>
			</label>
			<label for="">
				<view class="pay-item">
					<image class='pay-img' src="../../static/img/wxf.png" mode=""></image>
					<view style="width: 250rpx;">
						<view style="font-size: 32rpx;">微信支付</view>
						<view class='pay-txt' style="font-size: 28rpx;">推荐微信用户使用</view>
					</view>
					<label class="radio">
						<radio value="" color='#FF3333'/><text></text>
					</label>
				</view>
			</label>
		</view>
		<!--去支付-->
		<view class='pay-foot'>
			<view class='total'>
				<text class="f-color">合计:</text>
				<text class='total-price'>¥ {{totalPrice}}</text>
			</view>
			<view class="go-pay" @tap="goPay">去支付</view>
		</view>
		<view class="order-bottom">
			
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				totalPrice:''
			}
		},
		components:{
			uniNavBar
		},
		onLoad(e){
			this.totalPrice=e.total
		},
		methods: {
			//点击关闭返回上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			goPay(){
				uni.navigateTo({
					url:'../payment-success/payment-success'
				})
			}
		}
	}
</script>

<style scoped>
.pay-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:20rpx;
	border-bottom: 2rpx solid #CCCCCC;
}
.pay-img{
	width: 100rpx;
	height: 100rpx;
}
.pay-txt{
	color:#CCCCCC;
}
.pay-foot{
	width:100%;
	position: fixed;
	left:0;
	bottom:80rpx;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.total{
	padding-left:100rpx;
	flex:1;
	background-color:#000000;
	line-height: 100rpx;
	font-size: 36rpx;
}
.go-pay{
	color:#FFFFFF;
	background-color: #49BDFB;
	line-height: 100rpx;
	text-align: center;
	width:220rpx;
	font-size: 36rpx;
}
.total-price{
	color:#EC602A;
}
.order-bottom{
	position: fixed;
	bottom: 0rpx;
	left: 0;
	width: 100%;
	height: 80rpx;
	background: linear-gradient(to right,#0c7bb3,#f2bae8);
}
</style>
