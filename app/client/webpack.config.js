const path = require ('path');
const CompressionPlugin = require ('compression-webpack-plugin');

const baseDest = path.resolve (__dirname, '../../dist');

module.exports = {
  resolve: {
    extensions: ['.js'],
    alias: {
      uikit: path.resolve (__dirname, 'libs/uikit'),
      'use-fields': path.resolve (__dirname, 'libs/use-fields'),
      validators: path.resolve (__dirname, 'libs/validators'),
    },
  },
  entry: {
    app: './src/components/app/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: `${baseDest}/public/js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CompressionPlugin ({
      test: /bundle.js$/,
    }),
  ],
};
