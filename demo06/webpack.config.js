const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.jsx',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    module: {
        rules: [{
            test: /\.js[x]$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }]
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    devServer: {
        open: true
    }
};