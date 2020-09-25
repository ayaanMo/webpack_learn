const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        // 项目构建后的路径
        contentBase: path.resolve(__dirname, '.build'),
        // 监视contentBase 目录下所有文件，一旦文件变化就会reload
        watchContentBase: true,
        watchOptions: {
            // 忽略文件
            ignored: /node_modules/
        },
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 5000,
        // 域名
        host: 'localhost',
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        hot: true,
        // 不要显示启动服务器日志信息
        clientLogLevel: 'none',
        // 除了一些基本启动信息以外，其他内容都不要提示
        quiet: true,
        // 如果出现错误，不要全屏提示
        overlay: fasle,
        // 服务器代理 -->解决开发环境跨域问题
        proxy: {
            // 一旦devServer服务器接收到/api/xxx的请求，就会把请求转发到另外一个服务器(30000)
            '/api': {
                target: 'http://localhost:3000',
                // 发送请求时，请求路径重写：将/api/xxx-->/xxx(去掉/api)
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}