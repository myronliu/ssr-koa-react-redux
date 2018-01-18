process.env.NODE_ENV = 'development';

require('babel-core/register')
var webpack = require('webpack')
var path = require('path')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractStyle = new ExtractTextPlugin('all.min.css')
var rucksack = require('rucksack-css')
var autoprefixer = require('autoprefixer')
var fs = require('fs')
var nodeModules = fs.readdirSync('node_modules')
  .filter(function (i) {
    return ['.bin', '.npminstall'].indexOf(i) === -1
  })
var includes = [
  path.resolve(__dirname, 'app'),
  path.resolve(__dirname, 'platforms')
]

module.exports = [{
  name: 'browser side render',
  devtool: 'eval-cheap-module-source-map',//'cheap-source-map',
  entry: {
        main: ['./app/app.js'],
    },
  output: {
    path: __dirname + '/assets',
    filename: '[name].js',
    publicPath: '/build/'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-redux': 'ReactRedux',
    'antd': 'antd'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: includes,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        loader: extractStyle.extract(['css', 'postcss'])
      }, {
        test: /\.less$/,
        include: includes,
        loader: extractStyle.extract(['css', 'less', 'postcss'])
      },
      { test: /\.woff2?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
      { test: /\.(png|jpg|jpeg|gif|webp)$/i, loader: 'url?limit=10000' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html?$/, loader: 'file?name=[name].[ext]' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    extractStyle,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common', filename: 'common.js'
    }),
    //去除重复引用的js
    // new webpack.optimize.DedupePlugin(),
    //混淆压缩
    new UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BROSWER': true,
      __SERVER__: false
    })
  ]

}]

