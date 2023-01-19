const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

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
        name: 'JATE',
        short_name: 'JATE',
        description: 'Scribble notes or code snippets!',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('assets/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
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
