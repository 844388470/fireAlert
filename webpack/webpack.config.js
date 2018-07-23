const path = require('path');
const config = require('../config')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode:process.env.NODE_ENV,
    context: path.resolve(__dirname, '../'),
    entry: {
        'app':'./src/index.js', //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    },
    output: {
        path: config.build.assetsRoot,      // 输出的路径
        filename: 'js/[name]_[hash:8].js',  // 打包后文件
        publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': resolve('src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins:(loader)=>[
                                require('autoprefixer')({
                                    browsers:['last 5 versions']
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    }  
}