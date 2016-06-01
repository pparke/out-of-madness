const path              = require('path');
const webpack           = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const phaserModule  = path.join(__dirname, '/node_modules/phaser/');
const phaser        = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi          = path.join(phaserModule, 'build/custom/pixi.js');
const p2            = path.join(phaserModule, 'build/custom/p2.js');


// entry point and build directory
const entries = {
  app: [
    'babel-polyfill',
    path.join(__dirname, 'src/game.js')
  ]
};
const build = path.join(__dirname,  'dist');
const publicPath = './dist/';

module.exports = {
  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: entries,
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: build,
    filename: 'game.js'
  },
  watch: true,
  // dev server options
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src') },
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
    }
  }
};
