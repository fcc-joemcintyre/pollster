const path = require ('path');
const CompressionPlugin = require ('compression-webpack-plugin');

const baseDest = path.resolve (__dirname, '../../dist');

module.exports = {
  entry: {
    app: './src/components/app/index.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: `${baseDest}/public/js`,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            noEmit: false,
          },
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
