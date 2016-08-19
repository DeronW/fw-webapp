var gulp = require('gulp');
const gt = require('./tasks');

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});

const MAIN_APP_NAMES = [
    'user-level',
    'user-contribute',

    // 徽商相关页面
    'bind-bank-card',
    'hui-shang-bank',
    'hui-shang-user',
    'bind-card',
    'before-input',
    'personal-center',
    'recharge',
    'first-page',
    'cash',
    'special-cash',
    'verify-identity',

    // 旧页面重构
    'home',
    'about-us',
    'app-download'
];
MAIN_APP_NAMES.forEach(function (i) {

    var common_components = [
        'loading.jsx', 'alert.jsx', 'main/header.jsx', 'toast.jsx',
        'banner-group.jsx', 'circle-progress.jsx'
    ];
    var common_js = ['javascripts/main/fw-ajax-error-handler.js'];

    gt('main', i, {
        debug: true,
        api_path: "http://localhost/fake-api/",
        include_components: common_components,
        include_common_js: common_js
    });
    gt('main', i, {
        api_path: "http://m.9888.cn",
        cmd_prefix: 'pack',
        cdn_prefix: '/static/wap/' + i + '/',
        include_components: common_components,
        include_common_js: common_js
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
    'product-vip-zone',
    'product-recharge',
    'waiting',
    'fail',
    'not-support',
    'deliver-address',
    'new-deliver-address',
    'error-page',
    'gamble-nine',
    'new-home'
];

MALL_APP_NAMES.forEach(function (i) {
    var common_components = [
        'mall/header.jsx', 'loading.jsx', 'alert.jsx', 'banner-group.jsx',
        'toast.jsx'
    ];
    var common_js = ['javascripts/mall/fw-ajax-error-handler.js'];

    gt('mall', i, {
        debug: true,
        api_path: 'http://10.105.6.73:8081/',
        include_components: common_components,
        include_common_js: common_js,
        width_swipe: true
    });

    gt('mall', i, {
        cmd_prefix: 'pack',
        api_path: 'http://mmall.9888.cn/',
        cdn_prefix: '/pages/' + i + '/',
        include_components: common_components,
        include_common_js: common_js,
        width_swipe: true
    });
});

gulp.task('build:main', gulp.series(MAIN_APP_NAMES.map((name) => `main:pack:${name}:revision`)));
gulp.task('build:mall', gulp.series(MALL_APP_NAMES.map((name) => `mall:pack:${name}:revision`)));
gulp.task('build:test-mall', gulp.series(MALL_APP_NAMES.map((name) => `mall:${name}`)));
