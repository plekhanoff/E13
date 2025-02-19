const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const options = {
    files: 'src/**/*.css',
    fix: true,
    failOnError: false,
    failOnWarning: false,
    quiet: false
}
//const { hotLoader } = require('mini-css-extract-plugin/types/loader')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devtool: false,
    devServer: {
        static: './dist',
        historyApiFallback: true,
        contentBase: "./dist",
        open: true,
        hot: true,
        port: 8080
      },
    output: {
        filename: 'main.js'
    },
    plugins: [new MiniCssExtractPlugin(),
              new HtmlWebpackPlugin({title:"Development",}),
              new TerserWebpackPlugin(),
              new CssMinimizerWebpackPlugin(),
              new ESLintPlugin(),
              new StylelintWebpackPlugin(options)
            ] ,    
    
    optimization:{
        minimize: true,
        minimizer: [ new TerserWebpackPlugin()]
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
