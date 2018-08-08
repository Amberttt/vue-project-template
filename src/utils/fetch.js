// 封装fetch方法
import axios from 'axios';
import router from '@/router';
import Vue from 'vue';
import { Notification } from 'element-ui';
// 创建axios实例
const service = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: process.env.BASE_API,
    transformRequest: [function (data) {
        // Do whatever you want to transform the data
        return JSON.stringify(data)
    }],
    timeout: 60000,
    withCredentials: true
});

// // request拦截器
// service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     config.headers['X-Token'] = store.getters.token; // 让每个请求携带自定义token 请根据实际情况自行修改
//   }
//   return config;
// }, error => {
//   // Do something with request error
//   console.log(error); // for debug
//   Promise.reject(error);
// });

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        const status = res.status;
        // Notification({
        //     message: res.message || res.description,
        //     type: 'error',
        //     duration: 3 * 1000
        // });
        // 是否成功
        if(status){
            return res.data;
        }else{
            return Promise.reject(res);
        }

        // if(res.status !== 0){
        //   return Promise.reject(res);
        // }else{
        //   return res.data;
        // }
        
        // if(status == 0){
        //     return res.data;
        // }else if(status == 10001 || status == 30004 || status == 10004){
        //     router.push('/noKAccount');
        //     return false;
        // }else if(status == 10002){
        //     router.push('/readyData');
        //     return false;
        // }
        // // else if(status == 10004){
        // //   Vue.$vux.toast.text(res.msg);
        // //   return false;
        // // }
        // else{
        //     //  status == 1 或 10003 的情况
        //     return Promise.reject(res);
        // }
    },
    error => {
        // console.log(res.msg);
        return Promise.reject(error);
    }
);

export default service;
