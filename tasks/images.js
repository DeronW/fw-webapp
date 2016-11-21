var gulp = require('gulp');

const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

module.exports = image = function (src_path, build_path) {
    return gulp.src(src_path)
        .pipe(changed(build_path))
        // .pipe(imagemin()) // 图片压缩并没有实现节省流量的目的, 暂不启用
        .pipe(gulp.dest(build_path));
};