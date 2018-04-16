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
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }]
    }
};