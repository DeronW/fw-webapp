var gulp = require('gulp');
var gt = require('../generate_task.js');

const SITE_NAME = 'main';

const APP_NAMES = [
    'user-level',
    'contribute'
];

APP_NAMES.forEach(function (i) {
    gt(SITE_NAME, i, {
        api_path: "http://m.9888.cn:8080",
        include_components: ['loading.jsx', 'alert.jsx'],
        include_common_js: ['javascripts/main/fw-ajax-error-handler.js']
    });
    gt(SITE_NAME, i, {
        api_path: "http://m.9888.cn",
        debug: false,
        html_minify: true,
        cmd_prefix: 'pack',
        cdn_prefix: '/static/wap/' + i + '/',
        include_components: ['loading.jsx', 'alert.jsx'],
        include_common_js: ['javascripts/main/fw-ajax-error-handler.js'],
        enable_revision: true
    });
});

var pack_tasks = [];
APP_NAMES.forEach(function (name) {
    pack_tasks.push(SITE_NAME + ':pack:' + name + ':revision');
});

exports.PACK_TASKS = pack_tasks;
