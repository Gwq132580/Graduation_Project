<template>
	<view style="padding-bottom: 90rpx;" >
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item >
				<view class="swiper-item">
					<image class="swiper-img" :src="goodsContent.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="details-goods">
				<view class="goods-cprice">
					现价: {{'￥'+goodsContent.cprice}}
				</view>
				<view class="goods-pprice">
					原价: {{'￥'+goodsContent.pprice}}
				</view>
			<view class="goods-name">
				{{goodsContent.name}}
			</view>
		</view>
		<view class="goods-recommend">
			<view class="">
				<image src="../../static/img/detail1.jpg" mode=""></image>
			</view>
			<view class="">
				<image src="../../static/img/detail2.jpg" mode=""></image>
			</view>
			<view class="">
				<image src="../../static/img/detail3.jpg" mode=""></image>
			</view>
			<view class="">
				<image src="../../static/img/detail4.jpg" mode=""></image>
			</view>
			<view class="">
				<image src="../../static/img/detail5.jpg" mode=""></image>
			</view>
		</view>
		<Card cardTitle="看了又看"></Card>
		<CommodityList :commodityList='commodityList'></CommodityList>
		<!--底部-->
		<view class='details-foot'>
			<!-- <view class='iconfont icon-xiaoxi'></view> -->
			<view class='iconfont icon-gouwuche' @tap='goShopCart'></view>
			<view class='add-shopcart' @tap="showPop">加入购物车</view>
			<view class='purchase' @tap="showPop">立即购买</view>
		</view>
		<!-- 弹出层 -->
		<view class="pop" v-show="isShow" @touchmove.stop.prevent=''>
			<view class="pop-mask" @tap="hidePop">
				
			</view>
			<view class="pop-content" :animation='animationData'>
				<view>
					<image class='pop-img' :src="goodsContent.imgUrl" mode=""></image>
				</view>
				<view class='pop-num'>
					<view>购买数量</view>
					<UniNumberBox 
						min='1'
						:value='num'
						@change='changeNum'
					></UniNumberBox>
				</view>
				<view class='pop-sub' @tap="addCart">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	import $http from '@/common/api/request.js'
	import Card from '../../components/common/Card.vue'
	import CommodityList from '../../components/common/CommodityList.vue'
	import UniNumberBox from '../../components/uni/uni-number-box/uni-number-box.vue'
	export default {
		data() {
			return {
				num:1,
				goodsContent:{},
				animationData:'',
				isShow:false,
				swiperList:[
					{imgUrl:'../../static/img/details1.jpeg'},
					{imgUrl:'../../static/img/details2.jpeg'},
					{imgUrl:'../../static/img/details3.jpeg'},
				],
				commodityList:[
					{
						id:1,
						imgUrl:'../../static/img/commodity1.jpg',
						name:'爆款大衣',
						cprice:'￥699',
						pprice:'￥999',
						discount:'5.2折'
					},
					{
						id:2,
						imgUrl:'../../static/img/commodity2.jpg',
						name:'爆款大衣',
						cprice:'￥699',
						pprice:'￥999',
						discount:'5.2折'
					},
					{
						id:3,
						imgUrl:'../../static/img/commodity3.jpg',
						name:'爆款大衣',
						cprice:'￥699',
						pprice:'￥999',
						discount:'5.2折'
					},
					{
						id:4,
						imgUrl:'../../static/img/commodity4.jpg',
						name:'爆款大衣',
						cprice:'￥699',
						pprice:'￥999',
						discount:'5.2折'
					},
				]
			}
		},
		//修正返回默认行为
		onBackPress(){
			if(this.isShow){
				this.hidePop();
				return true;
			}
		},
		//分享
		onNavigationBarButtonTap(e){
			if(e.type==='share'){
				uni.share({
					"provider":"weixin",
					"type":0,
					"scene":"WXSceneSession",
					"title":this.goodsContent.name,
					"href":"http://192.168.137.1:8080/#/pages/detail/detail?id="+this.goodsContent.id+"",
					imageUrl:this.goodsContent.imgUrl,
					success: () => {
						uni.showTabBar({
							title:"分享成功"
						})
					},
					fail:()=>{
						console.log("fail:"+JSON.stringify(err))
					}
				})
			}
		},
		onLoad(e){
			this.getData(e.id)
		},
		methods: {
			...mapMutations(['addShopCart']),
			addCart(){
				$http.request({
					url:"/addCart",
					method:"POST",
					data:{
						goods_id:this.goodsContent.id,
						num:this.num
					},
					header:{
						token:true
					}
				}).then((res)=>{
					//隐藏弹出框
					this.hidePop();
					//提示信息
					uni.showToast({
						title:"成功加入购物车",
						icon:'none'
					})
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			// addCart(){
				// $http.request({
				// 	url:'/ceshi',
				// 	method:"POST",
				// 	header:{
				// 		token:true
				// 	}
				// }).then((res)=>{
				// 	console.log(res)
				// }).catch(()=>{
				// 	uni.showToast({
				// 		title:'请求失败', 
				// 		icon:'none'
				// 	})
				// })
			// 	let goods=this.goodsContent;
			// 	this.goodsContent['checked']=false;
			// 	this.goodsContent['num']=this.num;
			// 	this.addShopCart(goods);
			// 	this.hidePop();
			// 	uni.showToast({
			// 		title:'添加成功',
			// 		icon:'none'
			// 	})
			// },
			goShopCart(){
				uni.navigateTo({
					url:'../shopcart/shopcart'
				})
			},
			changeNum(value){
				this.num=value
			},
			getData(id){
				$http.request({
					url:'/goods/id',
					data:{
						id:id
					}
				}).then((res)=>{
					this.goodsContent=res[0]
				}).catch(()=>{
					uni.showToast({
						title:'没有更多数据了', 
						icon:'none'
					})
				})
			},
			showPop(){
				var animation=uni.createAnimation({
					duration:100
				})
				animation.translateY(600).step();
				this.animationData=animation.export()
				this.isShow=true
				setTimeout(()=>{
					animation.translateY(0).step();
					this.animationData=animation.export()
				},100)
			},
			hidePop(){
				var animation=uni.createAnimation({
					duration:100
				})
				animation.translateY(600).step();
				this.animationData=animation.export()
				this.isShow=true
				setTimeout(()=>{
					animation.translateY(0).step();
					this.isShow=false
				},100)
				
			}
		},
		components:{
			Card,
			CommodityList,
			UniNumberBox
		}
	}
</script>

<style scoped>
swiper{
	height: 700rpx;
	width: 100%;
}
.swiper-img{
	height: 700rpx;
	width: 100%;
}
.details-goods{
	text-align: center;
	font-size: 26rpx;
	padding: 10rpx 0;
	font-weight: 700;
}
.goods-cprice{
	font-size: 36rpx;
	color: #EC5D29;
}
.goods-pprice{
	text-decoration: line-through;
	color: #999;
}	
.goods-recommend image{
	width: 100%;
}
.details-foot{
	position: fixed;
	left:0;
	bottom: 0;
	width:100%;
	height: 90rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: #FFFFFF;
}
.details-foot .iconfont{
	width:60rpx;
	height: 60rpx;
	border-radius: 100%;
	background-color: #000000;
	color:#FFFFFF;
	text-align: center;
	margin:0 10rpx;
}
.add-shopcart{
	margin-left: 120rpx;
	margin-left: 50rpx;
	padding:6rpx 30rpx;
	background-color: #F6CB45;
	color:#FFFFFF;
	border-radius: 40rpx;
}
.purchase{
	/* margin:0 40rpx; */
	margin-left: 120rpx;
	padding:6rpx 30rpx;
	background-color: #EC5E29;
	color:#FFFFFF;
	border-radius: 40rpx;
}
.details-foot view:first-child{
	font-size: 38rpx;
}
.pop{
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
}
.pop-mask{
	position: absolute;
	left: 0;
	top: 0;
	background-color: rgba(0,0,0,.3);
	width: 100%;
	height: 100%;
}
.pop-content{
	position: absolute;
	left: 0;
	bottom: 0;
	background-color: #fff;
	width: 100%;
	height: 300px;
}
.pop-img{
	width: 260rpx;
	height: 260rpx;
}
.pop-num{
	padding:20rpx;
	display: flex;
	justify-content: space-between;
}
.pop-sub{
	line-height: 80rpx;
	background-color: #49BDFB;
	color:#FFFFFF;
	text-align: center;
}
</style>
