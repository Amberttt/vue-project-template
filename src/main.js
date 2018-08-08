// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 兼容 ES6
import 'babel-polyfill'
import Element from 'element-ui'
// Element 样式
import 'element-ui/lib/theme-chalk/index.css';
// 路由守卫
import '@/utils/routerGuards'

Vue.use(Element);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
