# webpack知识汇总
## webpack五个核心概念
    1. Entry:入口指示，webpack以哪个文件作为入口起点开始打包，分析构建内部依赖图
    2. Outout:输出指示，webpack打包后的资源bundles输出到哪里去，以及如何命名
    3. Loader:让webpack能够去处理那些非JavaScript文件
    4. Plugins:插件可以用执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等
    5. Mode:模式指示Webpack使用响应的模式配置(development(本地调试的环境)/production(上线运行的环境))
## webpack
