const eslint = require('gulp-eslint');

const PROJ = 'jiemo';

let APP_NAMES = [
    'home', // 首页
];

// 用户模块
const USER_PAGES = [
    'user-register-login-entry', //注册登录入口
    'user-register',//注册入口
    'user-login', //登录入口
    'user', //我
    'user-set-cash-card',//设置提现卡
    'user-verify-identidy',//
    'user-verify-phone',
	'user-about-us', //关于我们
	'user-faq',//常见问题
    'user-bank-support',//支持银行卡
	'user-bank-management',//银行卡管理
	'user-more' //更多
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
    'apply-withhold-service-agreement' //芥末借款服务协议页面
]

const DEVELOPING_PAGES = [
    'user-apply-loan', //
    'user-verify-identidy',//
    'user-verify-phone',
]

APP_NAMES.push(
    ...USER_PAGES,
    ...BILL_PAGES,
    ...APPLY_PAGES,
    ...APP_NAMES,
    ...DEVELOPING_PAGES
)

module.exports = function (gulp, generate_task, CONSTANTS) {
    let INCLUDE_COMPONENTS = [
        'use-strict.jsx', `${PROJ}/header.jsx`, `${PROJ}/bottom-nav-bar.jsx`,
        'loading.jsx', 'alert.jsx', 'banner-group.jsx', 'toast.jsx',
    ];

    let INCLUDE_LESS = [
        `${PROJ}/*.less`
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
            include_less:INCLUDE_LESS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });

        generate_task(PROJ, i, {
            cmd_prefix: 'pack',
            api_path: '//jiemodai.com/',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
            include_components: INCLUDE_COMPONENTS,
            include_less:INCLUDE_LESS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map((i) => `${PROJ}:pack:${i.name || i}:revision`)));
    gulp.task(`lint:${PROJ}`, gulp.series(() => {
        return gulp.src([
            `apps/${PROJ}/**/*.+(js|jsx)`, '!node_modules/**',
            '!**/jquery.*.js'])
            .pipe(eslint())
            .pipe(eslint.result(result => {
                console.log(
                    `\nESLint result: ${result.filePath}\n`,
                    `# Messages: ${result.messages.length}\n`,
                    `# Warnings: ${result.warningCount}\n`,
                    `# Errors: ${result.errorCount}\n`
                );
            }))
            .pipe(eslint.format())
    }))
};
