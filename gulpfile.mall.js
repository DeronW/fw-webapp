/* 商城移动端页面 */
const PROJ = 'mall';

var INCLUDE_COMPONENTS = [
    'use-strict.jsx', `${PROJ}/header.jsx`, `${PROJ}/bottom-nav-bar.jsx`,
    'loading.jsx', 'alert.jsx', 'banner-group.jsx', 'toast.jsx'
];

let INCLUDE_JAVASCRIPTS = [
    'use-strict.js',
    `${PROJ}/fw-ajax-error-handler.js`,
    `${PROJ}/fw-common.js`
];


const APP_NAMES = [
    'home', // 首页
    'activity', // 专题活动页
    'user',
    'add-bank-card',
    'my-bank-card',
    'verify-bank-card',
    'send-msg-pay',
    'send-msg-bind',
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
    'logistics',
    'coupon',
    'voucher',
    // 产品相关页面
    'product-detail',
    'product-list',
    'product-vip-zone',
    'product-recharge',
    'product-category',

    'not-support',
    'deliver-address',

    'user-prize-record',
    // 游戏
    'game-guess',//猜拳
    'game',//游戏中心
    //'zhuanpan20161215',//转盘20161215
    'game-red-rain',//2017过年红包雨
    'game-zhuanpan20161230',//20161230转盘活动
    // 特殊页面
    {
        name: 'waiting',
        describe: '建设中 页面',
        include_components: [`${PROJ}/header.jsx`],
        include_common_js: []
    }
];

module.exports = function (gulp, generate_task, CONSTANTS) {
    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, {
            debug: true,
            api_path: CONSTANTS[PROJ].dev_api_path,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });

        generate_task(PROJ, i, {
            cmd_prefix: 'pack',
            api_path: '//mmall.9888.cn/',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map((i) => `${PROJ}:pack:${i.name || i}:revision`)));
};
