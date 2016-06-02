var gulp = require('gulp');
var del = require('del');
var task_mall = require('./gulp/tasks/mall');

// Require all tasks in gulp/tasks, including subfolders
require('require-dir')('./gulp/tasks', {recurse: true});

gulp.task('default', function (done) {
    console.log(require('archy')(gulp.tree()));
    done();
});

gulp.task('clean', function () {
    return del(['build', 'dest', 'dist', 'cdn'])
});

gulp.task('build:mall', gulp.series(['clean'].concat(task_mall.PACK_TASKS)));
