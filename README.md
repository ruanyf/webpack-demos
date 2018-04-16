<h1 align="center">
    <img src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/866/739608866_459647a5-afaa-4f81-bef5-6076c8cdf7d3.png?cb=1523910063">
</h1>

This repo is a collection of simple demos of Webpack.

These demos are purposely written in a simple and clear style. You will find no difficulty in following them to learn the powerful tool.

## How to use

First, install [Webpack](https://www.npmjs.com/package/webpack) and [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) globally.

```bash
$ npm i -g webpack webpack-dev-server
```

Then, clone the repo.

```bash
$ git clone https://github.com/ruanyf/webpack-demos.git
```

Install the dependencies using your favorite manager.

```bash
$ cd webpack-demos
$ npm install
$ # or if you prefer yarn
$ yarn
```

Now, play with the source files under the repo's demo* directories.

```bash
$ cd demo01
$ npm run dev
$ # or
$ yarn dev
```

If the above command doesn't open your browser automaticly, you have to visit http://127.0.0.1:8080 by yourself.

## Foreword: What is Webpack

Webpack is a front-end tool to build JavaScript module scripts for browsers.

It can be used similar to Browserify, and do much more.

```bash
$ browserify main.js > bundle.js
# be equivalent to
$ webpack main.js bundle.js
```

Webpack needs a configuration file called `webpack.config.js` which is just a CommonJS module.

```javascript
// webpack.config.js
module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    }
};
```

After having `webpack.config.js`, you can invoke Webpack without any arguments.

```bash
$ webpack
```

Some command-line options you should know.

- `webpack` – building for development
- `webpack -p` – building for production (minification)
- `webpack --watch` – for continuous incremental building
- `webpack -d` – including source maps
- `webpack --colors` – making building output pretty

You could customize `scripts` field in your package.json file as following.

```javascript
// package.json
{
  // ...
    "scripts": {
        "dev": "webpack-dev-server --devtool eval --progress --colors",
        "deploy": "NODE_ENV=production webpack -p"
    },
  // ...
}
```

## Index

1. [Entry file](#demo01-entry-file-source)
1. [Multiple entry files](#demo02-multiple-entry-files-source)
1. [Babel-loader](#demo03-babel-loader-source)
1. [CSS-loader](#demo04-css-loader)
1. [HTML Webpack Plugin](#demo05-html-webpack-plugin)
1. [CSS Module](#demo06-css-module-source)
1. [UglifyJs Plugin](#demo07-uglifyjs-plugin-source)
1. [Image Loader]((#demo08-image-loader-source))
1. [Environment flags](#demo09-environment-flags-source)
1. [Code splitting](#demo10-code-splitting-source)
1. [Code splitting with bundle-loader](#demo11-code-splitting-with-bundle-loader-source)
1. [Common chunk](#demo12-common-chunk-source)
1. [Vendor chunk](#demo13-vendor-chunk-source)
1. [Exposing Global Variables](#demo14-exposing-global-variables-source)
1. [React router](#demo15-react-router-source)
1. [TypeScript](#demo16-typescript-source)
1. [AggressiveSplittingPlugin](#demo17-aggressivesplittingplugin-source)

## Demo01: Entry file ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo01))

Entry file is a file which Webpack reads to build `bundle.js`.

For example, `main.js` is an entry file.

```javascript
// main.js
document.write('<h1>Hello World</h1>');
```

`index.html`

```html
<html>
<body>
    <script type="text/javascript" src="./dist/bundle.js"></script>
</body>
</html>
```

Webpack follows `webpack.config.js` to build `bundle.js`. Also, we should stop at 2 properties that are declared here - `target` and `mode`. We specify `target` as `web`, because we compile our code for usage in browser-like environment. There are also available targets as `node`, `electron`, etc. `mode` property tells webpack to enable production optimizations or development hints, you can choose one of three - `development`, `production`, `none`. Also, we check our `process.env` global variable, that is injected by Node at runtime, if it has a property `NODE_ENV` that equals to `production`.

`webpack.config.js`

```javascript
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development'
};
```

Launch the server, visit http://127.0.0.1:8080 .

```bash
$ cd demo01
$ npm run dev
```

## Demo02: Multiple entry files ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo02))

Multiple entry files are allowed. It is useful for a multi-page app which has different entry file for each page.

```javascript
// main1.js
document.write('<h1>Hello World</h1>');

// main2.js
document.write('<h2>Hello Webpack</h2>');
```

`index.html`

```html
<html>
<body>
    <script src="./dist/bundle1.js"></script>
    <script src="./dist/bundle2.js"></script>
</body>
</html>
```

`webpack.config.js`

```javascript
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        bundle1: './main1.js',
        bundle2: './main2.js'
    },

    output: {
        filename: '[name].js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development'
};
```

## Demo03: Babel-loader ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo03))

Loaders are preprocessors which transform a resource file of your app ([more info](http://webpack.github.io/docs/using-loaders.html)) before Webpack's building process.

For example, [Babel-loader](https://www.npmjs.com/package/babel-loader) can transform JSX/ES6 file into normal JS files，after which Webpack will begin to build these JS files. Webpack's official doc has a complete list of [loaders](http://webpack.github.io/docs/list-of-loaders.html).

`main.jsx` is a JSX file.

```javascript
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.querySelector('#wrapper')
);
```

`index.html`

```html
<html>
<body>
    <div id="wrapper"></div>
    <script src="./dist/bundle.js"></script>
</body>
</html>
```

`webpack.config.js`

```javascript
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.jsx',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }]
    }
};
```

The above snippet uses `babel-loader` which needs Babel's preset plugins [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) and [babel-preset-react](https://www.npmjs.com/package/babel-preset-react) to transpile ES6 and React.

## Demo04: CSS-loader ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo04))

Webpack allows you to include CSS in JS file, then preprocessed CSS file with [CSS-loader](https://github.com/webpack-contrib/css-loader).

`main.js`

```javascript
import './app.css';
```

`app.css`

```css
body {
    background-color: blue;
}

h1 {
    color: salmon;
}
```

`index.html`

```html
<html>
<body>
    <h1>Hello World</h1>
    <script type="text/javascript" src="./dist/bundle.js"></script>
</body>
</html>
```

`webpack.config.js`

```javascript
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }]
    }
};
```

Attention, you have to use two loaders to transform CSS file. First is [CSS-loader](https://www.npmjs.com/package/css-loader) to read CSS file, and another one is [Style-loader](https://www.npmjs.com/package/style-loader) to insert `<style>` tag into HTML page.

Then, launch the server.

```bash
$ cd demo04
$ npm run dev
```

Actually, Webpack inserts an internal style sheet into `index.html`.

```html
<head>
    <style type="text/css">
        body {
            background-color: blue;
        }
    </style>
</head>
```

## Demo05: HTML Webpack Plugin ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo05))

This demo shows you how to load 3rd-party plugins.

[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) could create `index.html` for you.

`main.js`

```javascript
document.write('<h1>Hello World</h1>');
```

`webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    plugins: [
        new HtmlWebpackPlugin()
    ],

    devServer: {
        open: true
    }
};
```

Now you don't need to write `index.html` by hand and don't have to open browser by yourself. Webpack did all these things for you.

## Demo06: CSS Module ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo06))

`css-loader?modules` (the query parameter modules) enables the [CSS Module](https://github.com/css-modules/css-modules) which gives a local scoped CSS to your JS module's CSS. You can switch it off with `:global(selector)` ([more info](https://css-modules.github.io/webpack-demo/)).

`index.html`

```html
<html>
<body>
    <h1 class="h1">Hello World</h1>
    <h2 class="h2">Hello Webpack</h2>
    <div id="example"></div>
</body>
</html>
```

`app.css`

```css
/* local scope */
.h1 {
    color:red;
}

/* global scope */
:global(.h2) {
    color: blue;
}
```

`main.jsx`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import style from './app.css';

ReactDOM.render(
    <div>
        <h1 className={style.h1}>Hello World</h1>
        <h2 className="h2">Hello Webpack</h2>
    </div>,
    document.querySelector('#example')
);
```

`webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.jsx',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    module: {
        rules: [{
            test: /\.js[x]$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }]
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    devServer: {
        open: true
    }
};
```

Launch the server.

```bash
$ cd demo06
$ npm run dev
```

Visiting http://127.0.0.1:8080 , you'll find that only second `h1` is red, because its CSS is local scoped, and both `h2` is blue, because its CSS is global scoped.

## Demo07: UglifyJs Plugin ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo07))

Webpack has a plugin system to expand its functions. For example, [UglifyJs Plugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/) will minify output(`bundle.js`) JS codes. Basically, production mode already tells webpack to minify javascript, but you can also configure your production config, in webpack 4 it was moved from `plugins` to `optimization` section.

`main.js`

```javascript
let longVariableName = 'Hello';
longVariableName += ' World';
document.write(`<h1>${longVariableName}</h1>`);
```

`webpack.config.js`

```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    optimization: {
        minimize: isProduction,

        minimizer: [
            new UglifyJsPlugin({
                // ... your options here
            })
        ]
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],

    devServer: {
        open: true
    }
};

```

After launching the server, `main.js` will be minified into following.

```javascript
var o="Hello";o+=" World",document.write("<h1>"+o+"</h1>")
```

## Demo08: Image Loader ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo08))

Webpack could also include images in JS files.

`main.js`

```javascript
import small from './small.png';
import big from './big.png';

const image1 = document.createElement('img');
image1.src = small;

const image2 = document.createElement('img');
image2.src = big;

[image1, image2].forEach(image => document.body.appendChild(image));
```

`webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    module: {
        rules: [{
            test: /\.(png|jpg)$/,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true
                    }
                }
            ]
        }]
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],

    devServer: {
        open: true
    }
};
```

Launch the server.

```bash
$ cd demo08
$ npm run dev
```

[file-loader](https://github.com/webpack-contrib/file-loader) emits your image as file in the output directory and returns its URL as MD5 hash. Also it can be chained with [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) that can compress your images.

## Demo09: Environment flags ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo09))

You can enable some codes only in development environment with environment flags.

`main.js`

```javascript
if (isProduction) {
    document.write('<h1>We are in production mode!</h1>');
} else {
    document.write('<h1>We are in development mode bro!</h1>');
}
```

`webpack.config.js`

```javascript
const DefinePlugin = require('webpack').DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    plugins: [
        new HtmlWebpackPlugin(),

        new DefinePlugin({
            isProduction: JSON.stringify(isProduction)
        })
    ],

    devServer: {
        open: true
    }
};
```

Now pass environment variable into webpack. Opening `demo09/package.json`, you should find `scripts` field as following. Here we don't specify anything, so `isProduction` environment variable is automatically set to `false`.

```javascript
// package.json
{
  // ...
    "scripts": {
        "dev": "webpack-dev-server"
    }
  // ...
}
```

Launch the server.

```javascript
$ cd demo09
$ npm run dev
```

## Demo10: Code splitting ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo10))

For big web apps, it’s not efficient to put all code into a single file. Webpack allows you to split a large JS file into several chunks. Especially, if some blocks of code are only required under some circumstances, these chunks could be loaded on demand.

Webpack uses `require.ensure` to define a split point ([official document](http://webpack.github.io/docs/code-splitting.html)).

`main.js`

```javascript
require.ensure(['./a'], require => {
    const content = require('./a');
    document.open();
    document.write(`<h1>${content.default}</h1>`);
    document.close();
});
```

`require.ensure` tells Webpack that `./a.js` should be separated from `bundle.js` and built into a single chunk file.

`a.js`

```javascript
export default 'Hello World';
```

Now Webpack takes care of the dependencies, output files and runtime stuff. You don't have to put any redundancy into your `index.html` and `webpack.config.js`.

webpack.config.js

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    plugins: [
        new HtmlWebpackPlugin()
    ],

    devServer: {
        open: true
    }
};
```

Launch the server.

```bash
$ cd demo10
$ npm run dev
```

On the surface, you won't feel any differences. However, Webpack actually builds `main.js` and `a.js` into different chunks(`bundle.js` and `0.bundle.js`), and loads `0.bundle.js` from `bundle.js` when on demand.

## Demo11: Code splitting with bundle-loader ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo11))

Another way of code splitting is using [bundle-loader](https://www.npmjs.com/package/bundle-loader).

`main.js`

```javascript
// Now a.js is requested, it will be bundled into another file
import bundle from 'bundle-loader!./a';

// To wait until a.js is available (and get the exports)
// you need to async wait for it.
bundle(file => {
    document.open();
    document.write(`<h1>${file.default}</h1>`);
    document.close();
});
```

`import bundle from 'bundle-loader!./a'` tells Webpack to load `a.js` from another chunk.

Now Webpack will build `main.js` into `bundle.js`, and `a.js` into `0.bundle.js`.

## Demo12: Common chunk ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo12))

When multi scripts have common chunks, you can extract the common part into a separate file. [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) was deprecated when webpack 4 was out. But webpack team made a great improvement, because they added `optimization` section for config, that also allows to create separate chunks and chunk hash maps.

```javascript
// main1.jsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello World</h1>,
    document.querySelector('#a')
);

// main2.jsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello Webpack</h1>,
    document.querySelector('#b')
);
```

`index.html`

```html
<html>
<body>
    <div id="a"></div>
    <div id="b"></div>
</body>
</html>
```

Let's take a look that `main1.jsx` and `main2.jsx` have common dependendies, so we want those modules - `react` and `react-dom` chunk into separate file, often called `vendor.js`. As you can imagine, `vendor.js` includes `react` and `react-dom`.

`webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        bundle1: './main1.jsx',
        bundle2: './main2.jsx'
    },

    output: {
        filename: '[name].js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial'
                }
            }
        }
    },

    devServer: {
        open: true
    }
};
```

We set `runtimeChunk` to `true` telling webpack to create runtime chunk, `splitChunks` finds dependencies which are shared between multiple modules, `'chunks': 'all'` selects chunks for determining shared modules, `cacheGroups` contains `vendor` property, that will be our chunk with dependencies.

## Demo13: Vendor chunk ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo13))

Also another example extracting `jQuery` library into separate file.

`main.js`

```javascript
import $ from 'jquery';
$('h1').text('Hello from jquery');
```

`index.html`

```html
<html>
<body>
    <h1></h1>
</body>
</html>
```

`webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './main.js',

    output: {
        filename: '[name].js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'initial'
                }
            }
        }
    },

    devServer: {
        open: true
    }
};
```

If you want a module available as a global variable in every module, such as making `$` and `jQuery` available in every module without writing `import $ from 'jquery'`. You should use `ProvidePlugin` ([Official doc](https://webpack.js.org/plugins/provide-plugin/)) which automatically loads modules instead of having to import or require them everywhere.

```javascript
// main.js
$('h1').text('Hello World');

// webpack.config.js
const ProvidePlugin = require('webpack').ProvidePlugin;

module.exports = {
    entry: './main.js',

    output: {
        filename: 'bundle.js'
    },

    plugins: [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
```

Of course, in this case, you should load `jquery.js` globally by yourself.

## Demo14: Exposing global variables ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo14))

If you want to use some global variables, and don't want to include them in the Webpack bundle, you can enable `externals` field in `webpack.config.js` ([official document](https://webpack.js.org/configuration/externals/)).

For example, we have `underscore.js` library and we want to include it from a CDN.

`index.html`

```html
<html>
<body>
    <div id="#app"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
</body>
</html>
```

Webpack will build our `bundle.js`, and `_` that references to the `underscore.js` is also exposed as a global variable. Try to type in console `window.hasOwnProperty('_') => true`.

`webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        main: './main.jsx',
    },

    output: {
        filename: '[name].js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    externals: {
        underscore: '_'
    },

    devServer: {
        open: true
    }
};
```

Now, you can import `_` as a module variable in your script, but actually it's a global variable and `window`'s property.

`main.jsx`

```javascript
import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>i betcha underscore is available here and its version is {_.VERSION}</h1>,
    document.querySelector('#app')
);

```

You could also put `react` and `react-dom` into `externals`, which will greatly decreace the building time and building size of `bundle.js`.

## Demo15: React router ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo15))

This demo uses webpack to build [React-router](https://github.com/rackt/react-router/blob/0.13.x/docs/guides/overview.md)'s official example.

Let's imagine a little app with a dashboard, inbox, and calendar.

```
+---------------------------------------------------------+
| +---------+ +-------+ +--------+                        |
| |Dashboard| | Inbox | |Calendar|      Logged in as Jane |
| +---------+ +-------+ +--------+                        |
+---------------------------------------------------------+
|                                                         |
|                        Dashboard                        |
|                                                         |
|                                                         |
|   +---------------------+    +----------------------+   |
|   |                     |    |                      |   |
|   | +              +    |    +--------->            |   |
|   | |              |    |    |                      |   |
|   | |   +          |    |    +------------->        |   |
|   | |   |    +     |    |    |                      |   |
|   | |   |    |     |    |    |                      |   |
|   +-+---+----+-----+----+    +----------------------+   |
|                                                         |
+---------------------------------------------------------+
```

`webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './index.js',

    output: {
        filename: 'bundle.js'
    },

    target: 'web',

    mode: isProduction ? 'production' : 'development',

    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    devServer: {
        open: true
    }
};
```

`index.html`

```html
<html>
<body>
    <div id="app"></div>
</body>
</html>
```

`index.js`

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './app.css';

// ref https://stackoverflow.com/questions/46482433/reactjs-createclass-is-not-a-function
class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <ul>
                        <li><Link to="/app">Dashboard</Link></li>
                        <li><Link to="/inbox">Inbox</Link></li>
                        <li><Link to="/calendar">Calendar</Link></li>
                    </ul>
                    Logged in as Jane
                </header>
                <main>
                    <Switch>
                        <Route exact path="/" component={Dashboard}/>
                        <Route path="/app" component={Dashboard}/>
                        <Route path="/inbox" component={Inbox}/>
                        <Route path="/calendar" component={Calendar}/>
                        <Route path="*" component={Dashboard}/>
                    </Switch>
                </main>
            </div>
        );
    }
};

class Dashboard extends Component {
    render() {
        return (
            <div>
                <p>Dashboard</p>
            </div>
        );
    }
};

class Inbox extends Component {
    render() {
        return (
            <div>
                <p>Inbox</p>
            </div>
        );
    }
};

class Calendar extends Component {
    render() {
        return (
            <div>
                <p>Calendar</p>
            </div>
        );
    }
};

// ref https://segmentfault.com/q/1010000009616045/a-1020000009618728
render((
    <BrowserRouter>
        <Route path="/" component={App}/>
    </BrowserRouter>
), document.querySelector('#app'));
```

Launch the server.

```bash
$ cd demo15
$ npm run dev
```

## Demo16: TypeScript ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo16))

What about if you wanna use [TypeScript](http://typescriptlang.org) in your application? TypeScript has a [ts-loader](https://github.com/TypeStrong/ts-loader) for webpack.

`main.ts`

```typescript
declare function require(modulePathOrName: string): any;

document.addEventListener('DOMContentLoaded', (e: Event) => {
    require('./app.css') as string;

    document.body.insertAdjacentHTML('afterend', `
        <h1>Hello world</h1>
    `);
});
```

`app.css`

```css
body {
    background: linear-gradient(to right, cadetblue, cyan);
}

h1 {
    color: bisque;
}
```

`webpack.config.js`

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const modes = {
    [true]: 'production',
    [false]: 'development'
};

module.exports = {
    context: __dirname,

    entry: './main.ts',

    output: {
        filename: '[name].js'
    },

    target: 'web',

    mode: modes[isProduction],

    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }]
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],

    devServer: {
        open: true
    }
};
```

Also, don't forget about configuration file for the typescript compiler.

`tsconfig.json`

```json
{
    "compileOnSave": false,
    "compilerOptions": {
        "sourceMap": true,
        "moduleResolution": "node",
        "target": "es5",
        "lib": [
            "es2017",
            "dom"
        ]
    }
}
```

## Demo17: AggressiveSplittingPlugin ([source](https://github.com/ruanyf/webpack-demos/tree/master/demo17))

Let's take a look at one more plugin that is called `AggressiveSplittingPlugin`. It is well explained in the documentation and very easy to use.

`index.html`

```html
<html>
<body>
    <div id="app"></div>
</body>
</html>
```

`app.jsx`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello AggressiveSplittingPlugin</h1>,
    document.querySelector('#app')
);
```

`webpack.config.js`

```javascript
const AggressiveSplittingPlugin = require('webpack').optimize.AggressiveSplittingPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const modes = {
    [true]: 'production',
    [false]: 'development'
};

module.exports = {
    entry: {
        app: './app.jsx'
    },

    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },

    target: 'web',

    mode: modes[isProduction],

    cache: true, // <= notice we added this

    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),

        new AggressiveSplittingPlugin({
            minSize: 30000,
            maxSize: 50000
        })
    ],

    devServer: {
        open: true
    }
};
```

We define `minSize` and `maxSize` in plugin options, 30000 bytes equal 0.03 megabytes. Basically, this plugin takes all your dependenies and `for-loop` them, starts with the biggest chunk, so for any chunk which isn't splitted yet, this plugin splits it and creates a new entry.

## Useful links

- [Webpack docs](https://webpack.js.org/concepts/)
- [webpack-howto](https://github.com/petehunt/webpack-howto), by Pete Hunt
- [SurviveJS Webpack book](https://survivejs.com/webpack/introduction/), by Juho Vepsäläinen
- [Diving into Webpack](https://web-design-weekly.com/2014/09/24/diving-webpack/), by Web Design Weekly
- [Webpack and React is awesome](http://www.christianalfoni.com/articles/2014_12_13_Webpack-and-react-is-awesome), by Christian Alfoni
- [Browserify vs Webpack](https://medium.com/@housecor/browserify-vs-webpack-b3d7ca08a0a9), by Cory House

## License

MIT
