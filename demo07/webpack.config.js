const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    optimization: {
        minimize: isProduction,

        minimizer: [
            new UglifyJsPlugin()
        ]
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],

    devServer: {
        open: true
    }
};
