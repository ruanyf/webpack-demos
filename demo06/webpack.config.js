module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.js[x]?$/,loader: 'babel',query: {presets: ['es2015', 'react']} },
      { test: /\.css$/, loader: 'style-loader!css-loader?modules' }
    ]
  }
};
