const webpack = require("webpack")
const path = require('path')
const util = require('gulp-util')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015',
                            'react',
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:6]'
                        }
                    }, {
                        loader: 'resolve-url-loader',
                        options: {
                            debug: options.debug
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            strictMath: true,
                            noIeCompat: true
                        }
                    }]
                })
            }, {
                test: /.(png|jpe?g|gif)/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        hash: 'sha512',
                        digest: 'hex',
                        name: '[name]-[hash:6].[ext]'
                    }
                }]
            }]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new HtmlWebpackPlugin({
                template: `${page_path}/index.html`
            })
            , new ExtractTextPlugin({
                filename: options.debug ? 'all.css' : 'all.[contenthash:4].css',
                allChunks: true,
                ignoreOrder: true
            })
            // , new webpack.NoErrorsPlugin()
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
