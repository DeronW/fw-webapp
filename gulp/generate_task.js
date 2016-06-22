var gulp = require('gulp');
var babel = require('gulp-babel');
var plugins = require('gulp-load-plugins')();
var fs = require('fs');

plugins.less = require('gulp-less');
plugins.changed = require('gulp-changed');
plugins.js_uglify = require('gulp-uglify');
plugins.htmlmin = require('gulp-htmlmin');
plugins.htmlbeautify = require('gulp-html-beautify');
plugins.cssnano = require('gulp-cssnano');
plugins.rev_all = require('gulp-rev-all');
plugins.concat = require('gulp-concat');
plugins.del = require('del');
plugins.swig = require('gulp-swig');
plugins.plumber = require('gulp-plumber');
plugins.imagemin = require('gulp-imagemin');
plugins.util = require('gulp-util');
plugins.replace = require('gulp-replace');

// project_name 每次使用新项目时, 只需要更换项目名称
function generate_task(site_name, project_name, configs) {
    const PROJECT_NAME = project_name,
        APP_PATH = `apps/${site_name}/${project_name}/`,
        BUILD_PATH = `build/${site_name}/${project_name}/`,
        PUBLIC_PATH = 'public/',
        LIB_PATH = 'lib/',
        CONFIG = Object.assign({
            debug: true,
            cmd_prefix: '', // 通用指令前缀，比如 pack:
            api_path: '',
            cdn_prefix: '',
            include_components: [],
            include_common_js: [],
            main_jsx: 'scripts/index.jsx',
            html_engine: 'swig',
            html_minify: false,
            with_swipe: true,
            enable_watch: true,
            enable_server: false,
            enable_revision: false
        }, configs);

    const TASK_NAME = site_name + ':' + (CONFIG.cmd_prefix ? CONFIG.cmd_prefix + ':' : '') + PROJECT_NAME;

    gulp.task(TASK_NAME,
        gulp.series(
            compile_html,
            compile_css,
            compile_styles,
            compile_javascripts,
            compile_commonjs,
            compile_scripts,
            compile_images,
            insert_common_assets
        )
    );

    if (CONFIG.enable_watch) {
        gulp.task(TASK_NAME + ':watch', gulp.series(TASK_NAME, monitor));
    }

    if (CONFIG.enable_revision)
        gulp.task(TASK_NAME + ':revision', gulp.series(TASK_NAME, revision));

    function compile_html() {
        return gulp.src([APP_PATH + '**/*.html'])
            .pipe(plugins.changed(BUILD_PATH))
            .pipe(CONFIG.html_engine == 'swig' ? plugins.swig() : plugins.util.noop())
            .pipe(CONFIG.html_minify ?
                plugins.htmlmin({collapseWhitespace: true}) :
                plugins.htmlbeautify({indentSize: 2}))
            .pipe(plugins.replace('{API_PATH}', CONFIG.api_path))
            .pipe(gulp.dest(BUILD_PATH));
    }

    function compile_css() {
        return gulp.src([APP_PATH + 'css/*.css'])
            .pipe(plugins.changed(BUILD_PATH + 'stylesheets'))
            .pipe(plugins.cssnano())
            .pipe(gulp.dest(BUILD_PATH + 'stylesheets'));
    }

    function compile_styles() {
        return gulp.src([
                LIB_PATH + 'css/common.css',
                LIB_PATH + 'less/loading.less',
                APP_PATH + 'less/index.less'
            ])
            .pipe(plugins.changed(BUILD_PATH + 'stylesheets'))
            .pipe(plugins.less())
            .pipe(plugins.cssnano())
            .pipe(plugins.concat('all.css'))
            .pipe(gulp.dest(BUILD_PATH + 'stylesheets'));
    }

    function compile_javascripts() {
        return gulp.src([APP_PATH + 'javascripts/*.js'])
            .pipe(plugins.changed(BUILD_PATH + 'javascripts'))
            .pipe(plugins.plumber())
            .pipe(plugins.babel({presets: ['es2015']}))
            .pipe(CONFIG.debug ? plugins.util.noop() : plugins.js_uglify())
            .pipe(gulp.dest(BUILD_PATH + 'javascripts'));
    }

    function compile_scripts() {
        var paths = [];
        CONFIG.include_components.forEach((i) => paths.push(`${LIB_PATH}components/${i}`));
        paths.push(APP_PATH + 'scripts/components/*.jsx');
        paths.push(APP_PATH + CONFIG.main_jsx);

        return gulp.src(paths)
            .pipe(plugins.changed(BUILD_PATH + 'javascripts'))
            .pipe(plugins.plumber())
            .pipe(plugins.babel({presets: ['es2015', 'react']}))
            .pipe(CONFIG.debug ? plugins.util.noop() : plugins.js_uglify())
            .pipe(plugins.concat('bundle.js', {newLine: ';'}))
            .pipe(gulp.dest(BUILD_PATH + 'javascripts'));
    }

    function compile_commonjs() {
        // common library
        var lib_files = [LIB_PATH + 'fw-0.1.0.js'];
        if (CONFIG.debug) {
            lib_files.push(LIB_PATH + 'react-15.0.1/react.js');
            lib_files.push(LIB_PATH + 'react-15.0.1/react-dom.js');
        } else {
            lib_files.push(LIB_PATH + 'react-15.0.1/react.min.js');
            lib_files.push(LIB_PATH + 'react-15.0.1/react-dom.min.js');
        }

        lib_files.push(LIB_PATH + 'native-bridge-0.2.0.js');
        if (CONFIG.with_swipe) lib_files.push(LIB_PATH + 'javascripts/swipe-2.0.0.js');

        CONFIG.include_common_js.forEach(function (i) {
            lib_files.push(LIB_PATH + i);
        });

        return gulp.src(lib_files)
            .pipe(plugins.changed(BUILD_PATH + 'javascripts'))
            .pipe(CONFIG.debug ? plugins.util.noop() : plugins.js_uglify())
            .pipe(plugins.concat('lib.js'))
            .pipe(gulp.dest(BUILD_PATH + 'javascripts'));
    }

    function compile_images() {
        return gulp.src([APP_PATH + 'images/**/*.jpg',
                APP_PATH + 'images/**/*.png',
                APP_PATH + 'images/**/*.gif'])
            .pipe(plugins.changed(BUILD_PATH + 'images'))
            //.pipe(plugins.imagemin())
            .pipe(gulp.dest(BUILD_PATH + 'images'));
    }

    function insert_common_assets() {
        return gulp.src([PUBLIC_PATH + 'common/images/*'])
            .pipe(plugins.changed(BUILD_PATH + 'images'))
            .pipe(gulp.dest(BUILD_PATH + 'images'));
    }

    function monitor() {
        gulp.watch(APP_PATH + '/*.html', gulp.parallel(compile_html));
        gulp.watch(APP_PATH + '/images/**', gulp.parallel(compile_images));
        gulp.watch(APP_PATH + '/less/**', gulp.parallel(compile_styles));
        gulp.watch(APP_PATH + '/scripts/**', gulp.parallel(compile_scripts));
        gulp.watch(APP_PATH + '/css/**', gulp.parallel(compile_css));
        gulp.watch(APP_PATH + '/javascripts/**', gulp.parallel(compile_javascripts));
    }

    function revision() {

        var RevAll = new plugins.rev_all({
            dontRenameFile: [/^\/favicon.ico$/g, 'index.html'],
            //prefix: CONFIG.cdn_prefix,
            transformPath: function (rev, source, path) {
                // 在css中, 采用的是相对的图片路径, 但是在加入版本和前缀域名后不能再使用相对路径
                if (rev.startsWith('../')) rev = rev.substr(3);
                return CONFIG.cdn_prefix + rev
            }
        });

        const CDN_PATH = `cdn/${site_name}/${PROJECT_NAME}/`;
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
