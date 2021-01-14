<template>
	<view class='login-other'>
		<view class='other-text'>
			<view style="font-size: 34rpx;color: #fff;">第三方登录</view>
		</view>
		<view class='other'>
			<view class='other-item'>
				<image src="../../static/img/wxf.png" mode="" @tap='loginOther("weixin")'></image> 
				<view>微信登录</view>
			</view>
			<view class='other-item'>
				<image src="../../static/img/weibo.png" mode="" @tap='loginOther("sinaweibo")' ></image>
				<view>微博登录</view>
			</view>
			<view class='other-item'>
				<image src="../../static/img/qq.png" mode="" @tap='loginOther("qq")'></image>
				<view>QQ登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {mapMutations} from 'vuex'
	export default{
		methods:{
				...mapMutations(['login']),
				loginOther(mode){
					uni.login({
						provider:mode,
						success:(res)=>{
							uni.getUserInfo({
								provider:mode,
								success:(res)=>{
									let provider = mode;
									//openid==》用户身份
									let openid = res.userInfo.openId ||  res.userInfo.openid;
									let nickName = res.userInfo.nickName;
									let avatarUrl = res.userInfo.avatarUrl;
									$http.request({
										url:"/loginother",
										method:"POST",
										data:{
											provider,
											openid,
											nickName,
											avatarUrl
										}
									}).then((res)=>{
										//保存用户信息
										this.login(res);
										uni.navigateBack({
											delta:1
										})
									}).catch(()=>{
										uni.showToast({
											title:'请求失败',
											icon:'none'
										})
									})
								}
							})
						}
					})
				}
			}
	}
</script>

<style scoped>
/*  其他登录方式  */
.login-other{
	padding-bottom: 50rpx;
}
.other-text{
	display: flex;
	padding:50rpx 0;
}
.other-text view{
	line-height: 0rpx;
	padding:0 10rpx;
	color: #2B2C3A;
}
.other-text:after{
	flex:1;
	content: '';
	height: 2rpx;
	background: linear-gradient(to right,#EB565C,#6BDADB);
}
.other-text::before{
	flex:1;
	content: '';
	height: 2rpx;
	background: linear-gradient(to right,#EB565C,#6BDADB);
}
.other{
	display: flex;
	justify-content: space-around;
}
.other-item{
	color: #fff;
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items: center;
}
.other-item image{
	width:80rpx;
	height: 80rpx;
}
.other-item view{
	font-size: 30rpx;
}
/*  其他登录方式  end  */
</style>
