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

    /* 测试徽商, 不发布其他页面, 加速发布过程 */
    // 旧页面重构
    'home', // 首页
    'about-us', // 关于我们

    // 新增页面
    'vip-prerogative', // VIP特权详情页
    'guide-cookbook',
    'app-download',
    'user-level', // 用户等级详情
    'user-contribute', // 用户贡献值

    // 徽商相关页面
    'bind-bank-card', // 绑定银行卡
    'change-bank-card', // 修改绑定银行卡
    'open-account', // 新老用户开户页面
    'hui-shang-account', // 徽商存管帐户
    'set-deal-password', // 设置交易密码
    'reset-deal-password', //第二次设置交易密码
    'open-account-complete', // 徽商开户成功页面
    'hui-shang-cash-flow', // 徽商资金流水列表
    'register-success', // 新用户注册成功后跳转落地页
    'open-account-fail', //开户失败
    'recharge-recording', // 充值记录, 暂未启用
    'recharge', // 给金融工场账户充值
    'cash',
    'hs-topic', //徽商专题页面
    'protocol-trusteeship', // 资金托管协议
    'protocol-counseling', // 咨询服务协议
];
MAIN_APP_NAMES.forEach(function (i) {

    var common_components = [
        'loading.jsx', 'alert.jsx', 'main/header.jsx', 'toast.jsx',
        'banner-group.jsx', 'circle-progress.jsx'
    ];
    var common_js = ['javascripts/main/fw-ajax-error-handler.js'];

    gt('main', i, {
        debug: true,
        api_path: "http://pengyan.9888.cn/",
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
    'gamble-nine',
    'product-category'
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
        cdn_prefix: '/static/mall/' + i + '/',
        include_components: common_components,
        include_common_js: common_js
    });
});

gulp.task('build:main', gulp.series(MAIN_APP_NAMES.map((name) => `main:pack:${name}:revision`)));
gulp.task('build:mall', gulp.series(MALL_APP_NAMES.map((name) => `mall:pack:${name}:revision`)));