const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
module.exports = {
    entry: "./src/index.js",
    output: {
        // 可以指定文件名称也可以指定名称+目录
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'build'),
        // 所有资源引入公共路径前缀 -->'imgs/a.jpg --> '/imgs/a.jpg' 一般用于生产环境
        publicPath: "/",
        chunkFilename: 'js/[name]_chunk.js',//非入口chunk的名称
        library: '[name]',//整个库向外暴露的变量名
        // library 一般结合dll方式打包出去
        // libraryTarget:'window'
        // libraryTarget:'global'
        // libraryTarget: 'commonjs'
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html'
            }
        )
    ],
    mode: 'development'
}