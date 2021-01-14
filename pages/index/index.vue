<template>
 	<view class="index ">
 		<scroll-view scroll-x="true"  class="scroll-content" :scroll-into-view="scrollIntoIndex">
 			<view :id="'top'+index" @tap="tabBarChange(index)" class="scroll-item" v-for="(item,index) in topBar" :key='index'>
 				<text :class="topBarIndex===index? 'f-active-color':'f-color'">{{item.name}}</text>
 			</view> 
 		</scroll-view>
 		<swiper @change="onChangeTab" :current="topBarIndex" :style="'height:'+clientHeight+'px;'">
 			<swiper-item v-for="(item,index) in newTopBar" :key='index'>
 				<scroll-view scroll-y="true" :style="'height:'+clientHeight+'px;'"  @scrolltolower="loadmore(index)">
 					<block v-if="item.data.length>0">
 						<block v-for="(k,i) in item.data" :key='i'>
 							<!-- 推荐 -->
 							<IndexSwiper v-if="k.type==='swiperList'" :swiperList='k.data'></IndexSwiper>
 							<template v-if="k.type==='recommendList'">
								<!-- {{JSON.stringify(item.data)}} -->
 								<Recommend :recommendList='k.data'></Recommend>
 								<Card cardTitle="猜你喜欢"></Card>
 							</template>
 							<!-- 运动户外其他 -->
 							<Banner v-if="k.type==='bannerList'" :bannerList='k.imgUrl'></Banner>
 							<template v-if="k.type==='iconsList'">
 								<Icons :iconsList='k.data'></Icons>
 								<Card cardTitle="热销爆品"></Card>
 							</template>
 							<template v-if="k.type==='hotList'">
 								<Hot :hotList='k.data'></Hot> 
 								<Card cardTitle="为您推荐"></Card>
 							</template>
 							<template v-if="k.type==='shopList'">
 								<Shop :shopList='k.data'></Shop>
 								<!-- <Card cardTitle="为您推荐"></Card> -->
 							</template>
 							<CommodityList v-if="k.type==='commodityList'" :commodityList='k.data'></CommodityList> 
 						</block>
 					</block>
 					<view v-else>
 						暂无数据
 					</view>
 					<view class="load-text">
 						{{item.loadtext}}
 					</view>
 				</scroll-view>		
 			</swiper-item>
 		</swiper>
 		<Tabbar currentIndex='index'></Tabbar>
 	</view>
 </template>
 
 <script>
 	import $http from '@/common/api/request.js'
 	import IndexSwiper from '@/components/index/IndexSwiper.vue'
 	import Recommend from '@/components/index/Recommend.vue'
 	import Card from '@/components/common/Card.vue'
 	import CommodityList from '@/components/common/CommodityList.vue'
 	import Banner from '@/components/index/Banner.vue'
 	import Icons from '@/components/index/Icons.vue'
 	import Hot from '@/components/index/Hot.vue'
 	import Shop from '@/components/index/Shop.vue'
 	import Tabbar from '../../components/common/Tabbar.vue'
 	export default {
 		data() {
 			return {
 				topBar:[],
 				newTopBar:[],
 				topBarIndex:0,
 				scrollIntoIndex:'top0',
 				clientHeight:0
 			}
 		},
 		onLoad() {
 			this._initData()
 		}, 
 		onReady() {
 			uni.getSystemInfo({
 				success:(res)=>{
 					this.clientHeight=res.windowHeight-this.getClientHeight()+uni.upx2px(12);
 				}
 			})
 		},
 		onNavigationBarButtonTap(e){
 			//左边
 			if(e.index===0){
 				uni.navigateTo({
 					url:'../search/search'
 				})
 			}	
 		},
 		methods:{
 			//获取可视区域高度【兼容】
 			getClientHeight(){
 				const res = uni.getSystemInfoSync();
 				const system = res.platform;
 				if( system ==='ios' ){
 					return 44+res.statusBarHeight;
 				}else if( system==='android' ){
 					return 48+res.statusBarHeight;
 				}else{
 					return 0;
 				}
 			},
 			_initData(){
 				$http.request({
 					url:'/index_list/data'
 				}).then((res)=>{
 					this.topBar=res.topBar;
 					this.newTopBar=this.initData(res)
 				}).catch(()=>{
 					uni.showToast({
 						title:'没有更多数据了', 
 						icon:'none'
 					})
 				})
 			},
 			initData(res){
 				let arr=[];
 				for(let i=0;i<this.topBar.length;i++){
 					let obj={
 						data:[],
 						load:"first",
 						loadtext:"上拉加载更多..."
 					}
 					if(i===0)
 						obj.data=res.data
 					arr.push(obj)
 				}
 				return arr;
 			},
 			tabBarChange(index){
 				if(this.topBarIndex===index){
 					return;
 				}	
 				this.topBarIndex=index;
 				this.scrollIntoIndex='top'+index;
 				//每一次滑动赋值
 				if(this.newTopBar[this.topBarIndex].load==='first')
 					this.addData();
 			},
 			onChangeTab(e){  
 				this.topBarIndex=e.detail.current
 			},
 			addData(callback){
 					let index=this.topBarIndex;
 					let	id=this.topBar[index].id;
 					let page=Math.ceil(this.newTopBar[index].data.length/5+1);
 					$http.request({
 						url:`/index_list/${id}/data/${page}`,
 					}).then((res)=>{
 						this.newTopBar[index].data=res 
 					}).catch(()=>{
 						uni.showToast({
 							title:'没有更多数据了', 
 							icon:'none'
 						})
 				})
 					this.newTopBar[index].load='last';
 					if(typeof callback==='function')
 						callback()
 			},
 			loadmore(index){
 				this.addData(()=>{
 					this.newTopBar[index].loadtext='加载中...'
 				})
 			}
 		},
 		components:{
 			IndexSwiper,
 			Recommend,
 			Card,
 			CommodityList,
 			Banner,
 			Icons,
 			Hot,
 			Shop,
 			Tabbar
 		}
 	}
 </script>
 
 <style scoped>
 	.load-text{
 		line-height: 60rpx;
 		text-align: center;
 		border-top: 2rpx solid #636263;
 	}
 	.scroll-content{
 		width: 100%;
 		height: 80rpx;
 		white-space: nowrap;
 	}
 	.scroll-item{
 		display: inline-block;
 		padding: 10rpx 30rpx;
 		font-size: 32rpx;
 	}
 	.f-active-color{
 		padding: 10rpx 0 ;
 		border-bottom: 6rpx solid #2B2C3A;
 	}
 </style>
 