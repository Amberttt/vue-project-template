import Vue from 'vue';
import router from "@/router";
// import store from '@/utils/store';
import { WechatPlugin,ToastPlugin } from 'vux';
import Cookie from 'js-cookie';
import { isWelcome, getWxConfig, getWxConfigT } from "@/api/index";
import { querystring } from 'vux';
Vue.use(WechatPlugin);
Vue.use(ToastPlugin);
const wx = Vue.wechat;

// (function(){
// 	// 判断浏览器
// 	let ua = window.navigator.userAgent.toLowerCase();
// 	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
// 		// console.log("微信");
// 	} else {
// 		// console.log("非微信");
// 		router.push({
// 			path: '/openInWxPlease'
// 		});
// 	}
// })();

// 禁止分享
(function(){
    // document.addEventListener('WeixinJSBridgeReady', function () {
    //     WeixinJSBridge.call('hideOptionMenu');
    //     console.log("禁止分享");
	// });
	function onBridgeReady() {
		WeixinJSBridge.call('hideOptionMenu');
	}
	
	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	} else {
		onBridgeReady();
	}
})();

router.beforeEach(function (to, from, next) {
	// console.log(from,to,'---from---to---');
	if (to.path == '/' || to.name == 'BeforeWelcome') {
		Cookie.remove('firstUrl');
		Cookie.remove('userid');
		const firstUrl = document.URL || document.location.href || '';
		Cookie.set('firstUrl', firstUrl);	//.replace('/?','?')
		Cookie.set('userid',to.query.userid,{path:'/'});
		// getFirstUrl(to.query.userid);
		next();
		// 发送请求验证
		// isWelcome.then((data) => {
		// 	if(data == 'welcome'){
		// 		next();
		// 	}
		// 	// else{
		// 	// 	next({
		// 	// 		name: ''
		// 	// 	});
		// 	// }
		// });
	}else{
		next();
	}
	// store.commit('updateLoadingStatus', { isLoading: true })
	// if (!store.state.url) {
	// 	// 记录第一次进入的URL
	// 	// store.commit(SET_URL, document.URL)
	// 	store.state.url = document.URL
	// }
	// next();
})

// router.afterEach(function (to) {
// 	store.commit('updateLoadingStatus', { isLoading: false });
// })

// WeChat Config
// Vue.prototype.wxConfig = function (title, desc, img, link) {
function getFirstUrl(id){
	const search = querystring.parse(window.location.search);
	const ticketUrl = Cookie.get('firstUrl') || document.URL || document.location.href || '';
	// Vue.$vux.toast.text();
	// if(!Cookie.get('firstUrl')){
		Cookie.set('firstUrl',ticketUrl); //.replace('/?','?')
	// }
	// encodeURIComponent(ticketUrl.replace('/?','?'))
	// escape(ticketUrl.replace('/?','?'));
	// getWxConfig(Cookie.get('userid') || search.userid || '',encodeURIComponent(ticketUrl)).then((data) => {  //.replace('/?','?')
	// getWxConfig(id,encodeURIComponent(ticketUrl)).then((data) => {  //.replace('/?','?')
	// getWxConfig(search.userid || Cookie.get('userid') || '',encodeURIComponent(ticketUrl)).then((data) => {  //.replace('/?','?')
	// getWxConfigT({userid:search.userid || Cookie.get('userid') || '',url:ticketUrl}).then((data) => {  //.replace('/?','?')
	getWxConfigT({userid:id,url:ticketUrl}).then((data) => {  //.replace('/?','?')
		if (data) {
			wx.config({
				beta: true,
				debug: process.env.NODE_ENV == 'production' ? false : true,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: ['hideOptionMenu']
			});
		}
	});
	wx.ready(() => {
		wx.hideOptionMenu();
	});
	wx.error((res) => {
		// console.log(res,'---wxConfig error---');
	});
};

// getFirstUrl();

// WeChat Config
// Vue.prototype.wxConfig = function (title, desc, img, link) {
// 	const search = querystring.parse(window.location.search);
// 	const ticketUrl = Cookie.get('firstUrl') || document.URL || document.location.href || '';
// 	// Vue.$vux.toast.text();
// 	// if(!Cookie.get('firstUrl')){
// 		Cookie.set('firstUrl',ticketUrl); //.replace('/?','?')
// 	// }
// 	// encodeURIComponent(ticketUrl.replace('/?','?'))
// 	// escape(ticketUrl.replace('/?','?'));
// 	// getWxConfig(Cookie.get('userid') || search.userid || '',encodeURIComponent(ticketUrl)).then((data) => {  //.replace('/?','?')
// 	// getWxConfig(id,encodeURIComponent(ticketUrl)).then((data) => {  //.replace('/?','?')
// 	// getWxConfig(search.userid || Cookie.get('userid') || '',encodeURIComponent(ticketUrl)).then((data) => {  //.replace('/?','?')
// 	// getWxConfigT({userid:search.userid || Cookie.get('userid') || '',url:ticketUrl}).then((data) => {  //.replace('/?','?')
// 	getWxConfigT({userid:Cookie.get('userid'),url:document.location.href}).then((data) => {  //.replace('/?','?')
// 		if (data) {
// 			wx.config({
// 				debug: process.env.NODE_ENV == 'production' ? true : true,
// 				appId: data.appId,
// 				timestamp: data.timestamp,
// 				nonceStr: data.nonceStr,
// 				signature: data.signature,
// 				jsApiList: ['hideOptionMenu']
// 			});
// 		}
// 	});
// 	wx.ready(() => {
// 		wx.hideOptionMenu();
// 	});
// 	wx.error((res) => {
// 		// console.log(res,'---wxConfig error---');
// 	});
// };