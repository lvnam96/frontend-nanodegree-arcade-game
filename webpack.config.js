const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DEV_SERVER_PORT = 1111;

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: './build/[name].js',
  },
  devtool: 'cheap-module-source-map', // use 'source-map' for production
  devServer: {
    index: '', // specify to enable root proxying
    // publicPath,
    // public: 'http://localhost:' + DEV_SERVER_PORT,
    noInfo: true,
    stats: 'minimal', // This option has no effect when used with quiet or noInfo.
    open: true,
    // openPage: '',
    useLocalIp: true,
    host: '0.0.0.0', // use current IP to allow access via LAN
    hot: false, // disable while developing static landing pages on HTML files
    compress: false,
    port: DEV_SERVER_PORT,
    // https: true,// true for self-signed, object for cert authority
    contentBase: [path.resolve(__dirname, './src')],
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ['./build/*.*'],
      dangerouslyAllowCleanPatternsOutsideProject: false,
    }),
    new CopyWebpackPlugin([
      { from: './src/css/*', to: './build/css/' },
      { from: './src/images/*', to: '../build/images/' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      chunks: ['main'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components|prototype)/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components|prototype)/,
        // include: [
        //     path.resolve(__dirname, './entrypoints/signin'),
        //     path.resolve(__dirname, './entrypoints/signup')
        //     // path.resolve(__dirname, 'entrypoints/**')
        // ],
        options: {
          envName: process.env.BABEL_ENV || process.env.NODE_ENV || 'development',
          configFile: './.babelrc', // must be specified as babel-loader doesnot find it
        },
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            options: {
              sourceMap: true,
            },
            loader: 'css-loader',
          },
          {
            options: {
              sourceMap: true,
            },
            loader: 'resolve-url-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            options: {
              name: '[name].[ext]',
              limit: 8192,
            },
            loader: 'url-loader',
          },
          {
            options: {
              name: '[name].[ext]',
              disable: true, // webpack@2.x and newer
            },
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
};
