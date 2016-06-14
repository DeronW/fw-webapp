var gulp = require('gulp');
var gt = require('../generate_task.js');

const SITE_NAME = 'main';

const APP_NAMES = [
    'user-level'
];

APP_NAMES.forEach(function (i) {
    gt(SITE_NAME, i);
    gt(SITE_NAME, i, {
        debug: false,
        cmd_prefix: 'pack',
        enable_revision: true
    });
});

var pack_tasks = [];
APP_NAMES.forEach(function (name) {
    pack_tasks.push(SITE_NAME + ':pack:' + name + ':revision');
});

exports.PACK_TASKS = pack_tasks;