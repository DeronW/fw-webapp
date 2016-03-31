var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var react = require('gulp-react');
var babel = require('gulp-babel');
var plugins = require('gulp-load-plugins')();

plugins.less = require('gulp-less');
plugins.changed = require('gulp-changed');
plugins.js_uglify = require('gulp-uglify');
plugins.htmlmin = require('gulp-htmlmin');
plugins.cssnano = require('gulp-cssnano');
plugins.rev_all = require('gulp-rev-all');
plugins.concat = require('gulp-concat');
plugins.del = require('del');
plugins.plumber = require('gulp-plumber');
plugins.imagemin = require('gulp-imagemin');
plugins.sourcemaps = require('gulp-sourcemaps');
plugins.rename = require('gulp-rename');

const PROJECT_NAME = 'mall'; // 每次使用新项目时, 只需要更换项目名称

const APP_PATH = `apps/${PROJECT_NAME}/`;
const BUILD_PATH = `build/${PROJECT_NAME}/`;
const LIB_PATH = `lib/`;

gulp.task(PROJECT_NAME, function () {

    gulp.src([`${APP_PATH}**/*.html`])
        .pipe(plugins.changed(BUILD_PATH))
        //.pipe(plugins.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(BUILD_PATH));

    gulp.src([`${APP_PATH}less/index.less`])
        .pipe(plugins.changed(`${BUILD_PATH}css`))
        .pipe(plugins.less())
        .pipe(plugins.cssnano())
        .pipe(plugins.rename('all.css'))
        .pipe(gulp.dest(`${BUILD_PATH}css`));

    gulp.src([
            `${APP_PATH}scripts/components/*.jsx`,
            `${APP_PATH}scripts/index.jsx`
        ])
        .pipe(plugins.changed(`${BUILD_PATH}scripts`))
        .pipe(plugins.plumber())
        .pipe(plugins.babel({
            presets: ['es2015', 'react']
        }))
        .pipe(plugins.js_uglify())
        .pipe(plugins.concat('bundle.js', {newLine: ';'}))
        .pipe(gulp.dest(`${BUILD_PATH}scripts`));

    gulp.src([
            `${LIB_PATH}react-0.14.1/react.js`,
            `${LIB_PATH}react-0.14.1/react-dom.js`,
            `${LIB_PATH}swipe.js`
        ])
        .pipe(plugins.changed(`${BUILD_PATH}scripts`))
        // .pipe(plugins.js_uglify())
        .pipe(plugins.concat('lib.js'))
        .pipe(gulp.dest(`${BUILD_PATH}scripts`));

    gulp.src([`${APP_PATH}images/**/*.jpg`,
            `${APP_PATH}images/**/*.png`,
            `${APP_PATH}images/**/*.gif`])
        .pipe(plugins.changed(`${BUILD_PATH}images`))
        //.pipe(plugins.imagemin())
        .pipe(gulp.dest(`${BUILD_PATH}images`));
});

gulp.task(`${PROJECT_NAME}:revision`, function () {

    var RevAll = new plugins.rev_all({
        dontRenameFile: [/^\/favicon.ico$/g, 'index.html']
    });

    const CDN_PATH = `cdn/${PROJECT_NAME}`;

    gulp.src([`${APP_PATH}**`])
        .pipe(RevAll.revision())
        .pipe(gulp.dest(CDN_PATH))
        .pipe(RevAll.manifestFile())
        .pipe(gulp.dest(CDN_PATH))
        .pipe(RevAll.versionFile())
        .pipe(gulp.dest(CDN_PATH));
});

gulp.task(`${PROJECT_NAME}:server`, [PROJECT_NAME], function () {
    browserSync.init({
        server: {
            baseDir: BUILD_PATH,
            middleware: function (req, res, next) {
                console.log('got request:' + req.method + ': ' + req.url);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                next();
            }	
        }
    });
    gulp.watch(`apps/${PROJECT_NAME}/**`, [PROJECT_NAME]);
    //gulp.watch(`apps/${PROJECT_NAME}/**/*.html`).on('change', browserSync.reload);
});


gulp.task(`${PROJECT_NAME}:watch`, [PROJECT_NAME], function () {
    gulp.watch(`apps/${PROJECT_NAME}/**`, [PROJECT_NAME]);
});