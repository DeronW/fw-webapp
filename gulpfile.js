var gulp = require('gulp');
var del = require('del');

// Require all tasks in gulp/tasks, including subfolders
require('require-dir')('./gulp/tasks', {recurse: true});

gulp.task('default', function () {
    console.log("This is all task we got:");
    for (taskName in gulp.tasks) {
        if (gulp.tasks.hasOwnProperty(taskName)) console.log(taskName);
    }
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function () {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['build', 'dest', 'dist']);
});

gulp.task('package:mall', ['mall', 'activity', 'mine', 'my-order', 'order-detail', 'product_detail', 'products', 'vip_zone', 'privilege']);

// package mall file
//gulp.task('package:mall', gulp.series(['mall', 'mine'], function () {
//    gulp.src(['build/**']).pipe(gulp.dest('cdn'));
//}));