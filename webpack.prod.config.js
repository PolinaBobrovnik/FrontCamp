const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new UglifyJSPlugin(),
  ],
});
