const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: './src/scripts/index.js',
    main: './src/scripts/main.js',
    finish: './src/scripts/finish.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/main.html',
      chunks: ['main'],
      filename: 'main.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/finish.html',
      chunks: ['finish'],
      filename: 'finish.html',
    }),
  ],
};