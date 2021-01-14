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
			<radio-group>
				<label for="">
					<view class="pay-item">
						<image class='pay-img' src='../../static/img/zfb.png' mode=""></image>
						<view style="width: 250rpx;">
							<view style="font-size: 32rpx;">支付宝支付</view>
							<view class='pay-txt' style="font-size: 28rpx;">推荐支付宝用户使用</view>
						</view>
						<label class="radio">
							<radio value="" :checked="flag===true" color='#FF3333' @click="selectPay"/><text></text>
						</label>
					</view>
				</label>
				<!-- <label for="">
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
				</label> -->
			</radio-group>
			
			
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
	import $http from '@/common/api/request.js'
	import uniNavBar from '@/components/uni/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				totalPrice:'',
				data:'',
				flag:true,
				customer:'',
				path:''
			}
		},
		components:{
			uniNavBar
		},
		onLoad(e){
			let {total,data,path,customer}=e
			this.totalPrice=total
			this.data=data
			this.customer=customer
			this.path=path
		},
		methods: {
			selectPay(){
				this.flag=!this.flag
				console.log(this.flag)
			},
			//点击关闭返回上一页
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			goPay(){
				if(!this.flag){
					return uni.showToast({
						title:'请选择支付方式', 
						icon:'none'
					})
				}
				$http.request({
					url:'/pay',
					method:'POST',
					data:{
						phone:this.userName,
						data:this.data,
						customer:this.customer,
						path:this.path
					}
				}).then((res)=>{
					if(res.success===1)
						uni.showToast({
							title:'支付成功', 
							icon:'none',
							duration: 3000
						})
				}).catch(()=>{
					uni.showToast({
						title:'支付失败', 
						icon:'none'
					})
				}),
				uni.requestPayment({
				        provider: 'alipay',
				        orderInfo:'app_id=2016102700771848&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%22%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.02%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22314VYGIAGG7ZOYY%22%7D&charset=utf-8&method=alipay.trade.app.pay&sign_type=RSA2&timestamp=2020-11-08%2012%3A12%3A15&version=1.0&sign=MsbylYkCzlfYLy9PeRwUUIg9nZPeN9SfXPNavUCroGKR5Kqvx0nEnd3eRmKxJuthNUx4ERCXe552EV9PfwexqW%2B1wbKOdYtDIb4%2B7PL3Pc94RZL0zKaWcaY3tSL89%2FuAVUsQuFqEJdhIukuKygrXucvejOUgTCfoUdwTi7z%2BZzQ%3D',
				        success: function(res) {
				            console.log('success:' + JSON.stringify(res));
				        },
				        fail: function(err) {
				            console.log('fail:' + JSON.stringify(err));
				        }
				    });
				// uni.navigateTo({
				// 	url:`../payment-success/payment-success?data=${this.data}&sum=${this.totalPrice}`
				// })
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
