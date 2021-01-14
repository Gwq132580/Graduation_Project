<template>
	<view class='my-path-list'>
		
		<view class='path-list'>
			<view v-for="(item,index) in list" :key="index" @tap='toAddPath(index)'> 
				<view class='path-item' @tap="goConfirmOrder(item)">
					<view class='item-main'>
						<view class='item-name'>{{item?item.name:''}}</view>
						<view style="font-size: 34rpx;">{{item.tel}}</view>
					</view>
					<view class='item-main'>
						<view style="width: 120rpx;">
							<view class='active' v-if="item.isDefault==1">默认</view>
						</view>
						<view style="font-size: 30rpx;">{{item.province}} {{item.city}} {{item.district}} {{item.address}}</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class='add-path'>
			<view class='add-path-btn' @tap='goAddPath'>新增地址</view>
		</view>
		
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				isSelectPath:false
			}
		},
		onLoad(e) {
			if(e.type==='selectPath')
				this.isSelectPath=true;
			this._initAddress()
		},
		computed:{
			...mapState({
				list:state=>state.path.list
			})
		},
		methods: {
			...mapMutations(['_initAddressList']),
			_initAddress(){
				$http.request({
					url:'/selectAddress',
					method:'POST',
					header:{
						token:true
					}
				}).then((res)=>{
					this._initAddressList(res)
				}).catch(()=>{
					uni.showToast({
						title:'没有更多数据了', 
						icon:'none'
					})
				})
			},
			goAddPath(){
				uni.navigateTo({
					url:"../my-add-path/my-add-path"
				})
			},
			goConfirmOrder(item){
				if(this.isSelectPath){
					uni.$emit('selectPathItem',item)
					uni.navigateBack({
						delta:1
					})
				}
				
			},
			toAddPath(index){
				let pathObj=JSON.stringify({
					index:index,
					item:this.list[index]
				})
				uni.navigateTo({
					url:"../my-add-path/my-add-path?data="+pathObj+""
				})
			}
		}
	}
</script>

<style scoped>

.path-list{
	padding-left:20rpx;
}
.path-item{
	padding:10rpx;
	border-bottom:2rpx solid #F9F9FA;
}
.item-main{
	display: flex;
	align-items: center;
	
}
.item-name{
	padding-right:10rpx;
	font-size: 34rpx;
	font-weight: 700;
}
.active{
	padding: 6rpx 8rpx;
	background-color: #49BDFB;
	color:#FFFFFF;
	border-radius: 26rpx;
	text-align: center;
	font-size: 30rpx;
	margin-right: 10rpx;
}
.add-path{
	/* padding:20rpx; */
	padding-top:40rpx ;
	width:100%;
	display: flex;
	justify-content: center;
}
.add-path-btn{
	background: linear-gradient(to right,#c973ff,#aebaf8);
	color:#fff;
	border-radius: 30rpx;
	padding:8rpx 60rpx;
	font-size: 36rpx;
}
</style>
