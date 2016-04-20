var gulp = require('gulp');
var del = require('del');

// Require all tasks in gulp/tasks, including subfolders
require('require-dir')('./gulp/tasks', {recurse: true});

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});

gulp.task('clean', function () {
    return del(['build', 'dest', 'dist', 'cdn'])
});

// package mall file
gulp.task('build:mall', gulp.series(
    [
        'clean',
        'pack:mall',
        'pack:activity',
        'pack:user',
        'pack:order-list',
        'pack:order-detail',
        'pack:order-confirm',
        'pack:product-detail',
        'pack:product-list',
        'pack:product-vip',
        'pack:vip',
        'pack:deliver-address',
        'pack:new-deliver-address',
        'pack:vip-grade',
        'pack:fail',
        'pack:success'
    ],
    function (done) {
        gulp.src(['build/**']).pipe(gulp.dest('cdn'));
        done();
    })
);
