const eslint = require('gulp-eslint');

const PROJ = 'wap';

let APP_NAMES = [
    // 'home', // 首页
    // 'about-us', // 关于我们
    // 'faq', // 帮助中心
    // 'app-download', // app 下载页面
    // 'guide-cookbook', // 用户使用引导页面
    // test page
    // 'test-native-bridge',
    // 'fa-xian',
    // 'coupon-center'
];

const USER_PAGES = [
    // 用户页面
    'user-level', // 用户等级详情
    // 'user-contribute', // 用户贡献值
    // 'vip-prerogative', // VIP特权详情页
    // 'user-evaluate', // 投资风险承受能力评估
    // 'user-evaluate-p2p', //p2p投资风险承受能力评估
    // 'user-evaluate-zx', //尊享投资风险承受能力评估
]


// const NOTICE_PAGES = [
    // 内容展示页面
    // 'notice-corporate-structure', // 信息披露 公司结构
    // 'notice-safeguard', // 资金安全保障
    // 'notice-risk-prompt', // 风险揭示
// ]

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

// const P2P = [
    // 'p2p-invite', //P2P邀请返利, 邀请人
    // 'p2p-interest-reward', //P2P年化加息奖励
    // 'p2p-vip-prerogative',
    // 'p2p-policy', //政策法规页面
    // 'p2p-pdf',
    // 'p2p-fa-xian', //微金发现页面
    // 'p2p-faq', //微金帮助中心页面
    // 'p2p-app-download', //微金app下载页面
    // 'p2p-notice-safeguard', //p2p资金安全保障
    // 'p2p-notice-information-disclosure', //微金信息披露
    // 'p2p-topic-invest-school', //微金投资学堂页面
// ]

APP_NAMES.push(
    ...USER_PAGES,
    ...TOPIC_PAGES,
    // ...HUISHANG_PAGES,
    ...SHOUSHAN, // 这是给首山提现用的页面
    // ...OUTSIDE_PAGES,
    {
        name: 'invest',
        compiler: 'webpack'
    },
    // {
    //     name: 'withdraw',
    //     compiler: 'webpack'
    // },
    {
        name: 'p2p',
        compiler: 'webpack'
    }
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