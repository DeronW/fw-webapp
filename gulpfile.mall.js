/*
 商城移动端页面
 */
const MALL_APP_NAMES = [
    'home', // 首页
    'activity', // 专题活动页
    'user',
    'new-user',
    'add-bank-card',
    'my-bank-card',
    'verify-bank-card',
    'send-msg-pay',
    'send-msg-bind',
    'new-order-confirm',
    'life-service',
    'service-bill',
    'hot-activity',
    'footprint',
	'user-setting',
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

    'fail',
    'not-support',
    'deliver-address',
    'new-deliver-address',

    // 特殊页面
    'guoqing',
    'zhuanpan20161024',
    'user-prize-record',
    'game-guess',
    'game',
    'old-game',
    'zhuanpan20161215',
    {
        name: 'waiting',
        describe: '建设中 页面',
        include_components: ['mall/header.jsx'],
        include_common_js: []
    }
];

module.exports = function (gulp, generate_task, CONSTANTS) {
    MALL_APP_NAMES.forEach(function (i) {
        var include_components = [
            'use-strict.jsx', 'mall/header.jsx', 'mall/bottom-nav-bar.jsx',
            'loading.jsx', 'alert.jsx', 'banner-group.jsx', 'toast.jsx'
        ];

        let include_javascripts = [
            'javascripts/use-strict.js',
            'javascripts/mall/fw-ajax-error-handler.js',
            'javascripts/mall/fw-common.js'
        ];

        generate_task('mall', i, {
            debug: true,
            api_path: CONSTANTS.mall.dev_api_path,
            include_components: include_components,
            include_javascripts: include_javascripts
        });

        generate_task('mall', i, {
            cmd_prefix: 'pack',
            api_path: '//mmall.9888.cn/',
            cdn_prefix: `/static/mall/${i.name || i}/`,
            include_components: include_components,
            include_javascripts: include_javascripts
        });
    });

    gulp.task('build:mall', gulp.series(MALL_APP_NAMES.map((i) => `mall:pack:${i.name || i}:revision`)));
};
