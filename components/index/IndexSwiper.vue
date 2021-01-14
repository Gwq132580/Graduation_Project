<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<view class="swiper-item" >
					<image class="swiper-img" :src="item.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			swiperList:Array
		},
		methods:{
		// 	goDetail(index){
		// 		if(index===0)
		// 			uni.navigateTo({
		// 				url:'../../pages/detail/detail?id=3'
		// 			})
		// 		else if(index===1)
		// 			uni.navigateTo({
		// 				url:'../../pages/detail/detail?id=5'
		// 			})
		// 		else if(index===3)
		// 			uni.navigateTo({
		// 				url:'../../pages/detail/detail?id=2'
		// 			})
		// 		else
		// 			uni.navigateTo({
		// 				url:'../../pages/detail/detail?id=6'})
		// 		}	
		}
	}
</script>

<style scoped>
	.swiper-img{
		width: 100%;
		/* 有坑,高度要用rpx */
		height: 400rpx;
	}
	swiper{
		/* swiper默认高度150px */
		width: 100%;
		height: 400rpx;
	}
</style>
