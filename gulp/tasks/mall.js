var gulp = require('gulp');
var gt = require('../util/generate_task.js');

var apps = [
    'mall',
    'activity',
    'user',
    'order-list',
    'order-detail',
    'order-confirm',
    'product-detail',
    'product-list',
    'product-vip',
    'waiting',
    'fail',
    'success',
    'deliver-address',
    'new-deliver-address'
];

apps.forEach(function (i) {
    gt(i, {
        api_path: 'http://m2mall.9888.cn/'
    });
    gt(i, {
        debug: false,
        cmd_prefix: 'pack:',
        api_path: 'http://mmall.9888.cn/',
        static_path: '/pages/' + i + '/',
        enable_watch: false,
        enable_server: false,
        enable_revision: false
    });
});