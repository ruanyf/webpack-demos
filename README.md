This repo is a collection of simple demos of Webpack.

These demos are purposely written in a simple and clear style. You will find no difficulty in following them to learn the powerful tool.

## How to use

First, install Webpack globally.

```bash
$ npm i -g webpack
```

Then, clone the repo and install the dependencies.

```bash
$ git clone git@github.com:ruanyf/webpack-demos.git
$ cd webpack-demos
$ npm install
```

Now, play with the source files under the repo's demo* directories.

```bash
$ cd demo01
$ webpack-dev-server
```

Visit http://127.0.0.1:8080 with your browser.

## What is Webpack

Webpack is a front-end build systems like Grunt and Gulp.

It can be used as a module bundler similar to Browserify, and do [much more](http://webpack.github.io/docs/what-is-webpack.html).

```bash
$ browserify main.js > bundle.js
# be equivalent to
$ webpack main.js bundle.js
```

Its configuration is `webpack.config.js`.

```javascript
// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

Now you can invoke Webpack without any arguments.

```bash
$ webpack
```

There are some command line options you should know.

- `webpack` – for building once for development
- `webpack -p` – for building once for production (minification)
- `webpack --watch` – for continuous incremental build
- `webpack -d` – to include source maps
- `webpack --colors` – for making things pretty

## Index

1. Entry file
1. Multiple entry files
1. JSX-loader
1. CSS-loader
1. Image loader
1. UglifyJs Plugin

## Demo01: Entry file ([source](demo01))

Entry file is a file which Webpack will read to build bundle.js.

main.js

```javascript
document.write('<h1>Hello World</h1>');
```

index.html

```html
<html>
  <body>
    <script type="text/javascript" src="bundle.js"></script>
  </body>
</html>
```

Webpack follows `webpack.config.js` to build `bundle.js`.

```javascript
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

Launch the server, visit http://127.0.0.1:8080 .

```bash
$ webpack-dev-server
```

## Demo02: Multiple entry files ([source](demo02))

Multiple entry files are allowed.

main1.js

```javascript
document.write('<h1>Hello World</h1>');
```

main2.js

```javascript
document.write('<h2>Hello Webpack</h2>');
```

webpack.config.js

```javascript
module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: '[name].js'
  }
};
```

index.html

```html
<html>
  <body>
    <script src="bundle1.js"></script>
    <script src="bundle2.js"></script>
  </body>
</html>
```

## Demo03: JSX-loader ([source](demo03))

Loaders are preprocessors which transform a resource file of your app. For example, [JSX-loader](https://www.npmjs.com/package/jsx-loader) can transform JSX file into JS file.

main.jsx

```javascript
var React = require('react');

React.render(
  <h1>Hello, world!</h1>,
  document.body
);
```

index.html

```html
<html>
  <body>
    <script type="text/javascript" src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'jsx-loader' },
    ]
  }
};
```

In `webpack.config.js`, `module.loaders` is used to assign loaders.

## Demo04: CSS-loader ([source](demo04))

Webpack allows you to require CSS in JS file, then preprocessed CSS file with CSS-loader.

main.js

```javascript
require('./app.css');
```

app.css

```css
body {
  background-color: blue;
}
```

index.html

```html
<html>
  <head>
    <script type="text/javascript" src="bundle.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
};
```

Attention, you have to use two loaders to transform CSS file. First is [CSS-loader](https://www.npmjs.com/package/css-loader) to read CSS file, and another is [Style-loader](https://www.npmjs.com/package/style-loader) to insert Style tag into HTML page. Different loaders are linked by exclamation mark(!).

After launching the server, `index.html` will have inline style.

```html
<head>
  <script type="text/javascript" src="bundle.js"></script>
  <style type="text/css">
    body {
      background-color: blue;
    }
  </style>
</head>
```

## Demo05: Image loader ([source](tree/master/demo05))

Webpack could also require images in JS files.

main.js

```javascript
var img1 = document.createElement("img");
img1.src = require("./small.png");
document.body.appendChild(img1);

var img2 = document.createElement("img");
img2.src = require("./big.png");
document.body.appendChild(img2);
```

index.html

```html
<html>
  <body>
    <script type="text/javascript" src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  }
};
```

[`url-loader`](https://www.npmjs.com/package/url-loader) transforms image files. If the image size is bigger than 8192 bytes, it will be transformed into Data URL; otherwise, it will be transformed into normal URL. As you see, question mark(?) is be used to pass parameters into loaders.

After launching the server, `small.png` and `big.png` will have the following URLs.

```html
<img src="data:image/png;base64,iVBOR...uQmCC">
<img src="4853ca667a2b8b8844eb2693ac1b2578.png">
```

## Demo06: UglifyJs Plugin (source)

Webpack has a plugin system to expand its functions. For example, [UglifyJs Plugin](http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) will minify JS codes.

main.js

```javascript
var longVariableName = 'Hello';
longVariableName += ' World';
document.write('<h1>' + longVariableName + '</h1>');
```

index.html

```html
<html>
<body>
  <script src="bundle.js"></script>
</boby>
</html>
```

webpack.config.js

```javascript
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
```

After launching the server, the `main.js` will be minified into following.

```javascript
var o="Hello";o+=" World",document.write("<h1>"+o+"</h1>")
```

## License

MIT
