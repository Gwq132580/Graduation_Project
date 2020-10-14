<template>
	<view>
		<Commodity :commodityList='hotList' itemWidth='250rpx' imgHeight='220rpx'></Commodity>
	</view>
</template>

<script>
	import Commodity from '../common/Commodity.vue'
	export default {
		props:{
			hotList:Array
		},
		components:{
			Commodity
		}
	}
</script>

<style>

</style>
