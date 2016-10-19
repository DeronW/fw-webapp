var gulp = require('gulp');
const fs = require('fs');
const gt = require('./tasks');

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});
try {
    const constants = require('/a.js');
} catch (e) {
    console.log('error')
}

// gulpfile 本地扩展配置
require('./gulpfile.main.js')(gulp, gt);
require('./gulpfile.mall.js')(gulp, gt);

// fs.access(LOCAL_CONFIG, (err) => {
//     if (!err) {
//         let main = require(LOCAL_CONFIG);
//         main.task(main.names, gulp, gt);
//     }
// });