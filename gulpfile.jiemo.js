const PROJ = 'jiemo';

let APP_NAMES = [
    'home', // 首页
];

// 用户模块
const USER_PAGES = [
    'register-login-entry',
    'register',
    'login',
    'my',
    'advice-complaints',
    'set-cash-card',
    'verify-identidy',
    'verify-phone',
    'bank-support',
	'bank-management'
]

// 账单模块
const BILL_PAGES = [
    'bill', //账单首页
    'bill-history-bill', //历史账单
    'bill-detail', //账单详情
    'bill-payback', //还款页面
]

// 申请借款模块
const APPLY_PAGES = [
    'apply-loan', //借款首页
    'apply-want-loan', //我要借款页面
    'apply-confirm-loan', //确认借款页面
    'apply-service-agreement', //芥末借款页面
    'apply-withhold-service-agreement', //芥末借款服务协议页面
    'apply-loan-result', //借款结果页面
]

APP_NAMES.push(
    ...USER_PAGES,
    ...BILL_PAGES,
    ...APP_NAMES
)

module.exports = function (gulp, generate_task, CONSTANTS) {
    let INCLUDE_COMPONENTS = [
        'use-strict.jsx', `${PROJ}/header.jsx`, `${PROJ}/bottom-nav-bar.jsx`,
        'loading.jsx', 'alert.jsx', 'banner-group.jsx', 'toast.jsx',
    ];

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
            api_path: '//jiemodai.com/',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map((i) => `${PROJ}:pack:${i.name || i}:revision`)));
};
