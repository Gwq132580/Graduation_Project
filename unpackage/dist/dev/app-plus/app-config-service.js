
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/list/list","pages/my/my","pages/shopcart/shopcart","pages/search/search","pages/search-list/search-list","pages/detail/detail","pages/my-config/my-config","pages/my-path-list/my-path-list","pages/my-add-path/my-add-path","pages/my-order/my-order","pages/confirm-order/confirm-order","pages/payment/payment","pages/payment-success/payment-success","pages/login/login","pages/login-tel/login-tel","pages/login-code/login-code"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"得物","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"app","compilerVersion":"2.8.11","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarBackgroundColor":"#fff","scrollIndicator":"none","titleNView":{"buttons":[{"float":"left","fontSrc":"./static/iconfont.ttf","text":""}]}}},{"path":"/pages/list/list","meta":{},"window":{"navigationBarBackgroundColor":"#fff","scrollIndicator":"none","titleNView":{"searchInput":{"placeholder":"请输入关键字","disabled":true,"align":"left","autoFocus":true,"borderRadius":"15px","backgroundColor":"#f7f7f7","placeholderColor":"#b3b3b3"}}}},{"path":"/pages/my/my","meta":{},"window":{"titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/shopcart/shopcart","meta":{},"window":{"titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarBackgroundColor":"#fff","scrollIndicator":"none","titleNView":{"searchInput":{"placeholder":"js高级程序设计","disabled":false,"align":"left","autoFocus":true,"borderRadius":"15px","backgroundColor":"#f7f7f7","placeholderColor":"#b3b3b3"},"buttons":[{"float":"right","color":"#BABAC6","text":"搜索","fontSize":"16px","width":"60px"}]}}},{"path":"/pages/search-list/search-list","meta":{},"window":{"navigationBarBackgroundColor":"#fff","scrollIndicator":"none","titleNView":{"searchInput":{"placeholder":"js高级程序设计","disabled":true,"align":"left","autoFocus":true,"borderRadius":"15px","backgroundColor":"#f7f7f7","placeholderColor":"#b3b3b3"},"buttons":[{"float":"right","color":"#BABAC6","text":"筛选","fontSize":"16px","width":"60px"}]}}},{"path":"/pages/detail/detail","meta":{},"window":{"navigationBarTitleText":"商品详情","scrollIndicator":"none","titleNView":{"type":"transparent","buttons":[{"type":"share"}]}}},{"path":"/pages/my-config/my-config","meta":{},"window":{"navigationBarTitleText":"设置","navigationBarBackgroundColor":"#fff"}},{"path":"/pages/my-path-list/my-path-list","meta":{},"window":{"navigationBarTitleText":"地址管理","navigationBarBackgroundColor":"#fff"}},{"path":"/pages/my-add-path/my-add-path","meta":{},"window":{"navigationBarTitleText":"新增地址","navigationBarBackgroundColor":"#fff","scrollIndicator":"none","titleNView":{"buttons":[{"float":"right","color":"#BABAC6","text":"保存","fontSize":"16px","width":"60px"}]}}},{"path":"/pages/my-order/my-order","meta":{},"window":{"navigationBarTitleText":"我的订单","navigationBarBackgroundColor":"#fff"}},{"path":"/pages/confirm-order/confirm-order","meta":{},"window":{"navigationBarTitleText":"确认订单","navigationBarBackgroundColor":"#fff"}},{"path":"/pages/payment/payment","meta":{},"window":{"titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/payment-success/payment-success","meta":{},"window":{"navigationBarTitleText":"支付成功","navigationBarBackgroundColor":"#fff"}},{"path":"/pages/login/login","meta":{},"window":{"titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/login-tel/login-tel","meta":{},"window":{"navigationBarTitleText":"手机号注册","navigationBarBackgroundColor":"#fff"}},{"path":"/pages/login-code/login-code","meta":{},"window":{"navigationBarTitleText":"输入验证码","navigationBarBackgroundColor":"#fff"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});