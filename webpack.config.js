const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: './src/scripts/pages/index.js',
    main: './src/scripts/pages/main.js',
    finish: './src/scripts/pages/finish.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/coffee-maker/',
  },
  devServer: {
    port: 8080,
    openPage: 'coffee-maker/',
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
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
