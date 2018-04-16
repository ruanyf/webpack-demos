const DefinePlugin = require('webpack').DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    plugins: [
        new HtmlWebpackPlugin(),

        new DefinePlugin({
            isProduction: JSON.stringify(isProduction)
        })
    ],

    devServer: {
        open: true
    }
};