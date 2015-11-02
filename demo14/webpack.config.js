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
					presets:['es2015','react']
				}
      }
    ]
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    //  "jquery": "jQuery"
    'data': 'data'
  }
};
