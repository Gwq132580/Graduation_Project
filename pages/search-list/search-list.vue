<template>
	<view>
		<ShopList :keys='keyword'></ShopList>
	</view>
</template>

<script>
	import ShopList from '@/components/common/ShopList.vue'
	export default {
		data() {
			return {
				keyword:'',
			}
		},
		onLoad(e){
			this.keyword=e.keys;
			// #ifdef APP-PLUS  
			var webView = this.$mp.page.$getAppWebview();  
			// 设置 searchInput的 text  
			webView.setTitleNViewSearchInputText(e.keys)  
			// #endif
		},
		components:{
			ShopList
		}
	}
</script>

<style>
</style>
