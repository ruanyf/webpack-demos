const AggressiveSplittingPlugin = require('webpack').optimize.AggressiveSplittingPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const modes = {
    [true]: 'production',
    [false]: 'development'
};

module.exports = {
    entry: {
        app: './app.jsx'
    },

    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },

    target: 'web',

    mode: modes[isProduction],

    cache: true, 

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
        }),

        new AggressiveSplittingPlugin({
            minSize: 30000,
            maxSize: 50000
        })
    ],

    devServer: {
        open: true
    }
};