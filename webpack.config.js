const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const ESLintPlugin = require('eslint-webpack-plugin')
const Stylelint = require('stylelint')
const { hotLoader } = require('mini-css-extract-plugin/types/loader')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        historyApiFallback: true,
        contentBase: "./dist",
        open: true,
        hot: true,
        port: 8080
      },
    output: {
        filename: 'main.js',
        mode: 'development',
    },
    plugins: [new MiniCssExtractPlugin(),
              new HtmlWebpackPlugin({title:"Development",}),
              new TerserWebpackPlugin(),
              new OptimizeCssAssetsWebpackPlugin(),
              new ESLintPlugin,
              new Stylelint(options),
            ] ,    
    
    optimization:{
        minimize: true,
        minimizer: [ new TerserWebpackPlugin(), new OptimizeCssAssetsWebpackPlugin()]
    },
    module: {
        rules: [
            { test: /\.css$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: true,
            },
          },
          'css-loader',] },

            { test: /\.pug$/,
                use: "pug-loader"
            },
            { test:/\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,}
    ]
  }
     
};
