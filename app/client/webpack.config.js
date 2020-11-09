/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true }] */
const path = require ('path');
const CompressionPlugin = require ('compression-webpack-plugin');

// variables for development / staging configuration items
let mode;
let baseDest;

module.exports = (env) => {
  const target = (env && env.target) || 'dev';
  if (target === 'dev') {
    mode = 'development';
    baseDest = path.resolve (__dirname, '../../dist');
  } else if (target === 'prod') {
    mode = 'production';
    baseDest = path.resolve (__dirname, '../../../pollster-stage');
  } else {
    throw new Error ('Missing parameter --env target=[dev | prod]');
  }

  return {
    mode,
    resolve: {
      extensions: ['.js'],
      alias: {
        uikit: path.resolve (__dirname, 'libs/uikit'),
        'use-fields': path.resolve (__dirname, 'libs/use-fields'),
        validators: path.resolve (__dirname, 'libs/validators'),
      },
    },
    entry: {
      app: './src/components/App/index.js',
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
};
