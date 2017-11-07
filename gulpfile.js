'use strict';

let gulp = require('gulp');
const util = require('gulp-util');
const gt = require('./tasks');

gulp.task('default', function (done) {
    util.log(require('archy')(gulp.tree()))
    done()
})

// 从当前环境中加载配置选项, 如果没有加载到就是用默认配置
let settings = {}; // 本地配置选项
try {
    settings = require('./gulpfile.settings.js')
} catch (e) { }

const CONSTANTS = Object.assign({},
    require('./gulpfiles/settings.default.js'), settings);

// gulpfile 本地扩展配置
require('./gulpfiles/wap.js')(gulp, gt, CONSTANTS)
require('./gulpfiles/mall.js')(gulp, gt, CONSTANTS)
// require('./gulpfiles/activity.js')(gulp, gt, CONSTANTS)
// require('./gulpfiles/insurance.js')(gulp, gt, CONSTANTS)
require('./gulpfiles/jrgc.js')(gulp, gt, CONSTANTS)
