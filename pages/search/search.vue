<template>
	<view class="search">
		<Lines/>
		<view class="search-item">
			<view class="search-title">
				<view >最近搜索</view>
				<view style="color: #898989;" class="iconfont icon-iconset0213" @tap="clearHistory"></view> 
			</view>
			<view v-if="searchData.length>0" >
				<view  class="search-name " v-for="(item,index) in searchData" :key="index" @tap="goSearch(item)">
					{{item}}
				</view>
			</view>
			<view v-else class="search-end">暂无搜索内容</view>
		</view>
		<view class="search-item">
			<view class="search-title">
				<view class="">热门搜索</view>
			</view>
			<view>
				<view class="search-name" @tap="goSearch('羽绒服')">
					羽绒服
				</view>
				<view class="search-name " @tap="goSearch('衬衣')">
					衬衣
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	export default {
		data() {
			return {
				keyword:'',
				searchData:[]
			} 
		},
		onLoad() {
			uni.getStorage({
				key:'searchData',
				success:(res)=>{
					this.searchData=JSON.parse(res.data)
				}
			})
		},
		methods: {
			search(){
				if(this.keyword.trim().length<=0){
					uni.showToast({
						title:'搜索内容不能为空',
						icon:'none'
					})
				}
				else{
						this.goSearch(this.keyword);
						this.addSearch()
				}
				uni.hideKeyboard()
			},
			goSearch(item){
				uni.navigateTo({
					url:"../search-list/search-list?keys="+item+""
				})
			},
			addSearch(){
				let idx=this.searchData.indexOf(this.keyword);
				if(idx<0){
					this.searchData.unshift(this.keyword)
				}
				else{
					this.searchData.unshift(this.searchData.splice(idx,1)[0]);
				}
				uni.setStorage({
					key:'searchData',
					data:JSON.stringify(this.searchData)
				})
			},
			clearHistory(){
				uni.showModal({
					title:'重要提示',
					content:'是否要清除搜索记录',
					confirmText:'确认',
					cancelText:'取消',
					success: (res) => {
						if(res.confirm){
							uni.removeStorage({
								key:'searchData'
							})
							//更新视图层
							this.searchData=[]
						}
					}
				})
			}
		},
		components:{
			Lines
		},
		onNavigationBarSearchInputChanged(e){
			this.keyword=e.text;
		},
		onNavigationBarSearchInputConfirmed(){
			this.search();
		},
		onNavigationBarButtonTap(e){
			this.search()
		},
		
	}
</script>

<style scoped>
	.search-end{
		text-align: center;
	}
	.search-item{
		padding: 20rpx;
	}
	.search-title{
		display: flex;
		justify-content: space-between;
	}
	.search-name{
		padding: 4rpx 30rpx;
		background-color: #F8F8F8;
		display: inline-block;
		margin: 10rpx;
		border-radius: 26rpx;
		color: #898989;
	}
</style>
