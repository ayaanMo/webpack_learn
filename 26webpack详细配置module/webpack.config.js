const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const path = require('path');
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                // 排除node_modules 下的所有js文件
                exclude: /node_modules/,
                // 只检查src下的js文件
                include: resolve(__dirname, 'src'),
                // 优先执行
                enforce: 'pre',
                // 延后执行
                // enforce:'post',
                // 单个loader用loder
                loader: 'eslint-loader'
            },
            {
                oneOf: []
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
    mode: 'development'
}