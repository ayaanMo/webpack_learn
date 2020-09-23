const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

// 设置nodejs环境变量
process.env.NODE_ENV = 'production';


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // "postcss-loader",
                    /* 
                        css兼容性处理：prostcss --> postcss-loader  postcss-preset-env
                        帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                        "browserslist": {
                            开发环境 -->设置node环境变量：process.env.NODE_ENV = development
                            "development": [
                                "last 1 chrome version",
                                "last 1 firefox version",
                                "last 1 safari version"
                            ],
                            "production": [
                                ">0.2%",
                                "not dead",
                                "not op_mini all"
                            ]
                        }
                    */
                    /* 
                        postcss-loader@3.0.0
                        postcss@7.0.27
                        postcss-preset-env@6.7.0
                        在这个版本下才有效
                    */
                    /* {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-preset-env')()
                            ]
                        }
                    } */
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env']
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html'
            }
        ),
        new MiniCssExtractPlugin(
            {
                filename: 'css/index.css'
            }
        )
    ],
    mode: 'development'
}