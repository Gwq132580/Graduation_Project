<template>
	<view class="icons">
		<view class="icon-item" v-for="(item,index) in iconsList" :key="index">
			<image  :src="item.imgUrl" mode=""></image>
			<text class="f-color">{{item.name}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			iconsList:Array
		}
	}
</script>

<style scoped>
.icons{
	display: flex;
	flex-wrap: wrap;
}
.icon-item{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 20rpx;
	width: 25%;
}
.icon-item image{
	width: 110rpx;
	height: 110rpx;
}
</style>
