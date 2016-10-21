let gulp = require('gulp');
const gt = require('./tasks');

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});

// 从当前环境中加载配置选项, 如果没有加载到就是用默认配置
let CONSTANTS; // 本地配置选项
try {
    CONSTANTS = require('./gulpfile.settings.js');
} catch (e) {
    CONSTANTS = {
        main: {    
            dev_api_path: 'http://localhost/fake-api/'
        },                                        
        mall: {
            dev_api_path: 'http://localhost/fake-api/'
        }
    }
}

// gulpfile 本地扩展配置
require('./gulpfile.main.js')(gulp, gt, CONSTANTS);
require('./gulpfile.mall.js')(gulp, gt, CONSTANTS);