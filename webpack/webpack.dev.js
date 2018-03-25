/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true }] */
const path = require ('path');
const CopyPlugin = require ('copy-webpack-plugin');
const CompressionPlugin = require ('compression-webpack-plugin');

// variables for shared dev/stage/prod configuration items
const mode = 'development';
const baseSrc = path.resolve (__dirname, '..');
const baseDest = path.resolve (__dirname, '..');

module.exports = {
  mode,
  entry: {
    app: './src/client/components/App/index.js',
    vendor: ['prop-types', 'react', 'react-dom', 'react-redux', 'react-router', 'react-router-dom', 'redux',
      'redux-thunk', 'styled-components', 'whatwg-fetch'],
  },
  output: {
    filename: '[name].bundle.js',
    path: `${baseDest}/dist/public/js`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new CompressionPlugin ({
      test: /\.js$/,
    }),
    new CopyPlugin ([
      { context: 'src/server', from: `${baseSrc}/src/server/**/*`, to: `${baseDest}/dist/` },
      { context: 'src/client', from: `${baseSrc}/src/client/images/**/*`, to: `${baseDest}/dist/public/` },
      { from: `${baseSrc}/src/client/index.html`, to: `${baseDest}/dist/public/` },
      { from: `${baseSrc}/src/client/favicon.ico`, to: `${baseDest}/dist/public/` },
    ]),
  ],
};
