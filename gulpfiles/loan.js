const eslint = require('gulp-eslint');

const PROJ = 'loan';

let APP_NAMES = [
    'user-card-set', //设置提现卡
    'user-card-add', //添加提现卡
    'user-verify-phone', //获取验证码
    'user-bank-support', //支持银行卡
    'user-card-management', //银行卡管理

    'dumiao', // 读秒产品借款页面
    'dumiao-put-in', // 读秒进件页面
    'dumiao-bill', //读秒账单详情页
]

module.exports = function (gulp, generate_task, CONSTANTS) {

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
