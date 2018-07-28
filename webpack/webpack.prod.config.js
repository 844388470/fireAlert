'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const env = require('../config/'+process.env.NODE_PACKTYPE+'.env')

module.exports = merge(baseWebpackConfig, {
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('[name]_[hash:8].js'),
      chunkFilename: utils.assetsPath('[name]_[hash:8].js')
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': env
      }),
      new HtmlWebpackPlugin({
        filename: config.build.index,
        template: 'index.html',
        inject: true,
        title: '项目',
        path: config.build.assetsPublicPath + config.build.assetsSubDirectory
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    optimization: {
      splitChunks: {
          cacheGroups: {
              commons: {
                  name: "vendor",
                  chunks: "initial",
                  minChunks: 2
              }
          }
      },
    },
  })
  