// 封装fetch方法
import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';
import { logout } from '../api/login';
import {Base64} from 'js-base64';
// axios.defaults.withCredentials = true;

const idStr = 'N00000028346';

function pad2(n) { return n < 10 ? '0' + n : n }
function generateTimeStamp() {
    var date = new Date();
    return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
}
function getBase(subStr) {
    const str = subStr + ':' + generateTimeStamp();
    return Base64.encode(str);
}


// 创建axios实例
const service = axios.create({
    baseURL: 'http://apis.7moor.com/v20160818',
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/json;charset=utf-8',
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Length': 256,
        'Authorization': getBase(idStr)
    },
    transformRequest: [function (data) {
        // Do whatever you want to transform the data
        return JSON.stringify(data)
    }],
    timeout: 10000,
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
        if (res.code !== 200) {
            Message({
                // message: process.env.NODE_ENV === 'development' ? res.description : res.message,
                message: res.description || res.message,
                type: 'error',
                duration: 2 * 1000
            });
            if (res.code === 300 || res.code === 550) {
                logout().then(() => {
                    router.push('/login');
                });
            }
            return Promise.reject();
        } else {
            return response.data.data;
        }
    },
    error => {
        Message({
            message: error.message || error.description,
            type: 'error',
            duration: 2 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
