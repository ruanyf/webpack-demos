var webpack = require('webpack');
var path = require('path');

var entry = [
  'webpack/hot/dev-server',
  'webpack-dev-server/client?http://localhost:8080',
  './index.js'
];
if (process.env.NODE_ENV === 'production') {
  entry = ['./index.js'];
}

module.exports = {
  entry: entry,
  output: {
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
      include: path.join(__dirname, '.')
    }]
  }
};
