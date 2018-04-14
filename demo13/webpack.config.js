const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: '[name].js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'initial'
                }
            }
        }
    },

    devServer: {
        open: true
    }
};