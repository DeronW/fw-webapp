var gulp = require('gulp');
var gt = require('../util/generate_task.js');

var apps = [
    'vip',
    'vip-grade'
];

apps.forEach(function (i) {
    gt(i);
});