const gulp = require('gulp');
const changed = require('gulp-changed');  // Only pass through changed files
const plumber = require('gulp-plumber'); // Prevent pipe breaking caused by errors from gulp plugins
const plugins = require('gulp-load-plugins')(); // Loads gulp plugins from package dependencies and attaches them to an object
const babel = require('gulp-babel');
const js_uglify = require('gulp-uglify');
const concat = require('gulp-concat');

module.exports = react = function (src_path, build_path, name, debug) {
    return gulp.src(src_path)
        .pipe(changed(build_path))
        .pipe(plumber())
        .pipe(babel({presets: ['es2015', 'react']}))
        .pipe(debug ? plugins.util.noop() : js_uglify())
        .pipe(concat(name, {newLine: ';'}))
        .pipe(gulp.dest(build_path));
};
