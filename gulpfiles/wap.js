const eslint = require('gulp-eslint');

const PROJ = 'wap';

let APP_NAMES = [
];

const USER_PAGES = [
    'user-level', // 用户等级详情
]

const TOPIC_PAGES = [
    // 专题页面
    'topic-hui-shang', // 徽商专题页面
    'topic-hui-shang-guide', //徽商用户引导页面
    // 'topic-score', // 玩转工分
    // 'topic-interest-reward', // 年化加息奖励
    'topic-recommender-recruitment', //推荐人页面
    // 'topic-annual-commision', //年化佣金页面
    // 'topic-invite', //邀请返利, 邀请人,
    'topic-gong-you-hui', //工友会专题页面,
    'topic-invite-strategy', //邀请攻略页面
    // 'topic-novice-strategy', //新手策略页面
    // 'topic-invest-school', // 投资学堂
]

const HUISHANG_PAGES = [
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
    'recharge', // 给金融工场账户充值
    'cash', // 用户提现
    'cash-records', // 用户提现记录
    'modification-phone', // 修改银行预留手机号
]

// 守山相关的提现页面
const SHOUSHAN = [
    'shoushan-reset-deal-password',
    'shoushan-cash',
    'shoushan-cash-records'
]

const OUTSIDE_PAGES = [
    'outside-register-aisidi' //爱施德注册页面
]

APP_NAMES.push(
    ...USER_PAGES,
    ...TOPIC_PAGES,
    ...HUISHANG_PAGES,
    ...SHOUSHAN, // 这是给首山提现用的页面
    ...OUTSIDE_PAGES
)


module.exports = function (gulp, generate_task, CONSTANTS) {
    const COMMON_COMPONENTS = [
        'use-strict.jsx', 'loading.jsx', 'alert.jsx', `${PROJ}/header.jsx`,
        'toast.jsx', 'banner-group.jsx', 'circle-progress.jsx', 'confirm.jsx'
    ];

    const INCLUDE_JAVASCRIPTS = [
        'use-strict.js',
        `${PROJ}/fw-ajax-error-handler.js`,
        `${PROJ}/fw-common.js`
    ];

    let default_options = {
        include_components: [
            'use-strict.jsx', 'loading.jsx', 'alert.jsx', `${PROJ}/header.jsx`,
            'toast.jsx', 'banner-group.jsx', 'circle-progress.jsx', 'confirm.jsx'
        ],
        include_javascripts: [
            'use-strict.js',
            `${PROJ}/fw-ajax-error-handler.js`,
            `${PROJ}/fw-common.js`
        ]
    }

    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, Object.assign({}, default_options, {
            debug: true,
            api_path: CONSTANTS[PROJ].dev_api_path,
        }))

        generate_task(PROJ, i, Object.assign({}, default_options, {
            api_path: "",
            cmd_prefix: 'pack',
            environment: 'production',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`
        }))

        gulp.task(`lint:${PROJ}:${i.name || i}`, gulp.series(() => {
            return gulp.src([
                `apps/${PROJ}/${i.name || i}/**/*.+(js|jsx)`,
                '!node_modules/**',
                '!**/jquery.*.js',
                '!**.min.js'
            ]).pipe(eslint()).pipe(eslint.format());
        }))
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map(i => `${PROJ}:pack:${i.name || i}:revision`)))

    gulp.task(`lint:${PROJ}`, gulp.series(APP_NAMES.map(i => `lint:${PROJ}:${i.name || i}`)))

};