import Vue from 'vue'
import App from './App'
import store from 'store/index.js';
Vue.config.productionTip = false


Vue.prototype.$store=store;
Vue.prototype.navigateTo=(options)=>{
	if(!store.state.user.loginStatus){
		uni.showToast({
			title:'请先登录',
			icon:'none'
		})
		return uni.navigateTo({
			url:'/pages/login/login'
		})
	}
	uni.redirectTo(options)
}

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
