<template>
	<view class="recommend bg-color" @tap="goDetail(1)">
		<view class="recommend-item" v-for="(item,index) in recommendList" :key="index">
			<image class="item-big" :src="item.bigUrl" mode=""></image>
			<view class="item-small">
				<block v-for="(k,i) in item.data" :key="i">
					<image :src="k.imgUrl" mode=""></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			recommendList:Array
		},
		methods:{
			goDetail(id){
				uni.navigateTo({
					url:'../../pages/detail/detail?id='+id+''
				})
			}
		}
		
	}
</script>

<style scoped>
	.recommend{
		padding: 20rpx;
	}
	.recommend-item{
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		border: 2rpx solid #ccc;
		margin: 20rpx 0;
		overflow: hidden;
	}
	.item-big{
		width: 100%;
		height: 300rpx;
	}
	.item-small{
		width: 100%;
		height: 240rpx;
	}
	.item-small image{
		width: 33.3333%;
		height: 240rpx;
	}
</style>
