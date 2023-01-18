const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Lets the Webpack play around with the html file provided.
      new HtmlWebpackPlugin({
        template: "index.html",
        title: "Webpack Plugin"
      }),
      // Generates a manifest.json
      new WebpackPwaManifest({

      }),
      // Pulls in a custom-made service worker from elsewhere.
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js"
      })
    ],

    module: {
      rules: [
        {// Processes the .css using the provided loaders
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {// Processes .js files with the babel loader
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
