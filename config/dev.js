/* eslint-disable max-len */

import path from 'path'
import webpack from 'webpack'
import base from './base'
import merge from 'lodash/merge'

const loaders = [{
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '..', 'client'),
  exclude: path.join(__dirname, '/node_modules/'),
}, {
  test: /\.css$/,
  loaders: [
    'isomorphic-style',
    `css?${JSON.stringify({
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]__[local]___[hash:base64:5]',
    })}`,
    'postcss',
  ],
}, {
  test: /\.scss$/,
  loaders: [
    'isomorphic-style',
    `css?${JSON.stringify({
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]__[local]___[hash:base64:5]',
    })}`,
    'postcss',
    'resolve-url',
    'sass',
  ],
}]

const config = merge({}, base.config, {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
      './scripts/index.jsx',
    ],
    vendor: ['./scripts/vendor/index.js'],
  },
  cache: true,
  devtool: '#eval',
  name: 'client bundle',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
    }),
  ],
  module: {
    loaders: base.getLoaders().concat(loaders),
  },
})

export default config
