const webpack = require('webpack');
const path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/app');

module.exports = {
  entry: [APP_DIR + '/index.jsx', APP_DIR + '/main.less'],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: "babel-loader",
        exclude: /node_modules/        
      },
      {
        test: /\.(less|css)$/,
        use: [{
            loader: "style-loader", options: { minimize: true } // creates style nodes from JS strings
        }, {
            loader: "css-loader", options: { minimize: true } // translates CSS into CommonJS
        }, {
            loader: "less-loader", options: { minimize: true } // compiles Less to CSS
        }]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      },    
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader?name=/images/[name].[ext]'
      },
      {
        test: /\.css$/,  
        include: /node_modules/,  
        loaders: ['style-loader', 'css-loader'],
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};