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
    },
    /*
        source-map:一种提供源代码到构建后代码映射 技术（如果构建后代码出错了，通过映射可以追踪源代码错误）
        [inline-|hidden-|eval-][nosources-][cheap-[module-]]
        source-map 
            可以追踪到错误代码的准确信息和源代码的准确位置
        inline-source-map 内联 
            只生成一个source-map
            和外部的区别：1.外部生成了文件，内联没有 2.内联构建速度更快
            可以追踪到错误代码的准确信息和源代码的准确位置
        hidden-source-map 外部
            错误代码的错误原因，但是没有错误位置，不能追踪源代码的错误，只能提示到构建后代码的位置
        eval-source-map 内联
            每个js文件都会有一个对应的source-map 都在eval里面
            可以追踪到错误代码的准确信息和源代码的准确位置，只是每个文件多一个hash值
        nosources-source-map 外部
            只能知道是哪个文件报错  但是没有任何源代码信息
        cheap-source-map 外部
            可以追踪到错误代码的准确信息和源代码的位置(只能精确到行，行里的某个地方报错就不知道了)
        cheap-module-source-map 外部
            可以追踪到错误代码的准确信息和源代码的位置(只能精确到行，行里的某个地方报错就不知道了)

    */
    /* 
         开发环境：速度快，调式更友好
            速度（eval>inline>cheap>...）
            eval-cheap-source-map
            eval-source-map
         调试更友好
            source-map
            cheap-module-source-map
            cheap-source-map
            ==》eval-source-map 推荐方案
         生产环境：源代码要不要隐藏，调式要不要更友好
            内联会让代码体积更大 所以生产环境不用内联
            nosources-source-map 全部隐藏
            hidden-source-map   只隐藏源代码，会提示构建后代码错误信息
            ==》 source-map/cheap-module-source-map
    */
    devtool: "nosources-source-map"
}
