const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: './src/index.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                // 可以进行html代码压缩
                minify: {
                    // 移除空格
                    collapseWhitespace: true,
                    // 移除注释
                    removeComments: true
                }
            }
        )
    ],
    // 生产环境下就会进行js的压缩
    mode: 'production'
}