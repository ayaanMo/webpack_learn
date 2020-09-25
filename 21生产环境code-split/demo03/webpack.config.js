const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
    entry: "./src/index.js",
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
    /* 
        可以将node_modules中代码单独打包一个chunk最终输出
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    // 会自动进行js压缩
    mode: 'production'
}