// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),     //  输出的路径
    assetsSubDirectory: 'dist',
    assetsPublicPath: './',
    productionSourceMap: true,
    productionGzip: false
  },
  dev: {
    host: 'localhost',
    port: 9090,
    autoOpenBrowser: true,
    errorOverlay: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/api': {
                target: 'https://api2.fzgi.cn',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
    }
  }
}
