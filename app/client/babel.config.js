module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: [
          'chrome >= 61',
          'firefox >= 55',
          'ios >= 10.3',
          'safari >= 10.1',
        ],
        node: '14.14.0',
      },
    }],
    ['@babel/preset-react', {
      runtime: 'automatic',
    }],
  ],
  plugins: [
    'babel-plugin-styled-components',
  ],
};
