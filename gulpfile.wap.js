/*
 主站移动端页面配置
 包含了主站移动端新增的页面
 */
const WAP_APP_NAMES = [

    /* 测试徽商, 不发布其他页面, 加速发布过程 */
    // 旧页面重构
    'home', // 首页
    'about-us', // 关于我们
    'faq', // 帮助中心

    // 新增页面
    'user-level', // 用户等级详情
    'user-contribute', // 用户贡献值
	'notice-safeguard',// 资金安全保障

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
    'protocol-trusteeship', // 资金托管协议
    'protocol-counseling', // 咨询服务协议

    'protocol-special-recharge', // 特殊用户充值协议
    'protocol-special-cash', // 特殊提现协议
    'protocol-special-bind', // 特殊绑定银行卡协议

    // 专题页面
    'topic-hui-shang', // 徽商专题页面
    'topic-hui-shang-guide',//徽商用户引导页面
    'topic-score', // 玩转工分
    'topic-interest-reward', // 年化加息奖励
    'topic-recommender-recruitment', //推荐人页面
    'topic-annual-commision',//年化佣金页面
    'topic-invite',//邀请返利, 邀请人,
    'vip-prerogative', // VIP特权详情页
    'guide-cookbook', // 用户使用引导页面
    'app-download', // app 下载页面

    //圈子相关页面
    'circle-tender-complete',//直融标成功
    'circle-transfer-complete',//债券转让成功
    'circle-register-complete',//签到成功
    'circle-team-data',//小队数据
    'circle-person-data',//个人数据
    'circle-score-stream',//工分流水
    'notice-corporate-structure'
];

module.exports = function (gulp, generate_task, CONSTANTS) {
    WAP_APP_NAMES.forEach(function (i) {
        var common_components = [
            'loading.jsx', 'alert.jsx', 'wap/header.jsx', 'toast.jsx',
            'banner-group.jsx', 'circle-progress.jsx', 'confirm.jsx'
        ];
        var common_js = ['javascripts/wap/fw-ajax-error-handler.js'];

        generate_task('wap', i, {
            debug: true,
            api_path: CONSTANTS.wap.dev_api_path,
            include_components: common_components,
            include_common_js: common_js
        });
        generate_task('wap', i, {
            api_path: "http://m.9888.cn/",
            cmd_prefix: 'pack',
            cdn_prefix: '/static/wap/' + i + '/',
            include_components: common_components,
            include_common_js: common_js
        });
    });

    gulp.task('build:wap', gulp.series(WAP_APP_NAMES.map((name) => `wap:pack:${name}:revision`)));
};