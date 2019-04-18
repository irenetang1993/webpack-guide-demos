# Introduction

> 根据[webpack指南](https://www.webpackjs.com/guides/)中的示例写的demo，webpack版本是v4.29.6.

# Attention
> 基本是按照指南目录顺序写的，有一些小节本身没有示例或者示例内容点少，直接加在上一个或下一个demo中了。
> 小节中有些示例经测试不需要额外的代码也能实现相应的功能，demo会完善这些地方，因此和指南示例有所不同（如：demo13 & demo14）

# How to run
* cd to each demo
* npm install
* npm run start / npm run build / npm run server (different demos use specific cmds, referring to their package.json)

# Demo Details

### Demo13 - 启用HMR

* 文档中说要配置两个插件:HotModuleReplacementPlugin & NamedModulesPlugin
* 经测试，两个都不配置HRM也可以生效;
* 只需在devServer中配置hot: true或者命令行中配置webpack-dev-server --hot（此时webpack-dev-server会自动添加HotModuleReplacementPlugin，但是不会添加NamedModulesPlugin，具体可参考【node_modules\webpack-dev-server\lib\utils\addEntries.js】）
* 并且在index.js中接受print.js的变化即可

### Demo14 - 通过Node.js API
* 在这个示例中也不需要手动引用HotModuleReplacementPlugin就能使HRM生效，同时还解答了以下问题（请参考server.js中的注释）
* webpackDevServer.addDevServerEntrypoints(config, options)的作用是什么？
* 配置open: true为什么不会自动打开浏览器？

### Summary
* demo13和demo14的原理是一样的，区别在于谁去创建这个server。
* demo13是通过在命令行运行webpack-dev-server，结合当前目录下webpack配置文件（默认webpack.config.js，也可通过 webpack-dev-server --config指定配置文件），由webpack-dev-server去创建的，具体创建过程参考node_modules\webpack-dev-server\bin\webpack-dev-server.js中的startDevServer
* 而demo14是通过自己引入相应的包（webpack-dev-server/webpack等）手动去创建一个server。

### Demo16 - Tree Shaking
* 在mode: 'development'模式下，不设置optimization: { usedExports: true }打包后的文件copy到了bundle-no-usedExports.js中；
* 在mode: 'development'模式下，设置optimization: { usedExports: true }打包后的文件copy到了bundle-with-usedExports.js中；
* 在mode: 'none'模式下（npm run none），不添加usedExports: true打包后的文件copy到了bundle-none-mode.js中；
* 可以对比看看这三个文件:
* 1: mode: none VS mode: development：webpackBootstrap函数没什么区别，关键在于传入的实参，前者是数组，后者是一个以文件路径为key，模块函数为value的对象。
* 2: 当设置optimization: { usedExports: true }：会通过注释指出该模块中哪些exports被使用了 & 哪些是无用的导出。例如： exports used: cube（被使用）; unused harmony export square（无用导出）。[optimization.usedExports](https://webpack.js.org/configuration/optimization/#optimizationusedexports)
* 关于tree shaking的其他文章：
* [Tree-Shaking性能优化实践 - 原理篇](https://juejin.im/post/5a4dc842518825698e7279a9)
* [你的Tree-Shaking并没什么卵用](https://juejin.im/post/5a5652d8f265da3e497ff3de)
* [Webpack 中的 sideEffects 到底该怎么用？](https://zhuanlan.zhihu.com/p/40052192)

