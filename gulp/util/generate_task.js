var gulp = require('gulp');
var react = require('gulp-react');
var babel = require('gulp-babel');
var plugins = require('gulp-load-plugins')();
var fs = require('fs');

plugins.less = require('gulp-less');
plugins.changed = require('gulp-changed');
plugins.js_uglify = require('gulp-uglify');
plugins.htmlmin = require('gulp-htmlmin');
plugins.cssnano = require('gulp-cssnano');
plugins.rev_all = require('gulp-rev-all');
plugins.concat = require('gulp-concat');
plugins.del = require('del');
plugins.swig = require('gulp-swig');
plugins.plumber = require('gulp-plumber');
plugins.imagemin = require('gulp-imagemin');
plugins.sourcemaps = require('gulp-sourcemaps');
//plugins.rename = require('gulp-rename');
plugins.replace = require('gulp-replace');

// project_name 每次使用新项目时, 只需要更换项目名称
function generate_task(project_name, configs) {
    var PROJECT_NAME = project_name,
        APP_PATH = 'apps/' + project_name + '/',
        BUILD_PATH = 'build/' + project_name + '/',
        LIB_PATH = 'lib/',
        CONFIG = Object.assign({
            debug: true,
            cmd_prefix: '', // 通用指令前缀，比如 pack:
            api_path: 'http://m.mall.9888.cn/',
            static_path: '../',
            enable_watch: true,
            enable_server: false,
            enable_revision: false
        }, configs);

    gulp.task(CONFIG.cmd_prefix + PROJECT_NAME,
        gulp.series(compile_html,
            compile_styles,
            compile_commonjs,
            compile_scripts,
            compile_images));

    if (CONFIG.enable_watch) {
        gulp.task(PROJECT_NAME + ':watch', gulp.series(PROJECT_NAME, monitor));
    }

    if (CONFIG.enable_revision)
        gulp.task(PROJECT_NAME + ':revision', gulp.series(PROJECT_NAME, revision));

    function compile_html() {
        return gulp.src([APP_PATH + '**/*.html'])
            .pipe(plugins.changed(BUILD_PATH))
            .pipe(plugins.swig())
            //.pipe(plugins.htmlmin({collapseWhitespace: true}))
            .pipe(plugins.replace('{API_PATH}', CONFIG.api_path))
            .pipe(plugins.replace('{STATIC_PATH}', CONFIG.static_path))
            .pipe(gulp.dest(BUILD_PATH));
    }

    function compile_styles() {
        return gulp.src([
                LIB_PATH + 'css/common.css',
                LIB_PATH + 'less/loading.less',
                APP_PATH + 'less/index.less'
            ])
            .pipe(plugins.changed(BUILD_PATH + 'css'))
            .pipe(plugins.less())
            .pipe(plugins.cssnano())
            .pipe(plugins.concat('all.css'))
            .pipe(gulp.dest(BUILD_PATH + 'css'));
    }

    function compile_scripts() {
        return gulp.src([
                LIB_PATH + 'components/header.jsx',
                LIB_PATH + 'components/loading.jsx',
                LIB_PATH + 'components/alert.jsx',
                APP_PATH + 'scripts/components/*.jsx',
                APP_PATH + 'scripts/index.jsx'
            ])
            .pipe(plugins.changed(BUILD_PATH + 'scripts'))
            .pipe(plugins.plumber())
            .pipe(plugins.babel({
                presets: ['es2015', 'react']
            }))
            //.pipe(plugins.js_uglify())
            .pipe(plugins.concat('bundle.js', {newLine: ';'}))
            .pipe(gulp.dest(BUILD_PATH + 'scripts'));
    }

    function compile_commonjs() {
        // common library
        var lib_files = [LIB_PATH + 'financial-workspace-0.1.0.js'];
        if (CONFIG.debug) {
            lib_files.push(LIB_PATH + 'react-15.0.1/react.js');
            lib_files.push(LIB_PATH + 'react-15.0.1/react-dom.js');
        } else {
            lib_files.push(LIB_PATH + 'react-15.0.1/react.min.js');
            lib_files.push(LIB_PATH + 'react-15.0.1/react-dom.min.js');
        }
        lib_files.push(LIB_PATH + 'native-bridge-0.1.0.js');
        lib_files.push(LIB_PATH + 'javascripts/swipe-2.0.0.js');

        return gulp.src(lib_files)
            .pipe(plugins.changed(BUILD_PATH + 'scripts'))
            // .pipe(plugins.js_uglify())
            .pipe(plugins.concat('lib.js'))
            .pipe(gulp.dest(BUILD_PATH + 'scripts'));
    }

    function compile_images() {
        return gulp.src([APP_PATH + 'images/**/*.jpg',
                APP_PATH + 'images/**/*.png',
                APP_PATH + 'images/**/*.gif'])
            .pipe(plugins.changed(BUILD_PATH + 'images'))
            //.pipe(plugins.imagemin())
            .pipe(gulp.dest(BUILD_PATH + 'images'));
    }

    function monitor() {
        gulp.watch('apps/' + PROJECT_NAME + '/html/**', gulp.parallel(compile_html));
        gulp.watch('apps/' + PROJECT_NAME + '/images/**', gulp.parallel(compile_images));
        gulp.watch('apps/' + PROJECT_NAME + '/less/**', gulp.parallel(compile_styles));
        gulp.watch('apps/' + PROJECT_NAME + '/scripts/**', gulp.parallel(compile_scripts));
    }

    function revision() {

        var RevAll = new plugins.rev_all({
            dontRenameFile: [/^\/favicon.ico$/g, 'index.html']
        });

        const CDN_PATH = 'cdn/' + PROJECT_NAME + '/';
        return gulp.src([BUILD_PATH + '/**'])
            .pipe(RevAll.revision())
            .pipe(gulp.dest(CDN_PATH))
            .pipe(RevAll.manifestFile())
            .pipe(gulp.dest(CDN_PATH))
            .pipe(RevAll.versionFile())
            .pipe(gulp.dest(CDN_PATH));
    }

    //gulp.task(PROJECT_NAME + ':server', [PROJECT_NAME], function () {
    //    browserSync.init({
    //        server: {
    //            baseDir: BUILD_PATH,
    //            middleware: function (req, res, next) {
    //                console.log('got request:' + req.method + ': ' + req.url);
    //                res.setHeader('Access-Control-Allow-Origin', '*');
    //                res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //                next();
    //            }
    //        }
    //    });
    //    gulp.watch('apps/' + PROJECT_NAME + '/**', [PROJECT_NAME]);
    //    //gulp.watch('apps/' + PROJECT_NAME + '/**/*.html').on('change', browserSync.reload);
    //});

}

module.exports = generate_task;
