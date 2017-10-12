const webpack = require("webpack")
const path = require('path')
const util = require('gulp-util')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = function (site_name, page_name, CONFIG) {

    const page_path = path.resolve(__dirname, `../apps/${site_name}/${page_name}`),
        build_path = path.resolve(__dirname, `../build/${site_name}/${page_name}`),
        relative_path = `/static/${site_name}/${page_name}`

    const compiler = webpack({
        entry: ['babel-polyfill', 'proxy-polyfill', `${page_path}/entry.js`],
        output: {
            path: `${build_path}`,
            filename: 'javascripts/[name].[chunkhash:6].js'
        },
        devtool: CONFIG.debug ? 'eval-source-map' : 'source-map',
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                // exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: [
                                        "last 2 major versions",
                                        "ie 9", "ie 10"
                                    ],
                                    useBuiltIns: true,
                                    uglify: false,
                                    include: ['transform-es2015-arrow-functions'],
                                    debug: !!CONFIG.debug
                                }
                            }],
                            'react',
                            'stage-2'
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
                            API_PATH: CONFIG.api_path,
                            ENV: CONFIG.environment
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
                            localIdentName: '[name]__[local]--[hash:base64:4]'
                        }
                    }, {
                        loader: 'resolve-url-loader',
                        options: {
                            debug: CONFIG.debug
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
                        name: 'images/[name]-[hash:6].[ext]'
                    }
                }]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(CONFIG.environment)
                }
            })
            , new webpack.optimize.UglifyJsPlugin({
                compress: CONFIG.debug ?
                    {} :
                    {
                        warnings: false,
                        drop_console: false,
                    }
            })
            , new HtmlWebpackPlugin({
                template: `${page_path}/index.html`
            })
            , new ExtractTextPlugin({
                // filename: CONFIG.debug ? 'all.css' : `${relative_path}/all.[contenthash:4].css`,
                filename: CONFIG.debug ? 'all.css' : `all.[contenthash:4].css`,
                allChunks: true,
                ignoreOrder: true
            })
            , new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    // this assumes your vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            })
            // , new webpack.NoErrorsPlugin()
        ]
    });

    return new Promise(function (resolve, reject) {
        if (CONFIG.watch) {
            compiler.watch({
                // watch options
            }, (err, stats) => {
                let t = `${site_name}:${page_name} udpate at ${(new Date).toTimeString().split(' ')[0]}`
                err ? util.log(err) : util.log(t)
            })
        } else {
            compiler.run((err, stats) => {
                err ?
                    util.log(util.colors.red(err)) :
                    util.log(util.colors.green('webpack compile complete'))
                resolve()
            })
        }
    })
}
