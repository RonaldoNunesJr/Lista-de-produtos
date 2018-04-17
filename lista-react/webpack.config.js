const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'public'),
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js']
    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64:5]',
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [ 
                                    require('autoprefixer') 
                                ];
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[name]_[local]_[hash:base64:5]',
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'public'),
        publicPath: '/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
}