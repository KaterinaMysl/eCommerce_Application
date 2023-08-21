const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const mainHtmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, './src/index.html'),
  filename: 'index.html',
  chunks: ['main'],
});

const notFoundHtmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, './public/404.html'),
  filename: '404.html',
  chunks: ['404'],
});

const baseConfig = {
  entry: {
    main: path.resolve(__dirname, './src/index'),
    404: path.resolve(__dirname, './public/404'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: [/\.ts$/i],
        use: ['ts-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    mainHtmlPlugin,
    notFoundHtmlPlugin,
    new CopyWebpackPlugin({
      patterns: [
        { from: 'netlify.toml' },
      ],
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({ extensions: 'ts' }),
    new Dotenv(),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode
    ? require('./webpack.prod.config')
    : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
