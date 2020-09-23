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
                语法检查 eslint-loader eslint
                只检查源代码，第三方库是不检查的
                设置检查规则:
                    package.json中eslintConfig中设置
                        "eslintConfig": {
                            "extends": "airbnb-base"
                        }
                    airbnb --> eslint、eslint-config-airbnb-base、eslint-plugin-import
            */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复eslint错误
                    fix: true
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