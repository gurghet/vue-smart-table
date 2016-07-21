var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './src/vue-smart-table.js'
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: false })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot, // dist directory
    filename: utils.assetsPath('vue-smart-table.min.js'),
    library: "SmartTable",
    libraryTarget: "umd"
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: false
    })
  },
  externals: {
    'vue': 'Vue',
    'vue-resource': 'VueResource'
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
})
