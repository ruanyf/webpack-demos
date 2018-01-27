module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  }
};
