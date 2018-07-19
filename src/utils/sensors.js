import Vue from 'vue';
import sa from'sa-sdk-javascript';
import Cookie from 'js-cookie';
import { querystring } from 'vux';
const search = querystring.parse(window.location.search);
const SENSORS_API = 'https://doctorhomes.cloud.sensorsdata.cn:4006/sa?token=a7ec5d28bcfa9b27&project='; // default || production
const SENSORS_ENV = process.env.NODE_ENV == 'production' ? 'production' : 'default';
// export function initSensors(){
    const user_id = Cookie.get('userid') || search.userid || '';
    const server_url = SENSORS_API + SENSORS_ENV;
    sa.init({
        name: 'sa',
        server_url: server_url,
        heatmap: {
            //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
            clickmap:'default',
            //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
            scroll_notice_map:'not_collect'
        },
        show_log: process.env.NODE_ENV == 'production' ? false : true,
        // is_single_page: true
    });
    sa.login(user_id);
    sa.quick('autoTrack',{
        app: 'AZ HCP360',
        platform:'h5'
    });
// }
// sa.quick('autoTrackSinglePage');     // 单页面中发送页面浏览事件($pageview)
Vue.prototype.saTrack = function(eventName, eventProperties){
    let obj = {
        app: 'AZ HCP360',
        platform: 'h5'
    };
    for (var key in eventProperties) {
        obj[key] = eventProperties[key];
    }
    sa.track(eventName, obj);
}