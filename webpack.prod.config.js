const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common.config');
const merge = require('webpack-merge')

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new UglifyJSPlugin(),
    ]
});