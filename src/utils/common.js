// vux url tool
import { querystring } from 'vux';
import Cookie from 'js-cookie';
// request params obj to stringify
export function objToStringify(obj) {
    return querystring.stringify(obj);
}
// 获取时间戳
export function getTimestamp(){
    return new Date().getTime();
}
// url 获取参数
export function getUrlParams(key) {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return key ? theRequest[key] : theRequest;
}
// 清除cookie，除了userid
export function clearCookies(){
    Cookie.remove('insCode');
    Cookie.remove('customerCode');
    Cookie.remove('search');
    Cookie.remove('searchIndex');
    Cookie.remove('filterKey');
    Cookie.remove('filterVal');
    Cookie.remove('detailIndex');
}