const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const ESLintPlugin = require('eslint-webpack-plugin')
const Stylelint = require('stylelint')
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const path = require('path')
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
    devtool: 'false',
    devServer: {
        static: {directory: path.join(__dirname, 'dist')},
        historyApiFallback: true,
        open: true,
        hot: true,
        port: 8080
      },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.sass', '.pug', '.html']
  },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [new MiniCssExtractPlugin(),
              new HtmlWebpackPlugin({title:"Development",template: 'src/index.html'}),
              new TerserWebpackPlugin(),
              new CssMinimizerWebpackPlugin(),
              new ESLintPlugin(),
              new StylelintWebpackPlugin(options),
            ] ,    
    
    optimization:{
        minimize: true,
        minimizer: [ new TerserWebpackPlugin() ]
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
            {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
                }
            }
    ]
  }
     
};
