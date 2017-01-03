const PROJ = 'jiemo';

var INCLUDE_COMPONENTS = [
    'use-strict.jsx', `${PROJ}/header.jsx`, `${PROJ}/bottom-nav-bar.jsx`,
    'loading.jsx', 'alert.jsx', 'banner-group.jsx', 'toast.jsx',
];

let INCLUDE_JAVASCRIPTS = [
    'use-strict.js',
    `${PROJ}/fw-ajax-error-handler.js`,
    `${PROJ}/fw-common.js`
];


const APP_NAMES = [
    'home',
    'apply-loan',
<<<<<<< HEAD
	'my',
	'set-cash-card',
	'verify-identidy',
	'advice-complaints'
=======
    'want-loan',
    'confirm-loan'
>>>>>>> 3124408dba0ab6171f86362f8cb34d9af443e333
];

module.exports = function (gulp, generate_task, CONSTANTS) {
    APP_NAMES.forEach(i => {
        generate_task(PROJ, i, {
            debug: true,
            api_path: CONSTANTS[PROJ].dev_api_path,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });

        generate_task(PROJ, i, {
            cmd_prefix: 'pack',
            api_path: '//jiemodai.com/',
            cdn_prefix: `/static/${PROJ}/${i.name || i}/`,
            include_components: INCLUDE_COMPONENTS,
            include_javascripts: INCLUDE_JAVASCRIPTS
        });
    });

    gulp.task(`build:${PROJ}`, gulp.series(APP_NAMES.map((i) => `${PROJ}:pack:${i.name || i}:revision`)));
};
