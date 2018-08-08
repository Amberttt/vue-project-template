import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
import Login from '@/views/login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Root',
            component: Main
        },{
            path: '/main',
            redirect: '/',
            name: 'Main',
            component: Main
        },{
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})
