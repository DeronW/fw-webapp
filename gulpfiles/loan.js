const eslint = require('gulp-eslint');

const PROJ = 'loan';

let APP_NAMES = [
    // 'home', // 首页
    // 'more', //更多 been refactory
    // 'faq', //常见问题 been refactory
    // 'about-us', //关于我们 been refactory
    // '404'
];

// 用户模块
const USER_PAGES = [
    // 'user', //我 // should removed
    'user-info', // 个人信息设置
    'user-card-set', //设置提现卡
    'user-card-add', //添加提现卡
    'user-verify-phone', //获取验证码
    'user-bank-support', //支持银行卡
    'user-card-management', //银行卡管理
    // 'user-jrgc-login', // 金融工场 App 同步登录页面
    'user-weixin-fxhapp',
    'user-weixin-jrgcapp',
    'user-weixin-new-download',
    // 'user-red-packet', //红包  moved to account SPA page
    // 'user-red-packet-detail', //红包明细
    // 'user-red-packet-result'

]

// // 金融工场APP页面
// const JRGC_PAGES = [
//     'fxh-jrgc-invite', //放心花金融工场邀请页面
//     'fxh-jrgc-invite-banner', //放心花金融工场邀请页面(banner入口)
// ]

// 合作方页面
const OUTSIDE_PAGES = [
    'outside-register', // 放心花注册页面
    'outside-register-success-wx',
    'outside-register-success-app',
    'outside-register-success-other-apps',
]

// 账单模块
const BILL_PAGES = [
    // 'bill', //账单首页 // should removed
    // 'bill-history', //历史账单 // depracated
    'bill-payback', //还款页面
    // 'repayment-record' //还款列表页面
]

// 申请借款模块
const APPLY_PAGES = [
    'apply-want', //我要借款页面
    'apply-confirm', //确认借款页面
    'apply-result'
]

// 借款服务协议页面
// const PROTOCOL_PAGES = [
//     'protocol-cost', // 代扣协议
//     'protocol-borrowing', // 借款服务协议
//     'protocol-partner', // 借款协议双方
//     'protocol-personinfo-collect', //个人信息采集授权声明
//     'protocol-dumiao-openaccount', //读秒开户授权书
// ]

const FXH_PAGES = [
    'fxh', // 掌众产品借款页面
    'fxh-bill', //账单详情
]

const DU_MIAO_PAGES = [
    'dumiao', // 读秒产品借款页面
    'dumiao-put-in', // 读秒进件页面
    'dumiao-bill', //读秒账单详情页
]

const WEIXIN_PAGES = [
    'weixin-download',
    'weixin-invite',
    'weixin-attention',
    'weixin-invite4app', // 给app做的临时活动规则页面, 静态页面, 没有功能
]

// const MARKET = [
//     'market',
//     'market-detail'
// ]

// const CREDIT_CARD = [
//     'credit-card-products'
// ]

// const MORTGAGE = [
//     'house-mortgage',
//     'outside-mortgage-apply-ten-million-loan',
//     'outside-mortgage-ten-million-loan-info',
//     'outside-mortgage-id-download'
// ]

const REFACTORY_PAGES = [{
    name: 'features', // 更多页面 , 包含 联系我们/关于我们/常见问题/退出功能
    compiler: 'webpack'
}, {
    name: 'account',
    compiler: 'webpack'
}, {
    name: '3rd', // 第三方授权页面, 包括JRGC的特殊登录
    compiler: 'webpack'
}, {
    name: 'products',
    compiler: 'webpack'
}]

APP_NAMES.push(
    ...USER_PAGES,
    ...BILL_PAGES,
    ...OUTSIDE_PAGES,
    ...APPLY_PAGES,
    ...APP_NAMES,
    // ...PROTOCOL_PAGES,
    // ...JRGC_PAGES,
    ...WEIXIN_PAGES,
    ...FXH_PAGES,
    ...DU_MIAO_PAGES,
    // ...CREDIT_CARD,
    // ...MORTGAGE,
    ...REFACTORY_PAGES
    // ...AUTH_PAGES
);


module.exports = function(gulp, generate_task, CONSTANTS) {

    let default_options = {
        include_components: [
            'use-strict.jsx', `${PROJ}/header.jsx`,
            `${PROJ}/bottom-nav-bar.jsx`,
            `${PROJ}/product-display.jsx`,
            'confirm.jsx', 'nav.jsx',
            'loading.jsx', 'alert.jsx',
            'banner-group.jsx', 'toast.jsx',
        ],
        include_less: [
            `${PROJ}/common.less`
        ],
        include_javascripts: [
            'use-strict.js',
            `${PROJ}/fw-plugin-cryption.js`,
            `${PROJ}/fw-plugin-cookie.js`,
            `${PROJ}/fw-ajax-error-handler.js`,
            `${PROJ}/fw-common.js`,
            `${PROJ}/fw-plugin-store.js`,
            `${PROJ}/fxh.js`,
            `${PROJ}/fw-plugin-theme.js`
        ]
    }

    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, Object.assign({}, default_options, {
            debug: true,
            api_path: CONSTANTS[PROJ].dev_api_path
        }))

        generate_task(PROJ, i, Object.assign({}, default_options, {
            cmd_prefix: 'pack',
            api_path: '',
            environment: 'production',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
        }))
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