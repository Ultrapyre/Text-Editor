const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

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
        template: "./index.html",
        title: "JATE"
      }),
      //Pulls in a custom-made service worker from elsewhere.
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js"
      }),
      // Generates a manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Take notes with Javascript syntax highlighting',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        id: './',
        start_url: './',
        publicPath: './',
        orientation: "portrait",
        display: "standalone",
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {// Processes the .css using the provided loaders
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {// Processes .js files with the babel loader
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
