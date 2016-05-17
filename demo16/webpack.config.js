var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var template = require('./template');

var paths = [
  '/',
  '/app/',
  '/inbox/',
  '/calendar/'
];

module.exports = {
  entry: {
    main: './index.js'
  },
  output: {
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
    ]
  },
  plugins: [
    new StaticSiteGeneratorPlugin('main', paths, {template: template, bundlejs: 'bundle.js'})
  ]
};
