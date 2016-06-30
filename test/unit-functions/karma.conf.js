/**
 * Created by gurghet on 29/06/16.
 */

module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['mocha'],
    files: ['test/unit-functions/specs/*.spec.js'],
    preprocessors: {
      'src/**/*.js': ['babel'],
      'test/**/*.js': ['babel']
    },
    babelPreprocessor: {
      //plugins: [
      //  'transform-es2015-modules-umd'
      //],
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js')
      },
      sourceFileName: function (file) {
        return file.originalPath
      }
    }
  })
}
