<template>
	<view class="shop">
		<view class="shop-item" v-for="(item,index) in shopList" :key="index">
			<view class="shop-big">
				<image class="shop-big" :src="item.bigUrl"></image>
			</view>
			<scroll-view scroll-x="true" class="scroll-content" >
				<view class="scroll-item">
					<Commodity :commodityList="item.data" itemWidth='200rpx' imgHeight='200rpx' wrap='no-wrap' ></Commodity> 
				</view> 
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Commodity from '../common/Commodity.vue'
	export default {
		props:{
			shopList:Array
		},
		components:{
			Commodity
		}
	}
</script>

<style>
.shop-big{
	width: 100%;
	height: 350rpx;
}
.scroll-content{
	width: 100%;
	white-space: nowrap;
}
.scroll-item{
	display: inline-block;
}
</style>
