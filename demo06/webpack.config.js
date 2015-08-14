var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader:ExtractTextPlugin.extract("style-loader", "css-loader") },
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ]
};
