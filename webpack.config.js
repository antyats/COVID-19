const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['babel-polyfill', './pages/index.js'],
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'dist')
    },
    devServer: {
        port: 8000
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './pages/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new Copy([
            { 
                from: path.join(__dirname, './src/pages'),
                test: /\.html$/,
                to: path.join(__dirname, 'dist') 
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|eot)$/,
                use: ['file-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    }
}