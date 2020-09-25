// 开发环境的配置  
/* 
    HMR: hot module replacement 热模块替换/模块热替换
        作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
        极大的提升构建速度
        样式文件:可以使用HMR功能：因为style-loader内部实现了
        js文件:默认不能使用HMR功能 --> 需要修改js代码，需要支持HMR功能
            注意:HMR功能对js处理，只能处理非入口js文件的其他文件
        html文件:默认不能使用HMR功能，同时会导致问题：html文件不能进行热更新了(是不需要做HMR处理)
            解决不能热更新的问题:修改entry入口，将html文件引入
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
module.exports = {
    entry: ['./src/index.js', './src/index.html'],
    output: {
        filename: "built.js",
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                // 处理css资源
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // 处理less资源
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 处理图片资源 只能处理css里的样式资源
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'images'
                }
            },
            {
                // 处理html标签里的资源  例如img标签
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exclude: /\.(css|js|html|less|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'iconfont'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html'
            }
        )
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        // 当修改webpack配置，新配置要想生效，必须重启项目
        hot: true
    }
}