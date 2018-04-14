const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const modes = {
    [true]: 'production',
    [false]: 'development'
};

module.exports = {
    context: __dirname,

    entry: './main.ts',

    output: {
        filename: '[name].js'
    },

    target: 'web',

    mode: modes[isProduction],

    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }]
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],

    devServer: {
        open: true
    }
};