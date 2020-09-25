const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const { resolve } = require("path");

/* 
    tree shaking: 去除无用代码
        前提：1.必须使用ES6模块化 2.开启production环境
        作用：减少代码体积

        在package.json中配置
         "sideEffects":false 所有代码都没有副作用（都可以进行tree shaking）
          问题是会把 css/@babel/polyfill（副作用）文件干掉
          可以使用"sideEffects":["*.css,"*.less"]
*/
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
        filename: 'built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
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
                // oneOf的意思是以下loader只会有一个被匹配
                // 注意：不能有两个配置处理同一种类型文件
                oneOf: [
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
                        // js兼容性处理
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
                            ],
                            // 开启babel缓存
                            // 第二次构建时，会读取之前的缓存
                            cacheDirectory: true
                        }
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
                filename: 'css/built.[contenthash:10].css'
            }
        ),
        // 进行css压缩
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // 会自动进行js压缩
    mode: 'production',
    devtool: 'source-map'
}