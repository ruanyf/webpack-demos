const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        main: './main.jsx',
    },

    output: {
        filename: '[name].js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    externals: {
        underscore: '_'
    },

    devServer: {
        open: true
    }
};