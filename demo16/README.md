First, install [`static-site-generator-webpack-plugin`](https://github.com/markdalgleish/static-site-generator-webpack-plugin).

```bash
$ npm install --save-dev static-site-generator-webpack-plugin
```

Second, create a new file [`template.js`](./template.js).

Third, modify [`webpack.config.js`](./webpack.config.js).

Fourth, modify [`index.js`](./index.js).

Fifth, run `webpack` to generate the static files.

```bash
$ webpack
```

Finally, run `webpack-dev-server` to run the server.

```bash
$ webpack-dev-server
```

Now, visit http://localhost:8080 .
