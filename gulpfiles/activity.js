const eslint = require('gulp-eslint');

const PROJ = 'activity'

const APP_NAMES = [
    {
        name: '2017-08-16',
        compiler: 'webpack'
    }
]

module.exports = function (gulp, generate_task, CONSTANTS) {

    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, {
            debug: true,
            environment: 'development',
            api_path: CONSTANTS[PROJ].dev_api_path
        })

        generate_task(PROJ, i, {
            cmd_prefix: 'pack',
            api_path: '',
            environment: 'production',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`
        })

        gulp.task(`lint:${PROJ}:${i.name || i}`, gulp.series(() => {
            return gulp.src([
                `apps/${PROJ}/${i.name || i}/**/*.+(js|jsx)`
            ]).pipe(eslint()).pipe(eslint.format());
        }))
    })

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map((i) => `${PROJ}:pack:${i.name || i}:revision`)))

    gulp.task(`lint:${PROJ}`, gulp.series(APP_NAMES.map((i) => `lint:${PROJ}:${i.name || i}`)))

    // define a empty activity:common_js function for compiler holder
    gulp.task(`${PROJ}:common_js`, gulp.series(() => {
        return new Promise(resolve => resolve())
    }))

};
