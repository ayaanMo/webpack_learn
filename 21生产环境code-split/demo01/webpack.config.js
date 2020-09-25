const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
    // 单入口entry:"./src/index.js"
    entry: {
        // 多入口 有一个入口，最终输出就有一个bundle
        main: './src/index.js',
        test: './src/js/test.js'
    },
    output: {
        filename: '[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                // html 压缩处理
                minify: {
                    collapseWhitespace: true,
                    removeComments: true
                }
            }
        )
    ],
    // 会自动进行js压缩
    mode: 'production'
}