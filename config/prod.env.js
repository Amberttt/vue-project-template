'use strict'
// npm run buildTest 打包测试环境
const target = process.env.npm_lifecycle_event;
// 测试
const test = {
    NODE_ENV: '"test"',
    BASE_API: '"http://test.com:8080"'
}
// 线上
const production = {
    NODE_ENV: '"production"',
    BASE_API: '"http://production.com:8080"'
};

module.exports = target == 'build' ? production : test;