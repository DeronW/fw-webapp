const gulp = require('gulp');
const changed = require('gulp-changed');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const less = require('gulp-less');

module.exports = less2css = function (src_path, build_path, name) {
    return gulp.src(src_path)
        .pipe(plumber())
        .pipe(changed(build_path))
        .pipe(less())
        .pipe(concat(name))
        .pipe(cssnano())
        .pipe(gulp.dest(build_path));
};
