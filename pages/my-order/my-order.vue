<template>
	<view class='my-order bg-active-color'>
		<Lines></Lines>
		<view class='order-header'>
			<view 
				class='header-item'
				v-for='(item,index) in tabList'
				:key='index'
				:class=' tabIndex==index?"active":""  '
				@tap='changeTab(index)'
			>{{item.name}}</view>
		</view>
		
		<block
			v-for='(tabItem,tabI) in tabList'
			:key='tabI'
		>
			<view v-show='tabI===tabIndex'>
				<view v-if='tabItem.list.length > 0' class='order-main' :style="'height:'+clentHeight+'px;'">
					<!--商品-->
					<view v-for='(k,i) in tabItem.list' :key='i'>
						<view class='order-goods'>
							<view class='goods-status f-active-color'>{{ k.status }}</view>
							<view class='goods-item' v-for='(item,index) in k.goods_item' :key='index'>
								<OrderList :item='item' :index='index'></OrderList>
							</view>
						</view>
						<Lines></Lines>
						<!--总价-->
						<view class='total-price'>
							订单金额 : <text class='f-active-color' style="color: #EC602A;display: inline-block;margin-left: 10rpx;">¥{{k.totalPrice}}&emsp;</text><text style="display: inline-block;margin-left: 10rpx;">(不含运费)</text> 
						</view>
						<Lines></Lines>
						<!--支付-->
						<view class='payment'>
							<view class='payment-text f-active-color'>支付</view>
						</view>
					</view>
				</view>
				
				<view v-else class='no-order' :style="'height:'+clentHeight+'px;'">
					<view style="font-size: 38rpx;">您还没有相关订单~</view>
					<view class='no-order-home' @tap="goHome">去首页逛逛</view>
				</view>
				
			</view>
		</block>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	import OrderList from '@/components/order/order-list.vue'
	export default {
		data() {
			return {
				//高度
				clentHeight:0,
				//当前位置
				tabIndex:0,
				//顶部选项卡的数据
				tabList:[
					{
						name:"全部",
						list:[
							{
								status:"待付款",
								totalPrice:'3999.00',
								goods_item:[
									
									{
										imgUrl:"../../static/img/Children3.jpg",
										name:"大姨绒毛大款2020年",
										attrs:"黑色",
										pprice:"299.00",
										num:"5"
									}
								]
							}
						]
					},
					{
						name:"待付款",
						list:[]
					},
					{
						name:"待发货",
						list:[]
					},
					{
						name:"待收货",
						list:[]
					},
					{
						name:"待评价",
						list:[]
					},
				]
			}
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
			changeTab(index){
				this.tabIndex = index;
			},
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
			}
		}
	}
</script>

<style scoped>
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
