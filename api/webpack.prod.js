const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
/* eslint-enable import/no-extraneous-dependencies */


module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  devtool: 'source-map',
  externals: nodeExternals(),
  node: {
    __filename: true,
    __dirname: true
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install({environment: \'node\'});',
      raw: true,
      entryOnly: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ],
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.join(__dirname, 'node_modules'),
      use: {
        loader: 'babel-loader'
      }
    }]
  }
};
