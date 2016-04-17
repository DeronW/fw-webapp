
var gulp = require('gulp');
var gt = require('../util/generate_task.js');

var apps = [
  'mall',
  'activity',
  'mine',
  'order-list',
  'order-detail',
  'order-confirm',
  'product-detail',
  'product-list',
  'product-vip',
  'vip',
  'fail',
  'success',
  'deliver-address',
  'new-deliver-address',
  'vip-grade'];

apps.forEach(function (i) {
    gt(i);
    gt(i, {
        cmd_prefix: 'pack:',
        api_path: 'http://m.mall.9888.cn/',
        static_path: '/pages/' + i + '/',
        enable_watch: false,
        enable_server: false,
        enable_revision: false
    });
});
