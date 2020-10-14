<template>
	<view>
		<Commodity :commodityList='commodityList'></Commodity>
	</view>
</template>

<script>
	import Commodity from './Commodity.vue'
	export default {
		props:{
			commodityList:Array
		},
		components:{
			Commodity
		}
	}
</script>

<style>

</style>
