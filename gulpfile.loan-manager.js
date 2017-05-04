const eslint = require('gulp-eslint');

const PROJ = 'loan-manager';

const APP_NAMES = [{
    name: 'home',
    compiler: 'webpack'
}]

module.exports = function (gulp, generate_task, CONSTANTS) {

    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, {
            debug: true,
            api_path: CONSTANTS[PROJ].dev_api_path
        });

        generate_task(PROJ, i, {
            cmd_prefix: 'pack',
            api_path: '',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map((i) => `${PROJ}:pack:${i.name || i}:revision`)));
    gulp.task(`lint:${PROJ}`, gulp.series(() => {
        return gulp.src([
            `apps/${PROJ}/**/*.+(js|jsx)`,
            '!node_modules/**',
            '!**/jquery.*.js',
            '!**.min.js'
        ]).pipe(eslint()).pipe(eslint.format());
    }))

};
