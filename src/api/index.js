import fetch from '@/utils/fetch';
// import {} from '@/utils/common';

// login
export function login(data) {
    return fetch({
        url: `/login?name=${data}`,
        method: 'get'
    });
}

// main
export function getList(data) {
    return fetch({
        url: '/data',
        method: 'post',
        data: data
    });
}