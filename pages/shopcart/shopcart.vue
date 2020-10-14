<template>
	<view class="shop-cart">
		<template v-if="list.length>0">
			<uniNavBar title="购物车" :right-text='isNavBar?"完成":"编辑"' fixed='true'
			status-bar='true' @clickRight='isNavBar=!isNavBar'></uniNavBar>
			<!--商品内容-->
					<view class='shop-list'>
						<view class='shop-item'  v-for='(item,index) in list' :key='index'>
							<label class="radio" @tap="selectItem(index)">
								<radio value="" color="#FF3333" :checked="item.checked"/><text></text>
							</label>
							<image class='shop-img' :src="item.imgUrl" mode=""></image>
							<view class='shop-text'>
								<view class='shop-name'>{{item.name}}</view>
								<view class='shop-color f-color'>{{item.color}}</view>
								<view class='shop-price'>
									<view style="font-size: 32rpx;color: #EF8D34;">￥{{item.cprice}}</view>
									<template v-if="!isNavBar">
										<view style="font-size: 32rpx;">×{{item.num}}</view>
									</template>
									<template v-else>
										<uniNumberBox :value="item.num" min='1' @change="changeNum($event,index,item)"></uniNumberBox>
									</template>
								</view>
							</view>
						</view>
					</view>
					<!--底部-->
					<view class='shop-foot'>
						<label class="radio foot-radio" @tap="checkedAllFn">
							<radio value="" color='#FF3333' :checked="checkedAll"/><text>全选</text>
						</label>
						<template v-if="!isNavBar">
							<view class='foot-total'>
								<view class='foot-count'>合计：<text style="color: #EC602A;">￥{{totalCount.price}}</text></view>
								<view class='foot-num' @tap="goConfirm">结算({{totalCount.num}})</view>
							</view>
						</template>
						<template v-else>
							<view class='foot-total'>
								<!-- <view class='foot-count' style="background-color: #000;color: #fff;">移入收藏夹</view> -->
								<view class='foot-num' @tap="delGoodsFn">刪除</view>
							</view>
						</template>
					</view>
		</template>
		<template v-else>
			<uniNavBar title="购物车" fixed='true'
			status-bar='true' ></uniNavBar>
			<view class="shop-cart-else">
				<text>购物车还是空的~</text>
			</view>
		</template>
		<Tabbar cureentPage='shopcart'></Tabbar>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
	import uniNumberBox from '../../components/uni/uni-number-box/uni-number-box.vue'
	import uniNavBar from '../../components/uni/uni-nav-bar/uni-nav-bar.vue'
	import Tabbar from '../../components/common/Tabbar.vue'
	export default {
		data() {
			return {
				isNavBar:false,				
			}
		},
		onShow() {
			this.getData();
		},
		methods: {
			...mapActions(['checkedAllFn','delGoodsFn']),
			...mapMutations(['selectItem','initGetData']),
			goConfirm(){ 
				if( this.selectedList.length === 0 ){
					return uni.showToast({
						title:"请至少选择一件商品",
						icon:"none"
					})
				}
				uni.navigateTo({
					url:`../confirm-order/confirm-order?detail=${JSON.stringify(this.selectedList)}`
				})
			},
			getData(){
					$http.request({
						url:"/selectCart",
						method:"POST",
						header:{
							token:true
						}
					}).then((res)=>{
						this.initGetData(res);
					}).catch(()=>{
						uni.showToast({
							title:'请求失败',
							icon:'none'
						})
					})
			},
			changeNum(value,index,item){
				if( item.num == value ) return; 
				$http.request({
					url:"/updateNumCart",
					method:"POST",
					header:{
						token:true
					},
					data:{
						goodsId:item.goods_id,
						num:value
					}
				}).then((res)=>{
					console.log(res);
					this.list[index].num = value;
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
		},
		computed:{
			...mapState({
				list:state=>state.cart.list,
				selectedList:state=>state.cart.selectedList
			}),
			...mapGetters(['checkedAll','totalCount'])
		},
		components:{
			uniNavBar,
			uniNumberBox,
			Tabbar
		}
	}
</script>

<style scoped>
.shop-list{
	padding-bottom:100rpx;
}
/* 偶数 */
.shop-list .shop-item:nth-child(even){
	background-color: #F5F7FA;
}
/* 奇数 */
.shop-list .shop-item:nth-child(odd){
	background-color: #F9F9FA;
}
.shop-cart-else{
	background-color: #f9f9f9;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
.shop-item{
	display: flex;
	padding:20rpx;
	align-items: center;
	margin-bottom:10rpx;
}
.shop-img{
	width:200rpx;
	height: 200rpx;
	border-radius: 10rpx;
}
.shop-text{
	flex:1;
	padding-left:20rpx;
}
.shop-name{
	font-size: 35rpx;
	font-weight: 700;
}
.shop-color{
	font-size:24rpx;
}
.shop-price{
	display: flex;
	justify-content: space-between;
}

.shop-foot{
	border-top:2rpx solid #F7F7F7;
	background-color: #FFFFFF;
	position: fixed;
	bottom:120rpx;
	left:0;
	width:100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.foot-radio{
	padding-left:20rpx;
}
.foot-total{
	display: flex;
}
.foot-count{
	line-height: 100rpx;
	padding:0 20rpx;
	font-size:32rpx;
}
.foot-num{
	background: linear-gradient(to right,#EF8D34,#EC602A);
	color:#FFFFFF;
	padding:0 60rpx;
	line-height: 100rpx;
	font-size: 32rpx;
}
</style>
