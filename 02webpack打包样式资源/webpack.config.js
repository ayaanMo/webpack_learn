/*
    webpack.config,js webpack的配置文件
        作用:指示webpack干哪些活(当你运行webpack指令时)，会加载里面的配置
        所有构建工具都是基于node.js平台运行的~模块化默认采用common.js
*/
// resolve用来拼接绝对路径的方法
const path = require('path');
module.exports = {
    // webpack配置
    // 入口
    entry: './src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: 'built.js',
        // 输出路径
        // __dirname node.js的变量，代表当前文件的目录绝对路径
        path: path.resolve(__dirname, "build")
    },
    // loader配置
    module: {
        rules: [
            // 详细的loader配置
            // 不同文件必须配置不同的loader
            {
                // 一般写的是正则，匹配哪些文件
                test: /\.css$/,
                use: [
                    // use数组中loader执行顺序：从右到左，从下到上依次执行
                    // 创建style标签将js中的css样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    // plugins配置
    plugins: [
        // 详细plugins的配置
    ],
    //模式
    mode: 'development'
    // mode:production
}