module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader?modules' }
    ]
  }
};
