const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        bundle1: './main1.js',
        bundle2: './main2.js'
    },

    output: {
        filename: '[name].js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development'
};