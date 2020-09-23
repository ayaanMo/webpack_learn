const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            /* 
                js兼容性处理：babel-loader @babel/core @babel/preset-env
                    1.基本js兼容性处理 -->@babel/preset-env
                        问题:只能转换基本语法例如promise不能转换
                    2.全部js兼容性处理-->@babel/polyfill  直接在js文件中import就行 import '@babel/polyfill';
                        问题:当只想解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大
                    3.兼容性处理进行按需加载 -->core-js
            */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本的浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
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
    mode: 'development'
}