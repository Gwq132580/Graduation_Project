export default{
	state:{
		loginStatus:false,
		userInfo:{},
		token:null
	},
	getters:{
		
	},
	actions:{
	},
	mutations:{
		initUser(state){
			let userInfo=uni.getStorageSync('userInfo');
			if(userInfo){
				userInfo=JSON.parse(userInfo)
				state.userInfo=userInfo;
				state.loginStatus=true;
				state.token=userInfo.token;
			}
		},
		login(state,userInfo){
			state.userInfo=userInfo;
			state.loginStatus=true;
			state.token=userInfo.token;
			uni.setStorageSync('userInfo',JSON.stringify(userInfo))
		},
		exitLogin(state){
			state.loginStatus=false;
			state.userInfo={};
			state.token=null;
			uni.removeStorageSync('userInfo')
		}
		
	}
}