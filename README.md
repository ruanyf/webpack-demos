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

You can use `webpack-dev-server` to launch a living server to view the demo's result.

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

Loaders are preprocessors which transform a resource file of your app. For example, JSX-loader can transform JSX file into JS file.

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

`module.loaders` is used to assign which loader to load.

## Demo04: CSS-loader

## License

MIT
