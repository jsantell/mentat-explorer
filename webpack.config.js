var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var isProduction = process.env.NODE_ENV === 'production';

var envPlugins = {
  production: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  development: [],
};

var plugins = [
  // Add plugins here
].concat(envPlugins[process.env.NODE_ENV || 'development']);

module.exports = {
  entry: './app/index.jsx',
  output: {
    path: './public/scripts',
    filename: 'app.js',
    publicPath: '/scripts/',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: 'style!css?modules',
      include: /flexboxgrid/,
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  devtool: !isProduction ? 'cheap-module-source-map' : void 0,
  plugins: plugins,
};
