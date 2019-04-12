const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    // 命令行配置的优先级高于devServer
    // 以open为例，命令行配置true，devServer配置false，结果还是会自动打开浏览器
    contentBase: './dist',
    hot: true,
    open: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '模块热替换'
    })
    // 此处和文档所说不一致，文档中说要配置下面两个插件，当然主要是需要配置HotModuleReplacementPlugin，配不配置NamedModulesPlugin不影响热更新；
    // 经测试，不配置HRM也可以生效;
    // 只需在devServer中配置hot: true或者命令行中配置webpack-dev-server --hot
    // 并且在index.js中接受print.js的变化
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};

// 总结：
// demo13和demo14的原理是一样的，区别在于谁去创建这个server。
// demo13是通过在命令行运行webpack-dev-server，结合当前目录下webpack配置文件（默认webpack.config.js，也可通过 webpack-dev-server --config指定配置文件），
// 由webpack-dev-server去创建的，具体创建过程参考node_modules\webpack-dev-server\bin\webpack-dev-server.js中的startDevServer
// 而demo14是通过自己引入相应的包（webpack-dev-server/webpack等）手动去创建一个server。