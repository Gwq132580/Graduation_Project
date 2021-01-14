<template>
	<view class="commodity" :style="'flex-wrap: '+ wrap+';'">
		<view class="commodity-item" :style="'width:'+ itemWidth+';'" v-for="item in commodityList" :key="item.id" @tap="goDetail(item.id)">
			<image class="commodity-img" :style="'height:'+imgHeight+';'" :src="item.imgUrl" mode=""></image>
			<view class="commodity-content">
				<text class="commodity-name">
					{{item.name}}
				</text>
				<view>
					<text class="cprice">￥{{item.cprice}}</text>
					<text class="pprice">￥{{item.pprice}}</text>
				</view>
				<text class="discount">{{item.discount}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goDetail(id){
				uni.navigateTo({
					url:'../../pages/detail/detail?id='+id+''
				})
			}
		},
		props:{
			commodityList:Array,
			itemWidth:{
				default:'375rpx',
				type:String
			},
			imgHeight:{
				default:'375rpx',
				type:String
			},
			wrap:{
				default:'wrap',
				type:String,
			}
		}
	}
</script>

<style scoped>
.commodity{
	display: flex;
}
.commodity-item{
	padding-bottom:20rpx;
}
.commodity-img{
	width: 100%;
}
.commodity-content{
	text-align: center;
}
.commodity-name{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp:2;
	-webkit-box-orient:vertical;
	color: #333;
	word-break: break-all;
	padding: 6rpx 20rpx;
	height: 90rpx;
}
.pprice{
	text-decoration: line-through;
	font-size: 24rpx;
	color: #999;
}
.discount{
	border-radius: 4rpx;
	border: 1px solid red;
	padding: 2rpx 10rpx;
	font-size: 20rpx;
	color: red;
}
</style>
