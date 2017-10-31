const eslint = require('gulp-eslint');

const PROJ = 'jrgc'

const APP_NAMES = [{
    name: 'manager',
    compiler: 'webpack'
}, {
    name: 'insurance',
    compiler: 'webpack'
}, {
    name: 'cash',
    compiler: 'webpack'
}]

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
                `apps/${PROJ}/**/*.+(js|jsx)`,
                '!node_modules/**'
            ]).pipe(eslint()).pipe(eslint.format())
        }))
    })

    gulp.task('manager', gulp.series('jrgc:manager'))
    gulp.task('cash', gulp.series('jrgc:manager'))
}
