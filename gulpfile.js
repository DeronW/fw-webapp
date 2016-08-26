var gulp = require('gulp');
const gt = require('./tasks');

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});


/*
 主站移动端页面配置
 包含了主站移动端新增的页面
 */
const MAIN_APP_NAMES = [
    'user-level', // 用户等级详情
    'user-contribute', // 用户贡献值

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
    'home', // 首页
    'about-us', // 关于我们
    'vip-prerogative', // VIP特权详情页
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
        api_path: "http://m.9888.cn/",
        cmd_prefix: 'pack',
        cdn_prefix: '/static/wap/' + i + '/',
        include_components: common_components,
        include_common_js: common_js
    });
});


/*
 商城移动端页面
 */
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
    'new-home',
    'product-category',
    'product-search'
];

MALL_APP_NAMES.forEach(function (i) {
    var common_components = [
        'mall/header.jsx', 'loading.jsx', 'alert.jsx', 'banner-group.jsx',
        'toast.jsx'
    ];
    var common_js = ['javascripts/mall/fw-ajax-error-handler.js'];

    gt('mall', i, {
        debug: true,
        api_path: 'http://localhost/',
        include_components: common_components,
        include_common_js: common_js
    });

    gt('mall', i, {
        cmd_prefix: 'pack',
        api_path: 'http://mmall.9888.cn/',
        cdn_prefix: '/pages/' + i + '/',
        include_components: common_components,
        include_common_js: common_js
    });
});

// START
// 针对九宫格游戏, 单独配置打包过程
var nine = 'gamble-nine';
gt('mall', nine, {
    debug: true,
    api_path: 'http://localhost/',
    include_components: ['mall/header.jsx', 'loading.jsx', 'alert.jsx', 'banner-group.jsx', 'toast.jsx'],
    include_common_js: ['javascripts/mall/fw-ajax-error-handler.js']
});

gt('mall', nine, {
    cmd_prefix: 'pack',
    api_path: 'http://mmall.9888.cn/',
    cdn_prefix: '/static/mall/' + nine + '/',
    include_components: ['mall/header.jsx', 'loading.jsx', 'alert.jsx', 'banner-group.jsx', 'toast.jsx'],
    include_common_js: ['javascripts/mall/fw-ajax-error-handler.js']
});
// 针对九宫格游戏, 单独配置打包过程
// END


gulp.task('build:main', gulp.series(MAIN_APP_NAMES.map((name) => `main:pack:${name}:revision`)));
gulp.task('build:mall', gulp.series(MALL_APP_NAMES.concat([nine]).map((name) => `mall:pack:${name}:revision`)));
gulp.task('build:test-mall', gulp.series(MALL_APP_NAMES.map((name) => `mall:${name}`)));
