var gulp = require('gulp');
const gt = require('./tasks');

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});

const MAIN_APP_NAMES = [
    'user-level',
    'user-contribute'
];
MAIN_APP_NAMES.forEach(function (i) {
    gt('main', i, {
        api_path: "http://m.9888.cn:8080",
        include_components: ['loading.jsx', 'alert.jsx'],
        include_common_js: ['javascripts/main/fw-ajax-error-handler.js']
    });
    gt('main', i, {
        api_path: "http://m.9888.cn",
        debug: false,
        html_minify: true,
        cmd_prefix: 'pack',
        cdn_prefix: '/static/wap/' + i + '/',
        include_components: ['loading.jsx', 'alert.jsx'],
        include_common_js: ['javascripts/main/fw-ajax-error-handler.js'],
        enable_revision: true
    });
});

const MALL_APP_NAMES = [
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
    'product-recharge',
    'waiting',
    'fail',
    'not-support',
    'deliver-address',
    'new-deliver-address',
    'product-vip-list',
    'error-page'
];

MALL_APP_NAMES.forEach(function (i) {
    gt('mall', i, {
        api_path: 'http://m2mall.9888.cn/',
        html_engine: 'swig',
        include_components: ['mall/header.jsx', 'loading.jsx', 'alert.jsx'],
        include_common_js: ['javascripts/mall/fw-ajax-error-handler.js'],
        width_swipe: true
    });
    gt('mall', i, {
        debug: false,
        cmd_prefix: 'pack',
        html_engine: 'swig',
        api_path: 'http://mmall.9888.cn/',
        cdn_prefix: '/pages/' + i + '/',
        html_minify: true,
        include_components: ['mall/header.jsx', 'loading.jsx', 'alert.jsx'],
        include_common_js: ['javascripts/mall/fw-ajax-error-handler.js'],
        width_swipe: true,
        enable_watch: false,
        enable_server: false,
        enable_revision: true
    });
});

gulp.task('build:main', gulp.series(MAIN_APP_NAMES.map((name) => `main:pack:${name}:revision`)));
gulp.task('build:mall', gulp.series(MALL_APP_NAMES.map((name) => `mall:pack:${name}:revision`)));
