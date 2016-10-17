var gulp = require('gulp');
const gt = require('./tasks');

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});


/*
 主站移动端页面配置
 包含了主站移动端新增的页面
 */
const MAIN_APP_NAMES = [

    /* 测试徽商, 不发布其他页面, 加速发布过程 */
    // 旧页面重构
    'home', // 首页
    'about-us', // 关于我们
    'faq', // 帮助中心

    // 新增页面
    'vip-prerogative', // VIP特权详情页
    'guide-cookbook',
    'app-download', // app 下载页面
    'user-level', // 用户等级详情
    'user-contribute', // 用户贡献值

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
    'topic-hui-shang-updating' //徽商升级页面提示
];
MAIN_APP_NAMES.forEach(function (i) {

    var common_components = [
        'loading.jsx', 'alert.jsx', 'main/header.jsx', 'toast.jsx',
        'banner-group.jsx', 'circle-progress.jsx'
    ];
    var common_js = ['javascripts/main/fw-ajax-error-handler.js'];

    gt('main', i, {
        debug: true,
        api_path: "http://xjb.9888.cn/",
        include_components: common_components,
        include_common_js: common_js
    });
    gt('main', i, {
        api_path: "http://m.9888.cn/",
        cmd_prefix: 'pack',
        cdn_prefix: '/static/wap/' + i + '/',
        include_components: common_components,
        include_common_js: common_js
    });
});


/*
 商城移动端页面
 */
const MALL_APP_NAMES = [
    'home',
    'activity',
    'user',

    // 订单页面
    'order-list',
    'order-detail',
    'order-confirm',
    'order-complete',

    // 产品相关页面
    'product-detail',
    'product-list',
    'product-vip-zone',
    'product-recharge',
    'product-category',

    'waiting',
    'fail',
    'not-support',
    'deliver-address',
    'new-deliver-address',
    'error-page',

    // 特殊页面
    'guoqing'
];

MALL_APP_NAMES.forEach(function (i) {
    var common_components = [
        'mall/header.jsx', 'loading.jsx', 'alert.jsx', 'banner-group.jsx',
        'toast.jsx'
    ];
    var common_js = [
        'javascripts/mall/fw-ajax-error-handler.js',
        'javascripts/mall/fw-common.js'
    ];

    gt('mall', i, {
        debug: true,
        api_path: 'http://wenlong.9888.cn/fake-api/',
        include_components: common_components,
        include_common_js: common_js
    });

    gt('mall', i, {
        cmd_prefix: 'pack',
        api_path: 'http://mmall.9888.cn/',
        cdn_prefix: '/static/mall/' + i + '/',
        include_components: common_components,
        include_common_js: common_js
    });
});

gulp.task('build:main', gulp.series(MAIN_APP_NAMES.map((name) => `main:pack:${name}:revision`)));
gulp.task('build:mall', gulp.series(MALL_APP_NAMES.map((name) => `mall:pack:${name}:revision`)));
