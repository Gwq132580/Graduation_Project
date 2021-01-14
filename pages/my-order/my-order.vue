<template>
	<view class='my-order bg-active-color'>
		<Lines></Lines>
				<template v-if="tabList.length>0">
				<view class="address">收货地址: {{address}}</view>
					<view  v-for="(item,index) in tabList " class="order-item" :key="index">
						<text class="order-id">订单编号: {{item.id}}</text>
						<text class="order-total">￥{{item.total}}</text>
						<view class="order-status">状态: {{item.pay?'已付款':'未付款'}}</view>
						<view class="order-time">下单时间: {{new Date(Number(item.date)).toLocaleString()}}</view>
						
					</view>
				</template>
				<view v-else class='no-order' :style="'height:'+clentHeight+'px;'">
					<view style="font-size: 38rpx;">您还没有相关订单~</view>
					<view class='no-order-home' @tap="goHome">去首页逛逛</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from '@/components/common/Lines.vue'
	import OrderList from '@/components/order/order-list.vue'
	export default {
		data() {
			return {
				//高度
				clentHeight:0,
				//当前位置
				// tabIndex:0,
				//顶部选项卡的数据
				tabList:[
				],
				address:''
			}
		},
		onLoad(){
			this.getData()
			// this.getAddress()
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - this.getClientHeight();
				}
			})
			
		},
		components:{
			Lines,
			OrderList
		},
		methods: {
			//顶部切换
			// changeTab(index){
			// 	this.tabIndex = index;
			// },
			//获取可视区域高度【兼容】
			getClientHeight(){
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if( system ==='ios' ){
					return 44+res.statusBarHeight;
				}else if( system==='android' ){
					return 48+res.statusBarHeight;
				}else{
					return 0;
				}
			},
			goHome(){
				uni.reLaunch({
					url:'../index/index'
				})
			},
			getData(){
				$http.request({
					url:`/selectOrder?id=${uni.getStorageSync('id')}`,
				}).then((res)=>{
					this.tabList=res;
					this.address=res[0].path;
				}).catch(()=>{
					uni.showToast({
						title:'没有更多数据了', 
						icon:'none'
					})
				})
			},
			// getAddress(){
			// 	$http.request({
			// 		url:`/selectAddress`,
			// 		method:'POST',
			// 		header:{
			// 			token:true
			// 		}
			// 	}).then((res)=>{
			// 		this.address=res[0]
			// 	}).catch(()=>{
			// 		uni.showToast({
			// 			title:'没有更多数据了', 
			// 			icon:'none'
			// 		})
			// 	})
			// }
		}
	}
</script>

<style scoped>
.order-time{
	font-size: 34rpx;
}
.order-status{
	font-size: 34rpx;
}
.order-id{
	font-size: 34rpx;
}
.order-total{
	font-size: 34rpx;
	padding-left: 400rpx;
	color: #EC602A;
}
.address{
	font-size: 34rpx;
	color: #007AFF;
}
.my-order{
	padding: 0 10rpx 20rpx;
}
.order-item{
	background-color: #ccc;
	border-radius: 10rpx;
}
.order-item+.order-item{
	margin-top: 40rpx;
}
.goods-item{
	margin-top: -10rpx;
}
.no-order{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
}
.no-order-home{
	padding:6rpx 60rpx;
	background: linear-gradient(to right,#EF8D34,#EC602A); 	
	color:#fff;
	border-radius: 40rpx;
	font-size: 38rpx;
}
.order-header{
	background-color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom:2rpx solid #F7F7F7;
}
.header-item{
	text-align: center;
	flex: 1;
	line-height: 120rpx;
	font-size: 32rpx;
}
.active{
	border-bottom: 4rpx solid hotpink;
	color: hotpink;
}

.goods-status{
	display: flex;
	justify-content: flex-end;
	background-color: #FFFFFF;
	color: purple;
	padding: 10rpx 20rpx 0 0;
	font-size: 30rpx;
}

.total-price{
	display: flex;
	justify-content: flex-end;
	background-color: #FFFFFF;
	padding:20rpx;
	font-size: 30rpx;
}
.payment{
	display: flex;
	justify-content: flex-end;
	background-color: #FFFFFF;
	padding:20rpx;
}
.payment-text{
	padding:14rpx 60rpx;
	border-radius: 30rpx;
	color: #fff;
	background: linear-gradient(to right,#EF8D34,#EC602A);
}
</style>
