'use strict';

let gulp = require('gulp');
const util = require('gulp-util');
const gt = require('./tasks');

gulp.task('default', function(done) {
    util.log(require('archy')(gulp.tree()));
    done();
});

// 从当前环境中加载配置选项, 如果没有加载到就是用默认配置
let settings = {}; // 本地配置选项
try {
    settings = require('./gulpfile.settings.js');
} catch (e) {}

const CONSTANTS = Object.assign({}, require('./gulpfile.settings.default.js'), settings);

// gulpfile 本地扩展配置
require('./gulpfile.wap.js')(gulp, gt, CONSTANTS);
require('./gulpfile.mall.js')(gulp, gt, CONSTANTS);
require('./gulpfile.loan.js')(gulp, gt, CONSTANTS);
require('./gulpfile.loan-manager.js')(gulp, gt, CONSTANTS);
require('./gulpfile.withdraw.js')(gulp, gt, CONSTANTS);