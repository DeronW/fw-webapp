var gt = require('../generate_task.js');

['mall', 'activity', 'mine', 'my-order', 'order-detail', 'product_detail', 'products', 'privilege'].forEach(function (i) {
    gt(i, {
        cmd_prefix: 'pack:',
        aip_path: 'http://m.mall.9888.cn',
        static_path: 'pages/' + i,
        enable_watch: false,
        enable_server: false,
        enable_revision: false
    })
});