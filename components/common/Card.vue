<template>
	<view class="card">
		<view>
			-
		</view>
		<view class="card-name">
			{{cardTitle}}
		</view>
		<view>
			-
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			cardTitle:String
		}
	}
</script>

<style>
	.card{
		display: flex;
		justify-content: center;
		padding: 20rpx 0;
	}
	.card-name{
		padding: 0 20rpx;
	}
</style>
