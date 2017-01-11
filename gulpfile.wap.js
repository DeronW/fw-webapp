/*
 主站移动端页面配置
 包含了主站移动端新增的页面
 */

const PROJ = 'wap';

const COMMON_COMPONENTS = [
    'use-strict.jsx', 'loading.jsx', 'alert.jsx', `${PROJ}/header.jsx`,
    'toast.jsx', 'banner-group.jsx', 'circle-progress.jsx', 'confirm.jsx'
];

const INCLUDE_JAVASCRIPTS = [
    'use-strict.js',
    `${PROJ}/fw-ajax-error-handler.js`,
    `${PROJ}/fw-common.js`
];


let APP_NAMES = [
    /* 测试徽商, 不发布其他页面, 加速发布过程 */
    // 旧页面重构
    'home', // 首页
    'about-us', // 关于我们
    'faq', // 帮助中心
    'app-download', // app 下载页面

    // test page
    'test-native-bridge',
    'test-statistic-chart',
    //年终总结豆尔摩斯h5宣传页
    'game-year-end'//2016豆尔摩斯h5宣传页
];

const USER_PAGES = [
    // 用户页面
    'user-level', // 用户等级详情
    'user-contribute', // 用户贡献值
    'user-evaluate', // 投资风险承受能力评估

    'vip-prerogative', // VIP特权详情页
    'guide-cookbook', // 用户使用引导页面
]

const PROTOCOL_PAGES = [
    // 协议页面
    'protocol-trusteeship', // 资金托管协议
    'protocol-counseling', // 咨询服务协议
    'protocol-special-recharge', // 特殊用户充值协议
    'protocol-special-cash', // 特殊提现协议
    'protocol-special-bind', // 特殊绑定银行卡协议
]

const CIRCLE_PAGES = [
    //圈子相关页面
    'circle-tender-complete', //直融标成功
    'circle-transfer-complete', //债券转让成功
    'circle-register-complete', //签到成功
    'circle-team-data', //小队数据
    'circle-person-data', //个人数据
    'circle-score-stream', //工分流水
]

const TOPIC_PAGES = [
    // 专题页面
    'topic-hui-shang', // 徽商专题页面
    'topic-hui-shang-guide', //徽商用户引导页面
    'topic-score', // 玩转工分
    'topic-interest-reward', // 年化加息奖励
    'topic-recommender-recruitment', //推荐人页面
    'topic-annual-commision', //年化佣金页面
    'topic-invite', //邀请返利, 邀请人,
    'topic-gong-you-hui', //工友会专题页面
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

const NOTICE_PAGES = [
    // 内容展示页面
    'notice-corporate-structure', // 信息披露 公司结构
    'notice-safeguard', // 资金安全保障
    {
        name: 'notice-risk-prompt', // 风险揭示
        include_components: [],
        include_common_js: []
    },
]

APP_NAMES.push(
    ...USER_PAGES,
    ...PROTOCOL_PAGES,
    ...TOPIC_PAGES,
    ...HUISHANG_PAGES,
    ...NOTICE_PAGES
)

module.exports = function (gulp, generate_task, CONSTANTS) {
    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, {
            debug: true,
            api_path: CONSTANTS[PROJ].dev_api_path,
            include_components: COMMON_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });
        generate_task(PROJ, i, {
            api_path: "//m.9888.cn/",
            cmd_prefix: 'pack',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
            include_components: COMMON_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map((i) => `${PROJ}:pack:${i.name || i}:revision`)));
};
