<template>
	<view class="shop-list">
		<view class="shop-title">
			<view class="shop-item" v-for="(item,index) in shopList.data" :key="index" @tap="changeTab(index)">
				<view  class="f-color " :class="shopList.currentIndex===index?'f-active-color ':'' ">{{item.name}}</view>
				<view class="shop-icon f-color">
					<view class="iconfont icon-shangjiantou up" :class="item.status===1?'f-active-color ':''">
					</view>
					<view class="iconfont icon-xiajiantou down" :class="item.status===2?'f-active-color ':''">
					</view>
				</view>
			</view>
		</view>
		<Lines></Lines>
		<CommodityList  :commodityList='commodityList'></CommodityList>
	</view>
</template>

<script>
	import Lines from './Lines.vue'
	import CommodityList from './CommodityList.vue'
	import $http from '../../common/api/request.js'
	export default {
		props:{
			keys:String
		},
		data() {
			return {
				keyword:'',
				shopList:{
					currentIndex:0,
					data:[
						{name:'价格',status:1,key:'cprice'},
						{name:'折扣',status:0,key:'discount'},
						{name:'品牌',static:0}
					]
				},
				commodityList:[
					
				]
			}
		},
		computed:{
			orderBy(){
				let obj=this.shopList.data[this.shopList.currentIndex];
				let val=obj.status==1?"desc":"asc";
				return{
					[obj.key]:val
				}
			}
		},
		mounted(){
			this.getData()
		},
		methods: {
			changeTab(index){
				this.getData()
				let idx=this.shopList.currentIndex;
				let item=this.shopList.data[idx];
				if(idx==index)
					return item.status=item.status===1?2:1;
				let newItem=this.shopList.data[index];
				item.status=0;
				this.shopList.currentIndex=index;
				newItem.status=1;
			},
			getData(){
				$http.request({
						url:`/goods/search`,
						data:{
							name:this.keys,
							...this.orderBy
						}
					}).then((res)=>{
						this.commodityList=res;
					}).catch(()=>{
						uni.showToast({
							title:'请求失败',  
							icon:'none'
						})
				})
			}
		},
		onLoad(e){
			this.keyword=e.keyword;
		},
		components:{
			Lines,
			CommodityList
		}
	}
</script>

<style>
.shop-title{
	display: flex;
}
.shop-item{
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80rpx;
}
.iconfont{
	position: absolute;
	width: 16rpx;
	height: 8rpx;
	left: 0;
}
.shop-icon{
	position: relative;
	margin-left: 10rpx;
}
.up{
	top: -34rpx;
}
.down{
	top:-24rpx
}
</style>
