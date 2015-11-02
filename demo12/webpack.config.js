var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
  entry: {
    bundle1: './main1.jsx',
    bundle2: './main2.jsx'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders:[
      { test: /\.js[x]?$/,loader: 'babel',query: {presets: ['es2015', 'react']} }
    ]
  },
  plugins: [
    new CommonsChunkPlugin('init.js')
  ]
}
