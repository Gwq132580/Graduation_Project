<template>
	<view class='confirm-order bg-active-color'>
		<Lines></Lines>
		
		<!--地址-->
		<view class='order-map' @tap="goPathList">
			<template v-if="path">
				<view class='map-title'>
					<view class='map-name'>收件人：{{path.name}}</view>
					<view style="font-size: 32rpx;">{{path.tel}}</view>
				</view>
				<view class='map-city'>收货地址：{{path.province}} {{path.city}} {{path.district}} {{path.address}}</view>
			</template>
			<template v-else>
				<view class='map-title'>
					<view class='map-name'>请选择地址</view>
				</view>
			</template>
		</view>
		<!--商品-->
		<view class='goods-list' v-for='(item,index) in goodsList'
				:key='index'>
			<view class='goods-content bg-active-color'>
				<image class='goods-img' :src='item.imgUrl' mode=""></image>
				<view class='goods-text'>
					<view class='goods-name'>{{item.name}}</view>
					<view class='goods-size f-color'>颜色分类：黑色</view>
					<view class='f-active-color' style='font-size:28rpx'>保障: 7天无理由</view>
				</view>
				<view>
					<view>¥{{item.cprice}}</view>
					<view class='f-color'>×{{item.num}}</view>
				</view>
			</view>
			
		</view>
		<!--底部 : 提交订单-->
		<view class='order-foot'>
			<view class='total-price'>合计：<text style="color: #EC602A;font-size: 34rpx;" >¥{{totalCount.price}}</text></view>
			<view class="confirm" @tap="goPayMent(totalCount.price)">提交订单</view>
		</view>
		<!-- 底部背景 -->
		<view class="order-bottom">
			
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from '@/components/common/Lines.vue'
	import {mapGetters,mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				path:false
			}
		},
		onLoad(e) {
			//选中的商品id集合  [2,9]
			this.item = JSON.parse(e.detail);
			$http.request({
				url:'/selectAddress',
				method:'POST',
				header:{
					token:true
				}
			}).then((res)=>{
				this._initAddressList(res)
				if(this.defaultPath.length){
					this.path=this.defaultPath[0]
				}
			}).catch(()=>{
				uni.showToast({
					title:'没有更多数据了', 
					icon:'none'
				})
			})
			if(this.defaultPath.length){
				this.path=this.defaultPath[0]
			}
			uni.$on("selectPathItem",(res)=>{
				this.path=res
			})
		},
		onUnload() {
			uni.$off('selectPathItem',()=>{
				console.log('移除了')
			})
		},
		components:{
			Lines
		},
		computed:{
			...mapState({
				list:state=>state.cart.list
			}),
			...mapGetters(['defaultPath','totalCount']),
			//根据商品列表找到对应e.detail 数据的 id  最终返回商品数据
			goodsList(){
				return this.item.map(id=>{
					return this.list.find(v=>v.id == id);
				})
			}
		},
		methods: {
			...mapMutations(['_initAddressList']),
			goPathList(){
				uni.navigateTo({
					url:'../my-path-list/my-path-list?type=selectPath'
				})
			},
			goPayMent(sum){
				if(!this.path){
					return uni.showToast({
						title:'请选择收货地址',
						icon:'none'
					})
				}
				console.log(sum)
				uni.navigateTo({
					url:`../payment/payment?total=${sum}`
				})
			}
		}
	}
</script>

<style scoped>
.confirm-order{
	position: absolute;
	left:0;
	top:0;
	right:0;
	bottom:0;
	width:100%;
	height: 100%;
}
.order-map{
	padding:20rpx 0 0 20rpx;
	background-color: #FFFFFF;
}
.map-title{
	display: flex;
	padding-right: 20rpx;
	justify-content: space-between;
}
.map-city{
	font-size: 32rpx;
}
.map-name{
	font-weight: bold;
	font-size: 34rpx;
	color: #f2bae8;
}

.goods-list{
	/* margin-top:20rpx; */
	background-color: #FFFFFF;
	padding:20rpx 0;
}
.goods-content{
	margin-top:20rpx;
	padding:10rpx 20rpx;
	display: flex;
	justify-content: space-between;
	/* align-items: center; */
}
.goods-text{
	width:360rpx;
	padding:0 10rpx;
	font-size:32rpx;
}
.goods-img{
	width:160rpx;
	height:160rpx;
	border-radius: 5rpx;
}
.goods-name{
	font-size:34rpx;
	font-weight: 700;
}
.goods-size{
	font-size:34rpx;
}
.order-foot{
	height: 80rpx;
	width:100%;
	position: fixed;
	bottom:80rpx;
	left:0;
	background-color: #FFFFFF;
	display: flex;
	/* justify-content: flex-end; */
	align-items: center;
}
.total-price{
	padding:0 20rpx;
	font-size: 36rpx;
}
.confirm{
	color:#FFFFFF;
	background: linear-gradient(to right,#EF8D34,#EC602A);
	padding:10rpx 60rpx;
	font-size: 32rpx;
	border-radius: 30rpx;
	position: absolute;
	right: 20rpx;
}
.order-bottom{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 80rpx;
	background: linear-gradient(to right,#0c7bb3,#f2bae8);
}
</style>
