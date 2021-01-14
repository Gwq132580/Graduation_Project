import store from '../../store/index.js'
export default{
	common:{
		// baseurl:'http://192.168.137.1:3000/api',
		baseurl:'http://192.168.137.1:3000/api',
		header:{
			"Content-Type":"application/json",
			"Content-Type":"application/x-www-form-urlencoded"
		},
		method:"GET",
		dataType:"json",
	},
	request(options={}){
		// uni.showLoading({
		// 	title:'加载中'
		// })
		options.url=this.common.baseurl+options.url;
		options.data=options.data||this.common.data;
		options.header=options.header||this.common.header;
		options.method=options.method||this.common.method;
		options.dataType=options.dataType||this.common.dataType;
		if(options.header.token){
			options.header.token=store.state.user.token
			if(!options.header.token){
				uni.showToast({
					title:'请先登录',
					icon:'none'
				})
				return uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
		return new Promise((res,rej)=>{
			uni.request({
				...options,
				success:(result)=>{
					if(result.statusCode!==200)
						return rej()
					let data=result.data.data;
					res(data);
					// setTimeout(()=>{
					// 	uni.hideLoading();
					// },300)
				}
			})
		})
	}
}