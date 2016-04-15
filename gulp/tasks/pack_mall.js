var gulp = require('gulp');
var gt = require('../generate_task.js');

var apps = ['mall', 'activity', 'mine', 'order-list', 'order-detail', 'order-confirm', 'product-detail', 'product-list', 'vip'];

apps.forEach(function (i) {
    gt(i, {
        cmd_prefix: 'pack:',
        api_path: 'http://m.mall.9888.cn/',
        static_path: '/pages/' + i + '/',
        enable_watch: false,
        enable_server: false,
        enable_revision: false
    })
});


gulp.task('build:mall', apps.map(function(i){return 'pack:' + i}));