var gulp = require('gulp');
var gt = require('../generate_task.js');

const SITE_NAME = 'mall';

const APP_NAMES = [
    'home',
    'activity',
    'user',
    'order-list',
    'order-detail',
    'order-confirm',
    'order-complete',
    'product-detail',
    'product-list',
    'product-vip',
    'waiting',
    'fail',
    'not-support',
    'deliver-address',
    'new-deliver-address',
    'error-page'
];

APP_NAMES.forEach(function (i) {
    gt(SITE_NAME, i, {
        api_path: 'http://m2mall.9888.cn/'
    });
    gt(SITE_NAME, i, {
        debug: false,
        cmd_prefix: 'pack',
        api_path: 'http://mmall.9888.cn/',
        cdn_prefix: '/pages/' + i + '/',
        enable_watch: false,
        enable_server: false,
        enable_revision: true
    });
});

var pack_tasks = [];
APP_NAMES.forEach(function (name) {
    pack_tasks.push(SITE_NAME + ':pack:' + name + ':revision');
});


exports.APP_NAMES = APP_NAMES;
exports.PACK_TASKS = pack_tasks;