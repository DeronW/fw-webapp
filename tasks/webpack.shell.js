const webpack = require("webpack");
const path = require('path');
const copy = require('./copy.js');

module.exports = function (site_name, page_name, options) {
    options = options || {};

    const PAGE_DIR = path.resolve(__dirname, `../apps/${site_name}/${page_name}`);

    const compiler = webpack({
        entry: `${PAGE_DIR}/entry.js`,
        output: {
            path: `${PAGE_DIR}/javascripts`,
            filename: 'bundle.min.js'
        },
        module: {
            rules: [{ test: /\.(js|jsx)$/, use: 'babel-loader' }]
        }
    });

    // 因为 webpack 被集成到了 gulp 中, 所以要遵循 gulp 的路径配置

    // 先把html 拷贝到 build 目录中
    copy()

    if (options.watch) {
        compiler.watch({
            // watch options
        }, (err, stats) => {
            err ? console.error(err) : console.log('webpack compile complete')
        })
    } else {
        compiler.run((err, stats) => {
            err ? console.error(err) : console.log('webpack compile complete')
        })
    }
}
