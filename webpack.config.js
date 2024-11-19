const path = require('path');

module.exports = {
  entry: {
    example1: './client/example1.jsx',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'hosted'),
    filename: '[name]bundle.js',
  },
};
