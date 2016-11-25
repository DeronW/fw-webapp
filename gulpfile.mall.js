/*
 商城移动端页面
 */
const MALL_APP_NAMES = [
    'home', // 首页
    'activity', // 专题活动页
    'user',
    'new-user',
    'account-setting',
    'add-bank-card',
    'bind-bank-card',
    'verify-bank-card',
    'send-phone-msg',
    'new-order-confirm',
    'life-service',
    'service-bill',
    // 订单页面
    'order-list',
    'order-detail',
    'order-confirm',
    'order-complete',
    'shopping-cart',
    'payment',
    'new-order-detail',
    'new-order-list',
    'logistics',
    'coupon',
    'voucher',
    'new-home',

    // 产品相关页面
	'new-product-detail',
    'product-detail',
    'product-list',
    'product-vip-zone',
    'product-recharge',
    'product-category',

    'waiting',
    'fail',
    'not-support',
    'deliver-address',
    'new-deliver-address',

    // 特殊页面
    'guoqing',
    'zhuanpan20161024',
    'user-prize-record',
    'game-guess'



];

module.exports = function (gulp, generate_task, CONSTANTS) {
    MALL_APP_NAMES.forEach(function (i) {
        var common_components = [
            'mall/header.jsx', 'loading.jsx', 'alert.jsx', 'banner-group.jsx',
            'toast.jsx'
        ];
        var common_js = [
            'javascripts/mall/fw-ajax-error-handler.js',
            'javascripts/mall/fw-common.js'
        ];

        generate_task('mall', i, {
            debug: true,
            api_path: CONSTANTS.mall.dev_api_path,
            include_components: common_components,
            include_common_js: common_js
        });

        generate_task('mall', i, {
            cmd_prefix: 'pack',
            api_path: 'http://mmall.9888.cn/',
            cdn_prefix: '/static/mall/' + i + '/',
            include_components: common_components,
            include_common_js: common_js
        });
    });

    gulp.task('build:mall', gulp.series(MALL_APP_NAMES.map((name) => `mall:pack:${name}:revision`)));
};