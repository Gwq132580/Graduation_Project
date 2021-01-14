<template>
	<view class='goods-content bg-active-color'>
		<view class="goods-item" v-for="(i,index) in item" :key="index">
			<image class='goods-img' :src="i.imgUrl" mode=""></image>
			<view style="padding-left: 50rpx;">
				<view class='goods-text'>
					<view class='goods-name'>{{i.name}}</view>
					<view class='f-active-color' style='font-size:28rpx'>保障: 7天无理由退换</view>
				</view>
				<view>
					<view style="color: #EF8D34;padding:10rpx 10rpx;">¥{{i.cprice}}</view>
					<view class='num'>× {{i.num}}</view>
				</view>
			</view>
			<view style="position: absolute;top: 10rpx;color: #2B2C3A;">收货地址: {{address.province}} {{address.city}} {{address.district}} {{address.address}}</view>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		item:Array,
		index:Number,
		address:Object
	},
	
}
</script>

<style scoped>
.goods-content{
	padding:10rpx 20rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.goods-item{
	padding-top: 60rpx;
	display: flex;
	position: relative;
}
.goods-text{
	width:360rpx; 
	padding:0 10rpx;
	font-size:28rpx;
}
.goods-img{
	width:250rpx;
	height:250rpx;
}
.goods-name{
	font-size:30rpx;
	font-weight: 700;
	margin-bottom: 25rpx;
}
.goods-size{
	font-size:28rpx;
}
.num{
	color: red;
	font-size: 30rpx;
	padding: 0 10rpx;
}
</style>
