const webpack = require("webpack");
const path = require('path');
const util = require('gulp-util');
const SwigWebpackPlugin = require('swig-webpack-plugin')

module.exports = function (site_name, page_name, options) {
    options = options || {};

    const page_path = path.resolve(__dirname, `../apps/${site_name}/${page_name}`),
        build_path = path.resolve(__dirname, `../build/${site_name}/${page_name}/`);

    const compiler = webpack({
        entry: `${page_path}/entry.js`,
        output: {
            path: `${build_path}/javascripts`,
            filename: 'bundle.min.js'
        },
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-1', 'stage-2']
                }
            }]
        },
        plugins: [
            new SwigWebpackPlugin({
                filename: `${page_path}/index.html`,
                beautify: true,
                data: {
                    api_path: 'xxx'
                }
            })
        ]
    });

    // 因为 webpack 被集成到了 gulp 中, 所以要遵循 gulp 的路径配置
    // 先把html 拷贝到 build 目录中
    // copy([`${app_path}/index.html`], build_path)

    return new Promise(function (resolve, reject) {
        if (options.watch) {
            compiler.watch({
                // watch options
            }, (err, stats) => {
                let t = `${site_name}:${page_name} udpate at ${(new Date).toTimeString().split(' ')[0]}`
                err ? util.log(err) : util.log(t)
            })
        } else {
            compiler.run((err, stats) => {
                err ? util.log(err) : util.log('webpack compile complete')
                resolve()
            })
        }
    })
}
