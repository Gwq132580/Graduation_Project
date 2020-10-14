<template>
	<view class='login'>
		<swiper vertical='true' style="height: 100vh;">
			<swiper-item>
				<scroll-view>
					<view class='login-tel'>
						<view class='tel-main'>
							<view class='close' @tap="close">
								<image class='close-img' src="../../static/img/close.png" mode=""></image>
							</view>
							<view class='logo'>
								<image class='logo-img' src="../../static/img/logo.jpg" mode=""></image>
							</view>
							<view class='tel' @tap="goLoginTel">手机号注册</view>
							<LoginOther></LoginOther>
							<view class='login-go'>
								<view >已有账号，去登录</view>
								<image src="../../static/img/down.png" mode=""></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" >
					<view class='login-tel'>
						<view class='tel-main'>
							<view class='close close-center' @tap="close">
								<view>
									<image class='close-img' src="../../static/img/close.png" mode=""></image>
								</view>
								<view class='login-go'>
									<image class='close-img' src="../../static/img/up.png" mode=""></image>
									<view >没有账号，去注册</view>
								</view>
								<view></view>
							</view>
							<view class='login-from'>
								<view class="avatar">
									<image :src="avatar?avatar:'../../static/img/logo.jpg'" mode=""></image>
								</view>
								<view class='login-user'>
									<input type="text" value="" v-model="userName" placeholder="请输入手机号/用户名" @blur="getAvatar"/>
								</view>
								<view class='login-user'>
									<input type="password" value="" v-model="userPwd" placeholder="密码为6-16位字符"/>
								</view>
							</view>
							<!-- <view class='login-quick'>
								<view>忘记密码?</view>
								<view>免密登录</view>
							</view> -->
							<view class='tel' style="margin-bottom: 300rpx;" @tap="loginTo">登录</view>
							<!-- <view class='reminder'>温馨提示：您可以选择免密登录，更加方便</view> -->
							<LoginOther></LoginOther>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import LoginOther from '@/components/login/login-other.vue'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				userName:'',
				userPwd:'',
				avatar:'',
				rules:{
					userName:{
						rule:/\S/,
						msg:'账号不能为空'
					},
					userPwd:{
						rule:/^[0-9A-Za-z]{6,16}$/,
						msg:'密码为6到16位字符'
					}
				}
			}
		},
		components:{
			LoginOther
		},
		methods: {
			...mapMutations(['login']),
			getAvatar(){
				$http.request({
					url:'/getAvatar',
					method:'POST',
					data:{
						phone:this.userName,
					}
				}).then((res)=>{
					let [{imgUrl}]=res;
					this.avatar=imgUrl; 
				}).catch(()=>{
					uni.showToast({
						title:'获取头像失败', 
						icon:'none'
					})
				})
			},
			close(){
				uni.navigateBack({
					delta:1
				})
			},
			loginTo(){
				if(!this.validate('userName')||!this.validate('userPwd'))
					return ;
				uni.showLoading({
					title:'登录中'
				})
				$http.request({
					url:'/login',
					method:'POST',
					data:{
						userName:this.userName,
						userPwd:this.userPwd
					}
				}).then((res)=>{
					if(res.success){
						this.login(res.data);
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
							uni.hideLoading();
							uni.navigateBack({
								delta:1
							})
					}
					else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					
				}).catch(()=>{
					
					uni.showToast({
						title:'请求失败', 
						icon:'none'
					})
				})
			},
			validate(key){
				if(!this.rules[key].rule.test(this[key])){
					uni.showToast({
						title:this.rules[key].msg
					})
					return false;
				}
				return true;
			},
			goLoginTel(){
				uni.navigateTo({
					url:'../login-tel/login-tel'
				})
			}
		}
	}
</script>

<style scoped>
.avatar{
	display: flex;
	justify-content: center;
}
.avatar image{
	width: 120rpx;
	height: 120rpx; 
	border-radius: 50%;
}
.login-tel{
	width: 100vw;
	height: 100vh;
}
.tel-main{
	padding:0 20rpx;
}
.close{
	padding:120rpx 0;
}
.close-img{
	width:60rpx;
	height: 60rpx;
}
.logo{
	padding-bottom: 100rpx;
	display: flex;
	justify-content: center;
}
.logo-img{
	border-radius: 30rpx;
}
.tel{
	margin-top: 50rpx;
	width:100%;
	font-size: 34rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color:#FFFFFF;
	background: #6BDADB;
	border-radius: 40rpx;
	margin-bottom: 250rpx;
}
.login-go{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: purple;
}
.login-go image{
	width:60rpx;
	height: 60rpx;
}
/*第二*/
.close-center{
	display: flex;
}
.close-center >view{
	flex:1;
}
.login-from{
	padding-top:100rpx;
}
.login-user{
	font-size:32rpx;
	padding:10rpx 0;
	display: flex;
	align-items: center;
	border-bottom:2rpx solid #f7f7f7;
	margin-top: 30rpx;
}
.login-user input{
	background-color: #F2F3F7;
	width: 100%;
	border-radius: 60rpx;
	height: 120rpx;
	text-align: center;
}
.login-quick{
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
}
.reminder{
	color:#CCCCCC;
	padding:20rpx 0;
	text-align: center;
}
</style>
