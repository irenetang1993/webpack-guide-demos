const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.js');

// 配置options.open: true不会自动打开浏览器的原因如下：
// 1.【配置options.open: true自动打开浏览器的功能】在【node_modules\webpack-dev-server\lib\utils\status.js】中实现
// 2. new webpackDevServer的时候执行的是【node_modules\webpack-dev-server\lib\Server.js】，该文件中压根没引用status.js
// 3. 而使用命令行的方式（demo13）配置options.open: true能自动打开浏览器是因为执行的是【node_modules\webpack-dev-server\bin\webpack-dev-server.js】，该文件中引用了status.js
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
  // open: true // 这里配置open: true不会自动打开浏览器
}

// 执行webpackDevServer.addDevServerEntrypoints(config, options)之后，有如下变化：
// 1. config.entry由{ app: './src/index.js' }变成如下
// entry: {
//   app: {
//     [
//       'E:\\projects\\webpack-tutorial-demos\\demo14_通过Node.js API\\node_modules\\webpack-dev-server\\client\\index.js?http://localhost',
//       'E:\\projects\\webpack-tutorial-demos\\demo14_通过Node.js API\\node_modules\\webpack\\hot\\dev-server.js',
//       './src/index.js'
//     ]
//   }
// }
// 2. 因为options.hot === true，会自动在webpack.config.js的plugins中加上HotModuleReplacementPlugin插件
// 可以在执行前后输出config查看变化；以上两点可以参考node_modules\webpack-dev-server\lib\utils\addEntries.js
webpackDevServer.addDevServerEntrypoints(config, options); 
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000')
})