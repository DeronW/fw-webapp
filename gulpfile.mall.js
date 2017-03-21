const eslint = require('gulp-eslint');

const PROJ = 'mall';

let APP_NAMES = [
    'home', // 首页
    // 专题/活动 相关页面
    'activity', // 专题活动页
    {
        name: 'waiting',
        describe: '敬请期待页',
        include_components: [`${PROJ}/header.jsx`]
    },
];

const USER_PAGES = [
    'user',
    'user-setting',
    'user-prize-record',
    'user-voucher',
    'user-deliver-address',
    'user-build-deliver',
    'user-help',
	// 'user-register',
	// 'user-register-1',
	'user-login',
	'user-coupon',
]

const PRODUCT_PAGES = [
    // 产品相关页面
    'product-detail',
    'product-list',
    'product-vip-zone',
    'product-recharge',
    'product-category',
    'product-hot-activity',
]

const CART_PAGES = [
    // 购物车相关页面
    'cart'
]

const ORDER_PAGES = [
    // 订单页面
    'order-list',
    'order-detail',
    'order-confirm',
    'order-complete',
    'order-logistics',
    'order-coupon',
]

const PAYMENT_PAGES = [
    // 支付相关页面
    'payment',
    'pay-add-card',
    'pay-bank-card',
    'pay-verify-bank',
    'pay-msg-pay',
    'pay-msg-bind',
]

const GAME_PAGES = [
    'game', //游戏中心
    'game-guess', //猜拳
    // 'game-red-rain', //红包雨
    'game-zhuanpan20161230',//2016-12-30号转盘
]

const DEVELOPING_PAGES = [
    // 开发中页面, 下一个测试版本
    'service-livelihood', // 生活服务
    'service-bill', //
    'user-footprint', // 用户足迹, 浏览过的商品页面
]

const TRASH_PAGES = [
    // 'game-red-rain', //2017过年红包雨
]

APP_NAMES.push(
    ...USER_PAGES,
    ...PRODUCT_PAGES,
    ...ORDER_PAGES,
    ...PAYMENT_PAGES,
    ...CART_PAGES,
    ...GAME_PAGES,
    ...DEVELOPING_PAGES
);

module.exports = function (gulp, generate_task, CONSTANTS) {

    let INCLUDE_COMPONENTS = [
        'use-strict.jsx', `${PROJ}/header.jsx`, `${PROJ}/bottom-nav-bar.jsx`,
        'loading.jsx', 'alert.jsx', 'banner-group.jsx', 'toast.jsx'
    ];

    let INCLUDE_LESS = [
        'less/mall/mall.less'
    ]

    let INCLUDE_JAVASCRIPTS = [
        'use-strict.js',
        `${PROJ}/fw-ajax-error-handler.js`,
        `${PROJ}/fw-common.js`
    ];

    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, {
            debug: true,
            api_path: CONSTANTS[PROJ].dev_api_path,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });

        generate_task(PROJ, i, {
            cmd_prefix: 'pack',
            api_path: process.env.API_PATH || '/',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map((i) => `${PROJ}:pack:${i.name || i}:revision`)));
    gulp.task(`lint:${PROJ}`, gulp.series(() => {
        return gulp.src([
            `apps/${PROJ}/**/*.+(js|jsx)`,
            '!node_modules/**',
            '!**/jquery.*.js',
            '!**.min.js'
        ]).pipe(eslint()).pipe(eslint.format());
    }))
};
