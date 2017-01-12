const PROJ = 'jiemo';

let APP_NAMES = [
    'home', // 首页
    'advice-complaints',
    'bank-support',
	'bank-management'
];

// 用户模块
const USER_PAGES = [
    'user-register-login-entry',
    'user-register',
    'user-login',
    'user-apply-loan',
    'user-my',
    'user-set-cash-card',
    'user-verify-identidy',
    'user-verify-phone',
	'user-aboutus',
	'user-FAQ'
]

// 账单模块
const BILL_PAGES = [
    'bill',
    'bill-history-bill',
    'bill-detail',
    'bill-payback',
]

// 申请借款模块
const APPLY_PAGES = [
    'apply-want-loan',
    'apply-confirm-loan',
    'apply-service-agreement',
    'apply-withhold-service-agreement',
    'apply-loan-result',
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
