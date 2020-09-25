const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const { resolve } = require("path");

const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // css 兼容处理 还需要再package.json 配置browserslist
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: ['postcss-preset-env']
            }
        }
    }
];
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                // css 基本处理
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                // less 基本处理
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },
            /* 
                正常来讲，一个文件只能被一个loader处理
                当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                    先执行eslint 再执行babel
                    加上enforce 就可以进行优先执行了
            */
            {
                // package.json中配置eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                // enforce 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                // js兼容性处理
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    /* 
                        开启多进程打包
                        进程启动大概600ms，进程通信也有开销
                        只有工作消耗时间比较长，才需要多进程打包
                    */
                    'thread-loader',
                    {
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
            {
                // 图片处理
                test: /\.(jpg|png|gif)/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs',
                    esModule: false
                }
            },
            {
                // html 里面的图片资源处理
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 其他资源处理
                exclude: /\.(js|css|less|html|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media'
                }
            }
        ]
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
        ),
        // 打包提取css文件
        new MiniCssExtractPlugin(
            {
                filename: 'css/built.css'
            }
        ),
        // 进行css压缩
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // 会自动进行js压缩
    mode: 'production'
}