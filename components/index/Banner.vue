<template>
	<view class="banner">
		<image class="banner-image" :src="bannerList" mode=""></image>
	</view>
	<!-- <image src="../../static/img/banner1.jpg" mode=""></image> -->
</template>

<script>
	export default {
		props:{
			bannerList:String
		}
	}
</script>

<style scoped>
	.banner{
		width: 100%;
		height: 400rpx;
	}
	.banner-image{
		width: 100%;
		height: 400rpx;
	}
</style>
