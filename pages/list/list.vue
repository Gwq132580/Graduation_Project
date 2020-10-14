<template>
	<view>
		<Lines />
		
		<view class='list'>
			
			<!--左侧滑动-->
			<scroll-view scroll-y="true" class='list-left' :style="'height:'+clientHeight+'px;'">
				<view v-for="(item,index) in leftData" class='left-item' @tap="changeLeftTab(index,item.id)" :key="index" >
					<view class='left-name' :class="activeIndex==index?'left-name-active':'left-item'" >{{item.name}}</view>
				</view>
			</scroll-view>
			
			<!--右侧滑动-->
			<scroll-view scroll-y="true" class='list-right' :style="'height:'+clientHeight+'px;'">
				<view class='righ-list' v-for="(item,index) in rightData" :key="index">
					<block v-for="(k,i) in item" :key="i">
						<view class='list-title'>{{k.name}}</view>
						<view class='right-content'>
							<view class='right-item' v-for="(j,idx) in k.list" :key='idx'>
								<image class='right-img' :src="j.imgUrl" mode=""></image>
								<view class='right-name'>{{j.name}}</view>
							</view>
						</view>
					</block>	
				</view>
			</scroll-view>
		</view>
		<Tabbar cureentPage='list'></Tabbar>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Lines from '@/components/common/Lines.vue'
	import Tabbar from '../../components/common/Tabbar.vue'
	export default {
		data() {
			return {
				clientHeight:0,
				activeIndex:0,
				leftData:[],
				rightData:[]
			}
		},
		onLoad() {
			this.getData()
		}, 
		onReady() {
			uni.getSystemInfo({
				success:(res)=>{
					this.clientHeight=res.windowHeight;
				}
			})
		},
		components:{
			Lines,
			Tabbar
		},
		
		methods: {
			changeLeftTab(i,id){
				this.getData(id) 
				this.activeIndex=i
				
			},
			getData(id){
				if(id===(this.activeIndex+1))
					return;
				$http.request({
					url:'/good/list'
				}).then((res)=>{
					let leftData=[],
						rightData=[];
					res.forEach(v=>{
						leftData.push({
							id:v.id,
							name:v.name
						})
						if(v.id===(this.activeIndex+1)){
							rightData.push(v.data)
						}
					})
					this.leftData=leftData
					this.rightData=rightData
				}).catch(()=>{
					uni.showToast({
						title:'请求失败', 
						icon:'none'
					})
				})
			},
		},
		
		//input输入框点击事件
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:'../search/search'
			})
		}
	}
</script>

<style scoped>
.list{
	display: flex;
}
.list-left{
	width: 200rpx;
}
.left-item{
	border-bottom:2rpx solid #FFFFFF;
	font-size:28rpx;
	font-weight: bold;
	background-color: #F7F7F7;
}
.left-name{
	padding:30rpx 6rpx;
	text-align: center;
}
.left-name-active{
	border-left:8rpx solid #49BDFB;
	background-color: #FFFFFF;
}
.list-right{
	flex:1;
	padding-left:30rpx;
}
.list-title{
	font-weight: bold;
	padding:30rpx 0;
}
.right-content{
	display: flex;
	flex-wrap: wrap;
}
.right-item{
	width: 150rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding:10rpx;
}
.right-name{
	padding:16rpx 0;
}
.right-img{
	width: 150rpx;
	height: 150rpx;
}


</style>
