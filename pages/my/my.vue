<template>
	<view class='my'>
		<!--头部-->
		<view class='my-header'>
			<view class='header-main'>
				<view class='header-config' @tap='goConfig'>
					<image class='config-img' src="../../static/img/config.png" mode=""></image>
				</view>
				<view class='header-logo' >
					<image class='logo-img' :src="loginStatus?userInfo.imgUrl:'../../static/img/girl.jpg'" mode=""></image>
					<view class='logo-name'>{{loginStatus?userInfo.nickName:'用户昵称'}}</view>
				</view>
			</view>
		</view>
		<!--我的订单-->
		<view class='order'>
			<view class='order-title' @tap="goOrder">
				<view style="font-size: 36rpx;">我的订单</view>
				<view style="font-size: 36rpx;">全部订单 > </view>
			</view>
			<!-- <view class='order-list'>
				<view class='order-item'>
					<image  class='order-img' src="../../static/img/order1.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image  class='order-img' src="../../static/img/order2.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image  class='order-img' src="../../static/img/order3.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image  class='order-img' src="../../static/img/order4.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image  class='order-img' src="../../static/img/order5.png" mode=""></image>
					<view>待付款</view>
				</view>
			</view> -->
		</view>
		<!--内容列表-->
		<!-- <view class='my-content'>
			
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			
		</view> -->
		<Tabbar cureentPage='my'></Tabbar>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import Tabbar from '../../components/common/Tabbar.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			Tabbar
		},
		computed:{
			...mapState({
				loginStatus:state=>state.user.loginStatus,
				userInfo:state=>state.user.userInfo
			})
		},
		methods: {
			goConfig(){
				uni.navigateTo({
					url:'../my-config/my-config'
				})
			},
			goOrder(){
				uni.navigateTo({
					url:'../my-order/my-order'
				})
			},
		}
	}
</script>

<style scoped>
.my-header{
	/* background: url(../../static/img/mybg.png) no-repeat;*/
	background: linear-gradient(to right,#c973ff,#aebaf8);
	width: 100%;
	height: 400rpx;
}
.header-main{
	position: relative;
	top:120rpx;
}
.header-config{
	position: absolute;
	left:20rpx;
}
.header-logo{
	text-align: center;
}
.config-img{
	width: 60rpx;
	height: 60rpx;
}
.logo-img{
	width: 120rpx;
	height: 120rpx;
	box-shadow: 0 0 10px #ddd;
	border:10rpx solid #fff;
	border-radius: 50%;
	background-color: #FFFFFF;
}
.logo-name{
	font-weight: bold;
	color:#000;
	font-size: 36rpx;
}
.order-title{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
}
.order-list{
	padding: 20rpx;
	display: flex;
}
.order-item{
	flex:1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.order-img{
	width:66rpx;
	height: 66rpx;
}
.my-content{
	margin:20rpx 0;
	padding:0 20rpx;
}
.my-content-item{
	display: flex;
	justify-content: space-between;
	align-items:center;
	padding:20rpx 0; 
	border-bottom: 2px solid #CCCCCC;
}
</style>
