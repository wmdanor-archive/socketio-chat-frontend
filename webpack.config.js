try {
  require('dotenv').config();
} catch {
}
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const allowedEnvKeys = new Set(['BACKEND_HOST']);

const envKeys = Object.keys(process.env).reduce((keys, next) => {
  if (allowedEnvKeys.has(next)) {
    keys[`process.env.${next}`] = JSON.stringify(process.env[next]);
  }

  return keys;
}, {});

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                namedExport: true,
                localIdentName: '[local]__[hash:base64:5]',
                exportLocalsConvention: 'dashesOnly'
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/public/index.html'),
    }),
  ],
  devServer: {
    port: process.env.PORT,
  },
};
