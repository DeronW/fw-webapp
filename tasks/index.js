'use strict';

let gulp = require('gulp');
const util = require('gulp-util');

const html = require('./html.js');
const stylesheets = require('./stylesheets.js');
const less2css = require('./less.js');
const javascripts = require('./javascripts.js');
const react = require('./react.js');
const images = require('./images.js');
const copy = require('./copy.js');
const revision = require('./revision.js');
const webpack_task = require('./webpack.js');

const REACT_PATH = 'react-15.5.0';

let COMMON_JAVASCRIPTS_TASK = {};

function get_common_javascript_files(lib_path, extend_files, debug) {
    let files = [
        `${lib_path}/javascripts/use-strict.js`,
        `${lib_path}/javascripts/request-animation-frame-0.0.23.js`,
        `${lib_path}/javascripts/promise-2.0.2.min.js`,
        `${lib_path}/javascripts/object-assign-4.1.1.js`,
        `${lib_path}/javascripts/proxy-0.1.6.min.js`,
        `${lib_path}/fw-1.8.0.js`,
        `${lib_path}/javascripts/native-bridge-0.6.2.js`
    ];

    debug ?
        files.push(...[
            `${lib_path}/${REACT_PATH}/react.js`,
            `${lib_path}/${REACT_PATH}/react-dom.js`,
            `${lib_path}/${REACT_PATH}/prop-types.js`
        ]) :
        files.push(...[
            `${lib_path}/${REACT_PATH}/react.min.js`,
            `${lib_path}/${REACT_PATH}/react-dom.min.js`,
            `${lib_path}/${REACT_PATH}/prop-types.min.js`
        ]);

    files.push(...extend_files);
    return files;
}

function generate_webpack_task(site_name, page_name, CONFIG) {
    const build_path = `build/${site_name}/${page_name}`,
        cdn_path = `cdn/${site_name}/${page_name}`;

    function compile_webpack() {
        util.log(util.colors.yellow(`run webpack task:${site_name}:${page_name}`))
        return webpack_task(site_name, page_name, CONFIG)
    }

    function watch_webpack() {
        util.log(util.colors.yellow('watch webpack task:', `${site_name}:${page_name}`))
        return webpack_task(site_name, page_name,
            Object.assign({ watch: true }, CONFIG))
    }

    function copy2cdn() {
        return copy([`${build_path}/**`], cdn_path)
    }

    function revision2cdn() {
        return revision([`${build_path}/**`], cdn_path, {
            dontRenameFile: ['index.html'],
            transformPath: function (rev, source, path) {
                return CONFIG.cdn_prefix + rev
            }
        })
    }

    if (CONFIG.environment === 'development') {
        gulp.task(`${site_name}:${page_name}`, gulp.series(watch_webpack))
        gulp.task(`${site_name}:${page_name}:watch`, gulp.series(watch_webpack))
        gulp.task(`${site_name}:${page_name}:nowatch`, gulp.series(compile_webpack))
    }
    if (CONFIG.environment === 'production') {
        let pack_task = `${site_name}:${CONFIG.cmd_prefix}:${page_name}`
        gulp.task(pack_task, gulp.series(compile_webpack))
        gulp.task(`${pack_task}:revision`,
            gulp.series(pack_task, copy2cdn, revision2cdn))
    }
}

let generate_task = function (site_name, page_name, configs) {
    // 支持单个网页的动态配置
    let singlePageCfg = {};
    if (typeof (page_name) == 'object') {
        singlePageCfg = page_name;
        page_name = singlePageCfg.name
    }

    let app_path = `apps/${site_name}/${page_name}`,
        build_path = `build/${site_name}/${page_name}`,
        public_path = 'public',
        tmp_path = `build/${site_name}-tmp`,
        lib_path = 'lib',
        cdn_path = `cdn/${site_name}/${page_name}`,
        CONFIG = Object.assign({
            debug: false,
            // 新增编译环境, 有3种环境, development/testing/production
            environment: process.env.ENV || 'development',
            cmd_prefix: '', // 通用指令前缀，比如 pack:
            api_path: '',
            cdn_prefix: '',
            include_components: [],
            include_javascripts: [],
            include_less: [],
            compiler: 'gulp', // 编译方式, 使用gulp还是webpack
            main_jsx: 'react/index.jsx',
            html_engine: 'swig'
        }, configs, singlePageCfg);

    // 如果配置项中采用了 webpack 编译, 那么只生成webpack相关配置
    if (CONFIG.compiler === 'webpack') return generate_webpack_task(site_name, page_name, CONFIG);

    let task_name = `${site_name}${CONFIG.cmd_prefix ? `:${CONFIG.cmd_prefix}` : ''}:${page_name}`;

    let less_files = [
        `${lib_path}/css/common.css`,
        `${lib_path}/less/loading.less`,
        `${app_path}/less/*.less`
    ].concat(CONFIG.include_less.map(i => `${lib_path}/less/${i}`));

    let jsx_files = CONFIG.include_components.map(i => `${lib_path}/components/${i}`);
    jsx_files.push(...[
        `${app_path}/react/components/*.+(js|jsx)`,
        `${app_path}/${CONFIG.main_jsx}`
    ]);

    let common_javascript_files = get_common_javascript_files(
        lib_path,
        CONFIG.include_javascripts.map(i => `${lib_path}/javascripts/${i}`),
        CONFIG.debug);

    function compile_html() {
        return html([`${app_path}/index.html`], build_path, CONFIG.html_engine, {
            API_PATH: CONFIG.api_path,
            DEBUG: CONFIG.debug,
            ENV: CONFIG.environment
        })
    }

    function compile_stylesheets() {
        return stylesheets([`${app_path}/stylesheets/*`], `${build_path}/stylesheets`)
    }

    function compile_less() {
        return less2css(less_files, `${build_path}/stylesheets`, 'all.less.css', CONFIG.debug)
    }

    function compile_react() {
        return react(jsx_files, `${build_path}/javascripts`, 'bundle.js', CONFIG.debug)
    }

    function compile_javascripts() {
        return javascripts([`${app_path}/javascripts/*.js`], `${build_path}/javascripts`, null, CONFIG.debug)
    }

    function copy_common_javascripts() {
        return copy([`${tmp_path}/lib.js`], `${build_path}/javascripts`)
    }

    function compile_common_javascripts() {
        return javascripts(common_javascript_files, `${build_path}/javascripts`, 'lib.js', CONFIG.debug)
    }

    function compile_images() {
        return images([`${app_path}/images/**/*.+(jpg|png|gif)`], `${build_path}/images`)
    }

    function compile_common_assets() {
        return copy([
            `${public_path}/common/images/*`,
            `${public_path}/${site_name}/images/*`,
        ], `${build_path}/images`)
    }

    function compile_public_javascripts() {
        return copy([
            `${public_path}/common/javascripts/*.js`,
            `${public_path}/${site_name}/javascripts/*.js`
        ], `${build_path}/javascripts`)
    }

    function copy2cdn() {
        return copy([`${build_path}/**`], cdn_path)
    }

    function compile_revision() {
        return revision([`${build_path}/**`], cdn_path, {
            dontRenameFile: [/^\/favicon.ico$/g, 'index.html'],
            transformPath: function (rev, source, path) {
                // 在css中, 采用的是相对的图片路径, 但是在加入版本和前缀域名后不能再使用相对路径
                if (rev.startsWith('../')) rev = rev.substr(3);
                return CONFIG.cdn_prefix + rev
            }
        })
    }

    function monitor() {
        let project_path = `apps/${site_name}/${page_name}/`;
        gulp.watch(`${project_path}index.html`, gulp.parallel(compile_html));
        gulp.watch(`${project_path}images/**`, gulp.parallel(compile_images));
        gulp.watch(`${project_path}stylesheets/**`, gulp.parallel(compile_stylesheets));
        gulp.watch(`${project_path}less/**`, gulp.parallel(compile_less));
        gulp.watch(`${project_path}javascripts/**`, gulp.parallel(compile_javascripts));
        gulp.watch(`${project_path}react/**`, gulp.parallel(compile_react));
        gulp.watch(`${lib_path}components/**`, gulp.parallel(compile_react));

        gulp.watch(`lib/templates/**/*.html`, gulp.parallel(compile_html));
        gulp.watch(`lib/less/**/*.less`, gulp.parallel(compile_less));
    }

    let common_javascripts = CONFIG.debug ? compile_common_javascripts : copy_common_javascripts;

    let task_list = gulp.series(
        compile_html,
        compile_stylesheets,
        compile_less,
        compile_javascripts,
        compile_react,
        common_javascripts,
        compile_images,
        compile_common_assets,
        compile_public_javascripts)

    gulp.task(`${task_name}:nowatch`, task_list);
    gulp.task(task_name, gulp.series(task_list, monitor));

    CONFIG.debug ?
        gulp.task(`${task_name}:watch`, gulp.series(task_name)) :
        gulp.task(`${task_name}:revision`, gulp.series(task_name, copy2cdn, compile_revision));

    if (!CONFIG.debug && !COMMON_JAVASCRIPTS_TASK[site_name]) {
        gulp.task(`${site_name}:common_js`, gulp.series(
            () => javascripts(common_javascript_files, tmp_path, 'lib.js')));
        COMMON_JAVASCRIPTS_TASK[site_name] = true;
    }
};

module.exports = generate_task;
