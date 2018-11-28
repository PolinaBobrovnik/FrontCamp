const path = require('path');
const commonConfig = require('./webpack.common.config');
const merge = require('webpack-merge')

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        hot: true,
        inline: true,
        stats: 'errors-only',
    },
});