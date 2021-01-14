<!-- <template>
	<view class="loading" :style="'height:'+height+'px'">
		<view class="loader">
			
		</view>
		<view class="logo">
			<image src="../../static/img/logo.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				height:''
			}
		},
		onLoad(){
			uni.getSystemInfo({
				success:(res)=>{
					this.height=res.screenHeight;
				}
			})
			setTimeout(()=>{
				uni.reLaunch({
					url:'../my-home/my-home'
				})
			},1) 
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.logo{
		position: absolute;
		top: 10%;
		left: 50%;
		transform: translateX(-50%);
	}
	.loading {
	  height: 100vh;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  max-height: 100vh;
	  background-color: #15161B;
	}
	.loader {
	  position: relative;
	  margin: 100px;
	  width: 80px;
	  height: 80px;
	  border-radius: 50%;
	  background: linear-gradient(45deg, transparent, transparent 40%, pink);
	  animation: animate 2s linear infinite;
	}
	@keyframes animate {
	  0% {
	    transform: rotate(0deg);
	    filter: hue-rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	    filter: hue-rotate(360deg);
	  }
	}
	.loader::before {
	  content: '';
	  position: absolute;
	  top: 6px;
	  left: 6px;
	  right: 6px;
	  bottom: 6px;
	  background: #000;
	  border-radius: 50%;
	  z-index: 1000;
	}
	.loader::after {
	  content: '';
	  position: absolute;
	  top: 0px;
	  left: 0px;
	  right: 0px;
	  bottom: 0px;
	  background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
	  border-radius: 50%;
	  z-index: 1000;
	  z-index: 1;
	  filter: blur(30px);
	}
</style>
 -->