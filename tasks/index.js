var gulp = require('gulp');

const html = require('./html.js');
const stylesheets = require('./stylesheets.js');
const less2css = require('./less.js');
const javascripts = require('./javascripts.js');
const react = require('./react.js');
const images = require('./images.js');
const copy = require('./copy.js');
const revision = require('./revision.js');

// project_name 每次使用新项目时, 只需要更换项目名称
module.exports = generate_task = function (site_name, project_name, configs) {

    var app_path = `apps/${site_name}/${project_name}/`,
        build_path = `build/${site_name}/${project_name}/`,
        public_path = 'public/',
        lib_path = 'lib/',
        CONFIG = Object.assign({
            debug: true,
            cmd_prefix: '', // 通用指令前缀，比如 pack:
            api_path: '',
            cdn_prefix: '',
            include_components: [],
            include_common_js: [],
            main_jsx: 'scripts/index.jsx',
            html_engine: 'swig',
            with_swipe: true
        }, configs);

    let task_name = site_name + ':' + (CONFIG.cmd_prefix ? CONFIG.cmd_prefix + ':' : '') + project_name;

    var less_files = [
        `${lib_path}css/common.css`,
        `${lib_path}less/loading.less`,
        `${app_path}less/index.less`
    ];

    var jsx_files = CONFIG.include_components.map((i)=> `${lib_path}components/${i}`);
    jsx_files.push(`${app_path}scripts/components/*.jsx`);
    jsx_files.push(`${app_path}${CONFIG.main_jsx}`);

    var common_javascript_files = [
        `${lib_path}fw-0.1.0.js`,
        `${lib_path}native-bridge-0.2.0.js`
    ];
    if (CONFIG.debug) {
        common_javascript_files.push(`${lib_path}react-15.0.1/react.js`);
        common_javascript_files.push(`${lib_path}react-15.0.1/react-dom.js`);
    } else {
        common_javascript_files.push(`${lib_path}react-15.0.1/react.min.js`);
        common_javascript_files.push(`${lib_path}react-15.0.1/react-dom.min.js`);
    }

    if (CONFIG.with_swipe) common_javascript_files.push(`${lib_path}javascripts/swipe-2.0.0.js`);
    common_javascript_files = common_javascript_files.concat(
        CONFIG.include_common_js.map(i => `${lib_path}${i}`));

    function compile_html() {
        return html([`${app_path}index.html`], build_path, CONFIG.html_engine, {API_PATH: CONFIG.api_path})
    }

    function compile_stylesheets() {
        return stylesheets([app_path + 'stylesheets/*'], `${build_path}stylesheets`)
    }

    function compile_less() {
        return less2css(less_files, `${build_path}stylesheets`, 'all.less.css')
    }

    function compile_react() {
        return react(jsx_files, `${build_path}javascripts`, 'bundle.js')
    }

    function compile_javascripts() {
        return javascripts([`${app_path}javascritps/*.js`], `${build_path}javascripts`, null, CONFIG.debug)
    }

    function compile_common_javascripts() {
        return javascripts(common_javascript_files, `${build_path}javascripts`, 'lib.js')
    }

    function compile_images() {
        return images([`${app_path}images/**/*.+(jpg|png|gif)`], `${build_path}images`)
    }

    function compile_common_assets() {
        return copy([`${public_path}common/images/*`], `${build_path}images`)
    }

    function copy2cdn() {
        return copy([`${build_path}/**`], `cdn/${project_name}/`)
    }

    function compile_revision() {
        return revision([`${build_path}/**`], `cdn/${project_name}/`, {
            dontRenameFile: [/^\/favicon.ico$/g, 'index.html'],
            //prefix: CONFIG.cdn_prefix,
            transformPath: function (rev, source, path) {
                // 在css中, 采用的是相对的图片路径, 但是在加入版本和前缀域名后不能再使用相对路径
                if (rev.startsWith('../')) rev = rev.substr(3);
                return CONFIG.cdn_prefix + rev
            }
        })
    }

    function monitor() {
        gulp.watch(`apps/${project_name}/index.html`,
            gulp.parallel(compile_html));
        gulp.watch(`apps/${project_name}/images/**`,
            gulp.parallel(compile_images));
        gulp.watch(`apps/${project_name}/stylesheets/**`,
            gulp.parallel(compile_stylesheets));
        gulp.watch(`apps/${project_name}/less/**`,
            gulp.parallel(compile_less));
        gulp.watch(`apps/${project_name}/javascripts/**`,
            gulp.parallel(compile_javascripts));
        gulp.watch(`apps/${project_name}/jsx/**`,
            gulp.parallel(compile_react));
    }

    gulp.task(task_name,
        gulp.series(
            compile_html,
            compile_stylesheets,
            compile_less,
            compile_javascripts,
            compile_react,
            compile_common_javascripts,
            compile_images,
            compile_common_assets));

    gulp.task(`${task_name}:watch`, gulp.series(task_name, monitor));
    gulp.task(`${task_name}:revision`, gulp.series(task_name, copy2cdn, compile_revision));
};