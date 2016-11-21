var gulp = require('gulp');

const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

module.exports = image = function (src_path, build_path) {
    return gulp.src(src_path)
        .pipe(changed(build_path))
        // .pipe(imagemin()) // 在打包过程中对图片进行的压缩并没有实现太多节省流量的目的, 暂不启用
        .pipe(gulp.dest(build_path));
};