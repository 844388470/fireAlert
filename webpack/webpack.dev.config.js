const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const config = require('../config')

module.exports = merge(webpackConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            title: '项目',
            path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
        }),
    ],
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: false,
        compress: true,
        host: config.dev.host,
        port: config.dev.port,
        open: config.dev.autoOpenBrowser,
        proxy: config.dev.proxyTable,
        overlay: config.dev.errorOverlay
          ? { warnings: false, errors: true }
          : false,
        publicPath: config.dev.assetsPublicPath
    },
});