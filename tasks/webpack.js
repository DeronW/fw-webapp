const webpack = require("webpack");
const path = require('path');
const util = require('gulp-util');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');


module.exports = function (site_name, page_name, options) {
    options = options || {};

    const page_path = path.resolve(__dirname, `../apps/${site_name}/${page_name}`),
        build_path = path.resolve(__dirname, `../build/${site_name}/${page_name}/`);

    const compiler = webpack({
        entry: `${page_path}/entry.js`,
        output: {
            path: `${build_path}`,
            filename: 'javascripts/bundle.min.js'
        },
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015',
                            'react',
                            // 'stage-1',
                            'stage-2',
                        ],
                        plugins: [
                            'transform-decorators-legacy'
                        ]
                    }
                }]
            }, {
                test: /\.html$/,
                use: [{
                    loader: `${__dirname}/loaders/swig.js`,
                    options: {
                        locals: {
                            DEBUG: options.debug,
                            API_PATH: options.api_path,
                            ENV: options.enviroument
                        }
                    }
                }]
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                strictMath: true,
                                noIeCompat: true
                            }
                        }
                    ]
                })
            }, {
                test: /.(png|jpg)/,
                use: [{
                    loader: 'file-loader?name=images/[name]-[hash:6].[ext]',
                    query: ''
                }]
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `${page_path}/index.html`
            }),
            new ExtractTextPlugin({
                filename: `all.css`
            })
        ]
    });

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
                err ?
                    util.log(err) :
                    util.log(util.colors.green('webpack compile complete'))
                resolve()
            })
        }
    })
}
