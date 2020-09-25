const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWbpackPlugin = require('terser-webpack-plugin');
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
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30 * 1024,//分割chunk最小为30kb
            maxSize: 0,//最大没有限制
            minChunks: 1,//要提取的chunk最少被引用1此
            maxAsyncRequests: 5,//按需加载时并行加载的文件最大数量
            maxInitialRequests: 3,//入口js文件最大并行请求数量
            automaticNameDelimiter: '~',//名称连接符
            name: true,//可以使用命名规则
            // node_modules 文件会被打爆到vendors组的chunk中，-->vendors-xxx.js
            // 满足上面公共规则，如：大小超过30kb，至少被引用一次
            cacheGroups: {//分割chunk的组
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // 优先级
                    priority: -10
                },
                default: {
                    // 要提取的chunk最少被引用2次
                    minChunks: 2,
                    // 优先级
                    priority: -20,
                    // 如果当前要打包的模块，和之前已经被提取的模块是 同一个，就会复用,而不是重新打包模块
                    requseExistingChunk: true
                }
            }
        },
        // 当前模块的记录其他模块的hash单独打包为一个文件 runtime
        // 解决：修改a文件导致b文件的contenthash变化
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        },
        minimizer: [
            // 配置生产环境的压缩方案：js和css
            new TerserWbpackPlugin({
                // 开启缓存
                cache: true,
                // 开启多进程打包
                parallel: true,
                // 启动source-map
                sourceMap: true
            })
        ]
    }
}